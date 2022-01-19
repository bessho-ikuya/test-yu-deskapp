import React, { ReactNode } from 'react'
import Head from 'next/head'
import {icon_B} from '../assets/images/icon_B'
import {bot_message_push} from '../assets/images/bot_message_push'
// import Image from "next/image";

type Props = {
  children: ReactNode
  title?: string
  message?: string
}

const Layout = ({ children, message = 'こんにちは！', title = 'This is the default title' }: Props) => (
  <div className='h-screen w-screen p-3' style={{backgroundColor: '#ECE9D8'}}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className='w-85 h-4/5 absolute top-0 -z-10'>
      <img src={icon_B} alt='キャラクター画像' className='w-full h-auto'/>
    </div>
    <div className='h-full flex flex-col justify-between'>
      <div className='flex mb-2'>
        <div className='w-85 mr-4'></div>
        <div className='bg-white p-2 w-full relative'>
          <div className='w-7 h-7 top-0 -left-6 absolute'>
            <img src={bot_message_push} className='w-full h-auto' alt='吹き出し'/>
          </div>
          <p className='text-sm'>ユヤマ:　{message}</p>
        </div>
      </div>
      <div className='h-full flex flex-col justify-between'>
        {children}
      </div>
    </div>
  </div>
)

export default Layout
