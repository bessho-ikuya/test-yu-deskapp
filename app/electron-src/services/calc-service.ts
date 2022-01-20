import {hasStorage, getStorage, setStorage} from '../lib/local-storage'
import {fetchDirCsv, readCsv, writeCsv, unlinkCsv} from '../utils/csv-handler'
import {localStorageKey} from '../constants/local-storage-key'
import predict from '../api/action/predict'

/**
 * 計算実行
 */
async function execCalc() {
    if (!hasStorage(localStorageKey.CSV_PASS)) {
        throw new Error('no csv path set');
    }
    try {
        // ローカルのcsvを読む
        const fileNames = await fetchDirCsv(getStorage(localStorageKey.CSV_PASS));
        const targetFileName = fileNames[0]
        const csvData = await readCsv(getStorage(localStorageKey.CSV_PASS)+"/"+targetFileName);
        
        // API接続
        const request: any = {
            csv: csvData,
            engine: 'private_all',
            filtering: [],
        }
        const res = await predict(request);
        // 計算結果をローカルストレージに保存
        setStorage(localStorageKey.CALC_RESULTS, res.data.result)
    } catch (error) {
        throw new Error('failed to calc');
    }
}

/**
 * ファイル一時保存
 */
 async function moveCsvFileToTmp() {
    if (!hasStorage(localStorageKey.CSV_PASS)) {
        throw new Error('no csv path set');
    }

    try {
        // ローカルのcsvを読む
        const fileNames = await fetchDirCsv(getStorage(localStorageKey.CSV_PASS));
        const targetFileName = fileNames[0]
        const csvData = await readCsv(getStorage(localStorageKey.CSV_PASS)+"/"+targetFileName);

        // 一時保存
        await writeCsv(getStorage(localStorageKey.CSV_TMP_PASS)+"/"+targetFileName, csvData)
        // 既存ファイル削除
        await unlinkCsv(getStorage(localStorageKey.CSV_PASS)+"/"+targetFileName)
    } catch (error) {
        throw new Error('failed to temp save');
    }
 }

export {execCalc, moveCsvFileToTmp}