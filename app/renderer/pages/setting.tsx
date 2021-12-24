import Link from 'next/link'
import { useEffect} from 'react'
import Layout from '../components/Layout'
import SettingForm from '../components/pages/setting/SettingForm'
import acceptCalcResult from '../utils/accept-calc-result'
import calcStateHandler from "../redux/actions/calcStateHandler"

const SettingPage = () => {
  const { endLoading, setError } = calcStateHandler();

  // 計算結果受信
  useEffect(() => {
    acceptCalcResult(setError, endLoading)
  }, [])

  return (
    <Layout title="Setting">
      <Link href="/"><a className="px-2 py-1  text-white font-semibold rounded">home</a></Link>
      <h1>Setting</h1>
      <SettingForm />
    </Layout>
  )
}

export default SettingPage
