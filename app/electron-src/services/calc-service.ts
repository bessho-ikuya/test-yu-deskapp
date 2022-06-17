import {hasStorage, getStorage, setStorage} from '../lib/local-storage'
import {fetchDirCsv, readCsv, writeCsv, unlinkCsv} from '../utils/csv-handler'
import {localStorageKey} from '../constants/local-storage-key'
import predict from '../api/action/predict'
const log = require('electron-log')

/**
 * 計算実行
 */
async function execCalc(pathFromArg?:string, typeFromArg?:string) {
    try {
        // 初回計算時は起動コマンド引数のパスを利用し、再計算時はLSを見る。
        let csvPath : string = ""
        if (!pathFromArg) {
            if (!hasStorage(localStorageKey.CSV_PASS)) {
                await new Promise(resolve => setTimeout(resolve, 5000))
                throw new Error('no csv path set');
            }
            csvPath = getStorage(localStorageKey.CSV_PASS)
        } else {
            csvPath = pathFromArg
        }
        let csvType : string = ""
        if (!typeFromArg) {
            if (!hasStorage(localStorageKey.CSV_PASS_TYPE)) {
                await new Promise(resolve => setTimeout(resolve, 5000))
                throw new Error('no csv path type set');
            }
            csvType = getStorage(localStorageKey.CSV_PASS_TYPE)
        } else {
            csvType = typeFromArg
        }
        // ローカルのcsvを読む
        const fileNames = await fetchDirCsv(csvPath);
        const targetFileName = fileNames[0]
        const csvData = await readCsv(getStorage(localStorageKey.CSV_PASS)+"/"+targetFileName);
        
        // API接続
        const request: any = {
            csv: csvData,
            phase: csvType,
            accounting: 'receipt',
            engine: getStorage(localStorageKey.AI_ENGINE),
            filtering: getStorage(localStorageKey.FILTER_SETTING),
        }
        const res = await predict(request);
        // 計算結果をローカルストレージに保存
        setStorage(localStorageKey.CALC_RESULTS, res.data.result)
        setStorage(localStorageKey.CALC_REQUEST, request)
    } catch (error:any) {
        // 画面が生成されるまで5秒待つ
        await new Promise(resolve => setTimeout(resolve, 5000))
        log.info('api error, ', error.response)
        throw new Error(error.message);
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