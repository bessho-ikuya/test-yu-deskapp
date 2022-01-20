import { useEffect, useState} from 'react'
import Layout from '../components/Layout'
import LinkButton from '../components/ui/Button/LinkButton'
import ActionButton from '../components/ui/Button/ActionButton'
import CalcResultTable from '../components/ui/Table/CalcResultTable'
import {CalcResultType} from '../interfaces/index'
import acceptFirstCalcResult from '../utils/accept-calc-result'
import calcStateHandler from "../redux/actions/calcStateHandler"
import {localStorageKey} from '../constants/local-storage-key'
import {botMessageTemplate} from '../constants/bot-message'
import CloseButton from '../components/ui/Button/CloseButton'

const IndexPage = () => {
  const [calcResults, setCalcResults] = useState<CalcResultType[]>();
  const [badActionId, setBadActionId] = useState<string>("")
  const [goodActionId, setGoodActionId] = useState<string>("")
  const [badActionUser, setBadActionUser] = useState<string[]>([])
  const [goodActionUser, setGoodActionUser] = useState<string[]>([])
  const [reCalc, setReCalc] = useState<number>(0)
  const [botMessage, setBotMessage] = useState<string>(botMessageTemplate['index.default'])
  const { loading, hasError, startLoading, endLoading, setError, clearError } = calcStateHandler();

  // 初回計算結果受信
  useEffect(() => {
    acceptFirstCalcResult(setError, endLoading)
  }, [])

  // 再計算
  useEffect(() => {
    if (reCalc) {
      let retval = global.ipcRenderer.sendSync("ReExecCalc");
      if (retval.status == false) {
        setError()
        endLoading()
        setReCalc(0)
      } else {
        endLoading()
        setReCalc(0)
      }
    }
  }, [reCalc])

  useEffect(() => {
    if (!loading && !hasError) {
      // 結果表示データ更新
      updateDisplayCalcResultData()
    }
  }, [loading])

  // 結果表示データ更新
  function updateDisplayCalcResultData() {
    let pathes: string[] = [
      localStorageKey.CALC_RESULTS,
    ];
    let retval = global.ipcRenderer.sendSync("FetchStorage", pathes);
    let results: CalcResultType[] = retval.data[localStorageKey.CALC_RESULTS]
    setCalcResults(results)
    setBotMessage(botMessageTemplate['index.default'])
  }

  // バッド評価
  useEffect(() => {
    if (badActionId !== "") {
      let request: any = {
        engine: 'predict_all',
        receipt_code: badActionId,
        user: badActionUser
      }
      global.ipcRenderer.sendSync("sendBadEvaluation", request);
      setBotMessage(botMessageTemplate['index.eval'])
    }
  }, [badActionId]);

  // グッド評価
  useEffect(() => {
    if (goodActionId !== "") {
      let request: any = {
        engine: 'predict_all',
        receipt_code: goodActionId,
        user: goodActionUser
      }
      global.ipcRenderer.sendSync("sendGoodEvaluation", request);
      setBotMessage(botMessageTemplate['index.eval'])
    }
  }, [goodActionId]);

  const headers:string[] = [
    '順位',
    '推薦項目名',
    '確度',
    'アクション',
  ];

  return (
    <Layout title="BrainBoxAICheck" message={botMessage}>
      <div>
        <div className='flex justify-end mb-2'>
          <ActionButton key="loadbtn" disabled={loading ? true : false} label={loading ? "更新中..." : "更新"} onClick={() => {
            startLoading()
            clearError()
            setReCalc(1)
          }}/>
        </div>
        <div className='flex'>
          <div className='w-85 mr-4'></div>
          {!loading && !hasError && !!calcResults && calcResults.length > 0 ? (
            <CalcResultTable 
              headers={headers} 
              setBadActionId={setBadActionId} 
              setBadActionUser={setBadActionUser} 
              setGoodActionId={setGoodActionId} 
              setGoodActionUser={setGoodActionUser} 
              calcResults={calcResults} 
            />
          ) : (
            hasError ? (
              <p className='text-red-400'>更新に失敗しました。</p>
            ) : (
              <h1>Loading...</h1>
            )
          )}
        </div>
      </div>
      <div className='flex justify-between'>
        <LinkButton label="設定" href="/setting" />
        <CloseButton label="閉じる" />
      </div>
    </Layout>
  )
}

export default IndexPage
