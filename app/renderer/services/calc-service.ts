import {hasStorage, getStorage} from '../lib/local-storage'
import {readCsv} from '../utils/read-csv'
import {localStorageKey} from '../constants/local-storage-key'
import ExportCsv from '../api/action/export-csv'

/**
 * 計算実行
 */
async function execCalc() {
    if (!hasStorage(localStorageKey.CSV_PASS)) {
        throw new Error('no csv path set');
    }
    // ローカルのcsvを読む
    const csvData = await readCsv(getStorage(localStorageKey.CSV_PASS));
    // API接続
    const res = await ExportCsv(csvData);
    console.log('計算データ__', res);
}

export {execCalc}