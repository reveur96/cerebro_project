import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page404: NextPage = () => {
  const router = useRouter()
  const goBack = () => {
    router.back()
  }
  return (
    <div>
      <div className='flex min-h-full flex-col'>
        <main className='mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8'>
          <p className='text-base font-semibold leading-8 text-indigo-600'>404</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            페이지를 찾을 수가 없습니다
          </h1>
          <p className='mt-6 text-base leading-7 text-gray-600'>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-10'>
            <a
              className='text-sm font-semibold leading-7 text-indigo-600 cursor-pointer'
              onClick={goBack}
            >
              <span aria-hidden='true'>&larr;</span> 뒤로가기
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page404
