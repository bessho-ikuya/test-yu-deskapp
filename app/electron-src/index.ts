// Native
import { join } from 'path'
import { format } from 'url'
import fs from 'fs'

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'
import {hasStorage, getStorage, setStorage, fetchDatas} from '../renderer/lib/local-storage'
import {localStorageKey} from '../renderer/constants/local-storage-key'
import {StorageType} from '../renderer/interfaces/storage'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  // アプリ起動時にcsvを読みにいく
  readCsv()

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hello'), 500)
})


// ローカルストレージから設定値を取得
ipcMain.on("FetchStorage", (event: IpcMainEvent, paths: string[]) => {
  const storageData = fetchDatas(paths)
  event.returnValue = { data: storageData };
});

// ローカルストレージに設定値を登録
ipcMain.on("RegisterStorage", (event: IpcMainEvent, data: StorageType[]) => {
  data?.map((storageData: StorageType) => {
    setStorage(storageData.path, storageData.value)
  })
  event.returnValue = { error: "" };
});

// ローカルのダイルを読みにいく
function readCsv() {
    if (!hasStorage(localStorageKey.CSV_PASS)) {
        console.log('no csv path set')
        return;
    }
    fs.readFile(getStorage(localStorageKey.CSV_PASS), (error:any, data:any) => {
        if (error != null) {
            alert("file open error.");
            return;
        }
        // バックエンドに送信
        console.log(data.toString())
    })
}
