// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, screen} from 'electron'
import prepareNext from 'electron-next'
import {windowConf, appUrl} from './window-setting'
const log = require('electron-log')

// services
import {execCalc, moveCsvFileToTmp} from './services/calc-service'
import {autoDownAppPooling} from './services/auto-down-service'
import {sendGoodEvaluation, sendBadEvaluation} from './services/evaluation'
import {fetchStorageDatas, storeStorageDatas, setDefaultStorageDatas, setStorageData} from './services/local-storage-service'
import {localStorageKey} from './constants/local-storage-key'

// lib
import {fetchCommandArg} from './lib/command'

// interfaces
import {StorageType} from './interfaces/storage'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')
  const mainWindow = new BrowserWindow(windowConf(screen))
  mainWindow.setMenuBarVisibility(false);

  // デフォルト値セット  
  setDefaultStorageDatas()
  
  let args:string[] = [
    '--csv',
    '--type'
  ];
  fetchCommandArgs(args).then((commandArgs:string[]) => {
    // 計算ファイルパスをコマンド引数から取得
    let path:string = commandArgs[0]
    // 計算ファイル種別をコマンド引数から取得
    let type:string = commandArgs[1]
    // 再計算用に、LSに保存しておく。
    setStorageData({
      path: localStorageKey.CSV_PASS,
      value : path
    });
    setStorageData({
      path: localStorageKey.CSV_PASS_TYPE,
      value : type
    });
    // 初回データ計算
    execCalc(path, type)
      .then(() => {
        // 成功シグナル送信
        mainWindow.webContents.send("ExecCalcResult", { status: true, message: '' })
      })
      .catch(err => {
        log.info('api error, ',err)
        // 失敗シグナル送信
        mainWindow.webContents.send("ExecCalcResult", { status: false, message: err.message })
      })
  }).catch(err => {
    log.info('front error, ',err)
    // 失敗シグナル送信
    mainWindow.webContents.send("ExecCalcResult", { status: false, message: err.message })
  })

  // 自動アプリダウン定期実行
  autoDownAppPooling()

  mainWindow.loadURL(appUrl)
})

// Quit the app once all windows are closed
app.on('window-all-closed', () => {
  // csvを一時保存し、元データは削除
  moveCsvFileToTmp()
    .then(_ => {
      app.quit()
    })
    .catch(err => {
      log.info('front error, ',err)
      app.quit()
    })
})

// ローカルストレージから設定値を取得
ipcMain.on("FetchStorage", (event: IpcMainEvent, paths: string[]) => {
  const storageData = fetchStorageDatas(paths)
  event.returnValue = { data: storageData };
});

// ローカルストレージに設定値を登録
ipcMain.on("RegisterStorage", (event: IpcMainEvent, data: StorageType[]) => {
  storeStorageDatas(data)
  event.returnValue = { error: "" };
});

// アプリ終了
ipcMain.on("CloseApp", () => {
  // csvを一時保存し、元データは削除
  moveCsvFileToTmp()
    .then(_ => {
      app.quit()
    })
    .catch(err => {
      log.info('front error, ',err)
      app.quit()
    })
});

// 再計算
ipcMain.on("ReExecCalc", (event: IpcMainEvent) => {
  execCalc()
    .then(() => {
      // 成功シグナル送信
      event.returnValue = { status: true, message: '' };
    })
    .catch(err => {
      log.info('api error, ',err)
      // 失敗シグナル送信
      event.returnValue = { status: false, message: err.message };
    })
});

// Good評価
ipcMain.on("sendGoodEvaluation", (event: IpcMainEvent, request: any) => {
  sendGoodEvaluation(request)
    .then(() => {
      // 成功シグナル送信
      event.returnValue = { status: true, message: '' };
    })
    .catch(err => {
      log.info('api error, ',err)
      // 失敗シグナル送信
      event.returnValue = { status: false, message: err.message };
    })
});

// Bad評価
ipcMain.on("sendBadEvaluation", (event: IpcMainEvent, request: any) => {
  sendBadEvaluation(request)
    .then(() => {
      // 成功シグナル送信
      event.returnValue = { status: true, message: '' };
    })
    .catch(err => {
      log.info('front error, ',err)
      // 失敗シグナル送信
      event.returnValue = { status: false, message: err.message };
    })
});

async function fetchCommandArgs(targetArgs:string[]) : Promise<string[]> {
  let args:string[] = []
  for (let i = 0; i < targetArgs.length; i ++ ) {
    args[i] = fetchCommandArg(targetArgs[i])
  }
  return args
}