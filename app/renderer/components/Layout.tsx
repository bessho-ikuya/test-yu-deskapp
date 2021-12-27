import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className='h-screen w-screen p-3' style={{backgroundColor: '#D0E7FD'}}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
)

export default Layout
