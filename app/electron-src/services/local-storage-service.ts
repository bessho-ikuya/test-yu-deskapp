import {hasStorage, getStorage, setStorage} from '../lib/local-storage'
import {StorageType} from '../interfaces/storage'

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

export {fetchStorageDatas, storeStorageDatas}