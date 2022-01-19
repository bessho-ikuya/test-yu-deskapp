// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import isDev from 'electron-is-dev'


const windowConf = (screen:any) => {
    let display = screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;
    const conf = {
        width: 1000,
        height: 560,
        x: width - 750,
        y: height - 480,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: join(__dirname, 'preload.js'),
            webSecurity: false
        },
    }
    return conf
}

const appUrl = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
        })

export {windowConf, appUrl}