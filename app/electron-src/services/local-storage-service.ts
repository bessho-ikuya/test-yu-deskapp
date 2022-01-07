import {hasStorage, getStorage, setStorage} from '../lib/local-storage'
import {StorageType} from '../interfaces/storage'
import {defaultLocalStorageValue} from '../constants/default-storage-value'
import {localStorageKey} from '../constants/local-storage-key'

/**
 * 複数取得
 */
function fetchStorageDatas(paths: string[]): any {
    let data: any = {}
    paths.map((path: string) => {
        let value;
        if (hasStorage(path)) {
            value = getStorage(path)
        }
        data[path] = value;
    });
    return data;
}

/**
 * 保存処理
 */
function storeStorageDatas(data: StorageType[]): any {
    data?.map((storageData: StorageType) => {
        setStorage(storageData.path, storageData.value)
    })
}

/**
 * デフォルト設定処理
 */
 function setDefaultStorageDatas(): any {
    const data:StorageType[] = [
        {
            path: localStorageKey.CSV_PASS,
            value: defaultLocalStorageValue.CSV_PASS,
        },
        {
            path: localStorageKey.API_IP,
            value: defaultLocalStorageValue.API_IP,
        }
    ]
    data?.map((storageData: StorageType) => {
        if (!hasStorage(storageData.path)) {
            setStorage(storageData.path, storageData.value)
        }
    })
}

export {fetchStorageDatas, storeStorageDatas, setDefaultStorageDatas}