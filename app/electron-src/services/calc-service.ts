import {hasStorage, getStorage, setStorage} from '../lib/local-storage'
import {readCsv} from '../utils/read-csv'
import {localStorageKey} from '../constants/local-storage-key'
import predict from '../api/action/predict'

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
    const request: any = {
        csv_contents: csvData,
        engine: 'private_all',
        filtering: [],
    }
    console.log('request', request)
    const res = await predict(request);
    // 計算結果をローカルストレージに保存
    console.log(res.data.detail)
    setStorage(localStorageKey.CALC_RESULTS, res.data)
}

export {execCalc}