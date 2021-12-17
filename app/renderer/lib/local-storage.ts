import Store from 'electron-store'

// ローカルストレージ仕様
const store = new Store()

/**
 * 複数取得
 */
function fetchDatas(paths: string[]): any {
    let data: any = {}
    paths.map((path: string) => {
        let value = getStorage(path)
        data[path] = value;
    });
    return data;
}

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
    // return '/Users/ikuya/Downloads/electron_sample_csv.csv';
    if (!hasStorage(path)) {
        return "/Users/ikuya/Downloads/electron_sample_csv.csv";
    }
    return store.get(path);
}

/**
 * ローカルストレージに値を設定
 */
function setStorage(path:string, data:any) {
    store.set(path, data)
}

export {setStorage, hasStorage, getStorage, fetchDatas}