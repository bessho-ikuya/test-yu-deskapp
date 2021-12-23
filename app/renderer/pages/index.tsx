import { useEffect, useState} from 'react'
import Layout from '../components/Layout'
import LinkButton from '../components/ui/Button/LinkButton'
import ActionButton from '../components/ui/Button/ActionButton'
import CalcResultTable from '../components/ui/Table/CalcResultTable'
import {CalcResultType} from '../interfaces/index'

const IndexPage = () => {
  useEffect(() => {
    // add a listener to 'message' channel
    global.ipcRenderer.addListener('message', (_event, args) => {
      alert(args)
    })
  }, [])

  const rows:CalcResultType[] = [
    {
      id : 1,
      name : 'string',
      weight : 'string',
      recept1 : 'string',
      recept2 : 'string'
    },
    {
      id : 2,
      name : 'string',
      weight : 'string',
      recept1 : 'string',
      recept2 : 'string'
    }
  ];

  const [calcResults, setCalcResults] = useState<CalcResultType[]>(rows)
  const [badActionId, setBadActionId] = useState<number>(0)
  const [goodActionId, setGoodActionId] = useState<number>(0)

  const handleOnClick = () => {
    alert('re culc')
  }

  const onSayHiClick = () => {
    global.ipcRenderer.send('message', 'hi from next')
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
            <ActionButton label="更新" color="black" onClick={handleOnClick}/>
          </div>
          <div className='flex'>
            <div className='w-85 mr-4'></div>
            <CalcResultTable 
              headers={headers} 
              setBadActionId={setBadActionId} 
              setGoodActionId={setGoodActionId} 
              calcResults={calcResults} 
            />
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
