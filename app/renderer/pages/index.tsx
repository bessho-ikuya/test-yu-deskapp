import { useEffect, useState} from 'react'
import Layout from '../components/Layout'
import LinkButton from '../components/ui/Button/LinkButton'
import ActionButton from '../components/ui/Button/ActionButton'
import CalcResultTable from '../components/ui/Table/CalcResultTable'
import {CalcResultType} from '../interfaces/index'
import acceptFirstCalcResult from '../utils/accept-calc-result'
import calcStateHandler from "../redux/actions/calcStateHandler"
import {localStorageKey} from '../constants/local-storage-key'

const IndexPage = () => {
  const [calcResults, setCalcResults] = useState<CalcResultType[]>();
  const [badActionId, setBadActionId] = useState<number>(0)
  const [goodActionId, setGoodActionId] = useState<number>(0)
  const [reCalc, setReCalc] = useState<number>(0)

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
      } else {
        endLoading()
      }
      setReCalc(0)
    }
  }, [reCalc])

  useEffect(() => {
    if (!loading && !hasError) {
      console.log('計算完了')
      // 結果表示データ更新
      updateDisplayCalcResultData()
    }
  }, [loading])

  // reduxクリア
  // function resetState() {
  //   startLoading()
  //   clearError()
  // }

  // 結果表示データ更新
  function updateDisplayCalcResultData() {
    let pathes: string[] = [
      localStorageKey.CALC_RESULTS,
    ];
    let retval = global.ipcRenderer.sendSync("FetchStorage", pathes);
    let results: CalcResultType[] = retval.data[localStorageKey.CALC_RESULTS]
    setCalcResults(results)
  }

  useEffect(() => {
    if (badActionId !== 0) {
      console.log('bad', badActionId)
    }
  }, [badActionId]);

  useEffect(() => {
    if (goodActionId !== 0) {
      console.log('good', goodActionId)
    }
  }, [goodActionId]);

  const headers:string[] = [
    '順位',
    '推薦項目名',
    '確度',
    '類似レセプト1',
    '類似レセプト2',
    'アクション',
  ];

  return (
    <Layout title="SYSTEM">
      <div className='h-full flex flex-col justify-between'>
        <div>
          <div className='flex justify-between mb-4'>
            <ActionButton key="aaa" label={loading ? "更新中" : "更新"} color="black" onClick={() => {
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
                setGoodActionId={setGoodActionId} 
                calcResults={calcResults} 
              />
            ) : (
              hasError ? (
                <p className='text-red-400'>更新に失敗しました。</p>
              ) : (
                <h1>Loading</h1>
              )
            )}
          </div>
        </div>
        <div className='flex justify-between'>
          <LinkButton label="設定" color="black" href="/setting" />
          <LinkButton label="閉じる" color="black" href="/setting" />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
