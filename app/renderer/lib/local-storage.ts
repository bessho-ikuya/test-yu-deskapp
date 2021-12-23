import Store from 'electron-store'

// ローカルストレージ仕様
const store = new Store()

/**
 * ローカルストレージに値があるか確認
 */
function hasStorage(path:string):boolean {
    return store.has(path)
}

/**
 * ローカルストレージの値を取得
 */
function getStorage(path:string):any {
    return store.get(path);
}

/**
 * ローカルストレージに値を設定
 */
function setStorage(path:string, data:any) {
    store.set(path, data)
}

export {setStorage, hasStorage, getStorage}