// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, screen} from 'electron'
import prepareNext from 'electron-next'
import {windowConf, appUrl} from './window-setting'

// services
import {execCalc, moveCsvFileToTmp} from './services/calc-service'
import {sendGoodEvaluation, sendBadEvaluation} from './services/evaluation'
import {fetchStorageDatas, storeStorageDatas, setDefaultStorageDatas} from './services/local-storage-service'

// interfaces
import {StorageType} from './interfaces/storage'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')
  const mainWindow = new BrowserWindow(windowConf(screen))

  // デフォルト値セット  
  setDefaultStorageDatas()

  // 初回データ計算
  execCalc()
    .then(() => {
      // 成功シグナル送信
      mainWindow.webContents.send("ExecCalcResult", { status: true })
    })
    .catch(err => {
      console.log('err__', err)
      // 失敗シグナル送信
      mainWindow.webContents.send("ExecCalcResult", { status: false })
    })

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
      console.log('err__', err)
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
      console.log('err__', err)
      app.quit()
    })
});

// 再計算
ipcMain.on("ReExecCalc", (event: IpcMainEvent) => {
  execCalc()
    .then(() => {
      // 成功シグナル送信
      event.returnValue = { status: true };
    })
    .catch(err => {
      console.log('err__', err)
      // 失敗シグナル送信
      event.returnValue = { status: false };
    })
});

// Good評価
ipcMain.on("sendGoodEvaluation", (event: IpcMainEvent, request: any) => {
  console.log('sendGoodEvaluation', request)
  sendGoodEvaluation(request)
    .then(() => {
      // 成功シグナル送信
      event.returnValue = { status: true };
    })
    .catch(err => {
      console.log('err__', err)
      // 失敗シグナル送信
      event.returnValue = { status: false };
    })
});

// Bad評価
ipcMain.on("sendBadEvaluation", (event: IpcMainEvent, request: any) => {
  console.log('sendBadEvaluation', request)

  sendBadEvaluation(request)
    .then(() => {
      // 成功シグナル送信
      event.returnValue = { status: true };
    })
    .catch(err => {
      console.log('err__', err)
      // 失敗シグナル送信
      event.returnValue = { status: false };
    })
});
