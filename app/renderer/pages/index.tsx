import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => {
  useEffect(() => {
    // add a listener to 'message' channel
    global.ipcRenderer.addListener('message', (_event, args) => {
      alert(args)
    })
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send('message', 'hi from next')
  }

  return (
    <Layout title="SYSTEM">
      <h1>Hello Next.js</h1>
      <button onClick={onSayHiClick}>Say hi to electron</button>
      <p>
        <Link href="/setting">
          <a>SETTING</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
