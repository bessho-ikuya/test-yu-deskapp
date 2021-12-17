// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'
// import fs from 'fs'
import Store from 'electron-store'

const store = new Store()

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

  store.set('aisatsu', 'Helloworld')
  console.log(store.get('aisatsu'))
  // alert(store.get('aisatsu'));
  // if (store.has('aisatsu')) {
  // }

  // const buff = fs.readFileSync('');
  // console.log(buff)

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  store.set('aisatsu', 'Helloworld')
  console.log(store.get('aisatsu'))
  setTimeout(() => event.sender.send('message', store.get('aisatsu')), 500)
})
