import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='h-full bg-gray-100'>
      <Head>
        <link rel='shortcut icon' href='../CEREBRO.svg' type='image/x-icon' />
        <title>Cerebro-wecode</title>
      </Head>
      <body className='h-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
