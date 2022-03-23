import {fetchDirCsv, unlinkCsv} from '../utils/csv-handler'
import {hasStorage, getStorage} from '../lib/local-storage'
import {localStorageKey} from '../constants/local-storage-key'
import {moveCsvFileToTmp} from './calc-service'
import {app} from 'electron'

async function autoDownAppPooling() {
    const intervalMs = 2000;
    const sleep = (milliSeconds: any) => new Promise(resolve => {
        setTimeout(() => resolve("sleep..."), milliSeconds);
    });
    
    const wait = async () => {
        while (true) {
            await sleep(intervalMs);
            await requestAppDown();
        }
    };

    wait();
}
  
async function requestAppDown() {
    // 削除トリガーファイル確認
    try {
        if (!hasStorage(localStorageKey.APP_CLOSE_TRIGER_PASS)) {
            throw new Error('no down csv path set');
        }
    } catch (error) {
        throw new Error('failed to down app');
    }
    // ローカルのcsvを読む
    try {
        const fileNames = await fetchDirCsv(getStorage(localStorageKey.APP_CLOSE_TRIGER_PASS));
        const targetFileName = fileNames[0]
        if (targetFileName) {
            // トリガーファイル削除
            await unlinkCsv(getStorage(localStorageKey.APP_CLOSE_TRIGER_PASS)+"/"+targetFileName)
            // アプリダウン
            moveCsvFileToTmp()
            .then(_ => {
                app.quit()
            })
            .catch(err => {
                console.log('err__', err)
                app.quit()
            })
        }
    } catch (error) {}
}

export {autoDownAppPooling}