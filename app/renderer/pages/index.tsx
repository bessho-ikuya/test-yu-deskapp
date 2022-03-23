import { useEffect, useState} from 'react'
import Layout from '../components/Layout'
import LinkButton from '../components/ui/Button/LinkButton'
import ActionButton from '../components/ui/Button/ActionButton'
import CalcResultTable from '../components/ui/Table/CalcResultTable'
import {CalcResultType, CalcRequestType, SortSettingType} from '../interfaces/index'
import acceptFirstCalcResult from '../utils/accept-calc-result'
import calcStateHandler from "../redux/actions/calcStateHandler"
import {localStorageKey} from '../constants/local-storage-key'
import {botMessageTemplate} from '../constants/bot-message'
// import CloseButton from '../components/ui/Button/CloseButton'
import Radio from '../components/ui/Form/Radio'

const IndexPage = () => {
  const [calcResults, setCalcResults] = useState<CalcResultType[]>();
  const [calcSortResults, setCalcSortResults] = useState<CalcResultType[]>();
  const [displaySortResult, setDisplaySortResult] = useState<boolean>(false);
  const [calcRequest, setCalcRequest] = useState<CalcRequestType>();
  const [badActionId, setBadActionId] = useState<string>("")
  const [goodActionId, setGoodActionId] = useState<string>("")
  const [badActionUser, setBadActionUser] = useState<string[]>([])
  const [goodActionUser, setGoodActionUser] = useState<string[]>([])
  const [reCalc, setReCalc] = useState<number>(0)
  const [botMessage, setBotMessage] = useState<string>(botMessageTemplate['index.default'])
  const { loading, hasError, errorMessage, startLoading, endLoading, setError, clearError, setErrorMessage } = calcStateHandler();

  // 初回計算結果受信
  useEffect(() => {
    acceptFirstCalcResult(setError, endLoading, setErrorMessage)
  }, [])

  // 再計算
  useEffect(() => {
    if (reCalc) {
      let retval = global.ipcRenderer.sendSync("ReExecCalc");
      if (retval.status == false) {
        setError()
        endLoading()
        setReCalc(0)
        if (retval.message != '') {
          setErrorMessage(retval.message);
        }
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

  // 結果のソート
  useEffect(() => {
    if (displaySortResult) {
      // ソート設定取得
      let pathes: string[] = [
        localStorageKey.SORT_SETTING,
      ];
      let retval = global.ipcRenderer.sendSync("FetchStorage", pathes);
      let sort: SortSettingType = retval.data[localStorageKey.SORT_SETTING]

      if (calcResults !== undefined) {
        const sortDistanceArray = calcResults.filter(calcResult => {
          return Number(calcResult.distance) <= sort.max_distance;
        })
        const sortDisplayNumberArray = sortDistanceArray.slice(0, sort.display_number)
  
        setCalcSortResults(sortDisplayNumberArray);
      }
    }
  }, [displaySortResult])

  // 結果表示データ更新
  function updateDisplayCalcResultData() {
    let pathes: string[] = [
      localStorageKey.CALC_RESULTS,
      localStorageKey.CALC_REQUEST,
    ];
    let retval = global.ipcRenderer.sendSync("FetchStorage", pathes);
    let results: CalcResultType[] = retval.data[localStorageKey.CALC_RESULTS]
    let request: CalcRequestType = retval.data[localStorageKey.CALC_REQUEST]
    setCalcResults(results)
    setCalcRequest(request)
    setBotMessage(botMessageTemplate['index.default'])
  }

  // バッド評価
  useEffect(() => {
    if (badActionId !== "") {
      let request: any = {
        engine: calcRequest.engine,
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
        engine: calcRequest.engine,
        receipt_code: goodActionId,
        user: goodActionUser
      }
      global.ipcRenderer.sendSync("sendGoodEvaluation", request);
      setBotMessage(botMessageTemplate['index.eval'])
    }
  }, [goodActionId]);

  const DisplaySortRadio = [
    {
      value : false,
      label : "全て表示",
    },
    {
      value : true,
      label : "一部のみ表示",
    },
  ];

  return (
    <Layout title="BrainBoxAICheck" message={botMessage}>
      <div>
        <div className='flex'>
          <div className='w-85 mr-4'></div>
          <div className='w-full flex justify-between mb-2'>
            <Radio name={"display-sort-result"} imageLabel={false} items={DisplaySortRadio} state={displaySortResult} setState={setDisplaySortResult}/>
            <ActionButton key="loadbtn" disabled={loading ? true : false} label={loading ? "更新中..." : "更新"} onClick={() => {
              startLoading()
              clearError()
              setReCalc(1)
            }}/>
          </div>
        </div>
        <div className='flex'>
          <div className='w-85 mr-4'></div>
          {!loading && !hasError ? (
            <CalcResultTable  
              setBadActionId={setBadActionId} 
              setBadActionUser={setBadActionUser} 
              setGoodActionId={setGoodActionId} 
              setGoodActionUser={setGoodActionUser} 
              calcResults={displaySortResult ? calcSortResults : calcResults} 
            />
          ) : (
            hasError ? (
              <p className='text-red-400'>{ errorMessage }</p>
            ) : (
              <h1>Loading...</h1>
            )
          )}
        </div>
      </div>
      <div className='flex justify-between'>
        <LinkButton label="設定" href="/setting" />
        {/* <CloseButton label="閉じる" /> */}
      </div>
    </Layout>
  )
}

export default IndexPage
