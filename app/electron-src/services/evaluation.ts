import good from '../api/action/good'
import bad from '../api/action/bad'

/**
 * 評価
 */
async function sendGoodEvaluation(request: any) {
    // API接続
    await good(request);
}

/**
 * 評価
 */
 async function sendBadEvaluation(request: any) {
    // API接続
    await bad(request);
}

export {sendGoodEvaluation, sendBadEvaluation}