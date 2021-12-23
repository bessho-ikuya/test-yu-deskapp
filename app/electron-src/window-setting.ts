// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import isDev from 'electron-is-dev'


function windowConf(screen:any) {
    let display = screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;
    const conf = {
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