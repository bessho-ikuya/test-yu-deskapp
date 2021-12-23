// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, screen} from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

// services
import {execCalc} from '../renderer/services/calc-service'
import {fetchStorageDatas, storeStorageDatas} from '../renderer/services/local-storage-service'

// interfaces
import {StorageType} from '../renderer/interfaces/storage'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;

  const mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    x: width - 500,
    y: height - 400,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
      webSecurity: false
    },
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

      
  // 初回データ計算
  execCalc()
    .then(() => {
      mainWindow.webContents.send("ExecCalcResult", { status: true })
    })
    .catch(err => {
      console.log('err__', err)
      mainWindow.webContents.send("ExecCalcResult", { status: false })
    })

  mainWindow.loadURL(url)
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
