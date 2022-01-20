import Link from 'next/link'
import { useEffect, useState} from 'react'
import Layout from '../components/Layout'
import SettingForm from '../components/pages/setting/SettingForm'
import acceptCalcResult from '../utils/accept-calc-result'
import calcStateHandler from "../redux/actions/calcStateHandler"
import LinkButton from '../components/ui/Button/LinkButton'
import ActionButton from '../components/ui/Button/ActionButton'
import CloseButton from '../components/ui/Button/CloseButton'

const SettingPage = () => {
  const { endLoading, setError } = calcStateHandler();
  const [registering, setRegistering] = useState<boolean>(false);

  // 計算結果受信
  useEffect(() => {
    acceptCalcResult(setError, endLoading)
  }, [])

  function onSubmit() {
    setRegistering(true)
  }

  return (
    <Layout title="BrainBoxAICheck|設定" message="設定を変更できます。">
      <div>
        <div className='flex'>
          <div className='w-85 mr-4'></div>
          <SettingForm registering={registering} setRegistering={setRegistering} />
        </div>
        <div className='flex justify-between'>
          <LinkButton label="戻る" href="/" />
          <div className='flex justify-end'>
            <ActionButton label={registering ? "保存中.." : "保存"} exClassName={"mr-4"} disabled={registering ? true : false} onClick={() => onSubmit()} />
            <CloseButton label="閉じる" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SettingPage
