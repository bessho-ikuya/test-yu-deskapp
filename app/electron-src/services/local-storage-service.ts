import {hasStorage, getStorage, setStorage} from '../lib/local-storage'
import {StorageType, DefaultStorageType} from '../interfaces/storage'
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
 * 単体保存処理
 */
function setStorageData(data: StorageType): any {
    setStorage(data.path, data.value)
}

/**
 * デフォルト設定処理
 */
 function setDefaultStorageDatas(): any {
    const data:DefaultStorageType[] = [
        {
            path: localStorageKey.CSV_TMP_PASS,
            value: defaultLocalStorageValue.CSV_TMP_PASS,
            update: true,
        },
        {
            path: localStorageKey.APP_CLOSE_TRIGER_PASS,
            value: defaultLocalStorageValue.APP_CLOSE_TRIGER_PASS,
            update: true,
        },
        {
            path: localStorageKey.API_IP,
            value: defaultLocalStorageValue.API_IP,
            update: true,
        },
        {
            path: localStorageKey.AI_ENGINE,
            value: defaultLocalStorageValue.AI_ENGINE,
            update: false,
        },
        {
            path: localStorageKey.FILTER_SETTING,
            value: defaultLocalStorageValue.FILTER_SETTING,
            update: false,
        },
        {
            path: localStorageKey.SORT_SETTING,
            value: defaultLocalStorageValue.SORT_SETTING,
            update: false,
        },
        {
            path: localStorageKey.ICON,
            value: defaultLocalStorageValue.ICON,
            update: false,
        },
        {
            path: localStorageKey.THEME,
            value: defaultLocalStorageValue.THEME,
            update: false,
        },
        {
            path: localStorageKey.EVALUATE_OPTION,
            value: defaultLocalStorageValue.EVALUATE_OPTION,
            update: false,
        }
    ]
    data?.map((storageData: DefaultStorageType) => {
        if (storageData.update) {
            // アプリ起動時に常に更新をかける
            setStorage(storageData.path, storageData.value)
        } else {
            // 初回起動時のみ更新
            if (!hasStorage(storageData.path)) {
                setStorage(storageData.path, storageData.value)
            }
        }
    })
}

export {fetchStorageDatas, storeStorageDatas, setDefaultStorageDatas, setStorageData}