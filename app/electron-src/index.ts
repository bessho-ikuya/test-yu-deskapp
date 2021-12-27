// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, screen} from 'electron'
import prepareNext from 'electron-next'
import {windowConf, appUrl} from './window-setting'

// services
import {execCalc} from './services/calc-service'
import {fetchStorageDatas, storeStorageDatas} from './services/local-storage-service'

// interfaces
import {StorageType} from './interfaces/storage'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')
  const mainWindow = new BrowserWindow(windowConf(screen))
      
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
app.on('window-all-closed', app.quit)

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
