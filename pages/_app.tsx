import { useRouter } from 'next/router'
import '@/global.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

const spoqaHanSansNeo = localFont({
  src: [
    { path: '../assets/fonts/SpoqaHanSansNeo-Thin.woff2', weight: '100' },
    { path: '../assets/fonts/SpoqaHanSansNeo-Light.woff2', weight: '300' },
    { path: '../assets/fonts/SpoqaHanSansNeo-Regular.woff2', weight: '400' },
    { path: '../assets/fonts/SpoqaHanSansNeo-Medium.woff2', weight: '500' },
    { path: '../assets/fonts/SpoqaHanSansNeo-Bold.woff2', weight: '700' },
  ],
})
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <div className={spoqaHanSansNeo.className}>
      <Component {...pageProps} />
    </div>
  )
}
