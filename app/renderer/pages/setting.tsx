import Link from 'next/link'
import Layout from '../components/Layout'
import SettingForm from '../components/pages/setting/SettingForm'

const SettingPage = () => (
  <Layout title="Setting">
    <Link href="/"><a className="px-2 py-1  text-white font-semibold rounded">home</a></Link>
    <h1>Setting</h1>
    <SettingForm />
  </Layout>
)

export default SettingPage
