/**
 * 特定のコマンド引数の値取得
 */
async function fetchCommandArg(targetArg:string) : Promise<string> {
    // try {
    let targetIndex : number = 0;
    let args : string[] =  process.argv;
    for (let i = 0; i < process.argv.length; i ++ ) {
        if (args[i] == targetArg) {
            targetIndex = i + 1;
        }
    }
    if (targetIndex == 0) {
        // 引数設定なし
        return "";
    }
    return args[targetIndex];
}

export {fetchCommandArg}