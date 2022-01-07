import good from '../api/action/good'
import bad from '../api/action/bad'

/**
 * 評価
 */
async function sendGoodEvaluation(request: any) {
    // API接続
    const res = await good(request);
    console.log(res)
}

/**
 * 評価
 */
 async function sendBadEvaluation(request: any) {
    // API接続
    const res = await bad(request);
    console.log(res)
}

export {sendGoodEvaluation, sendBadEvaluation}