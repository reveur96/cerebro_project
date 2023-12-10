import { FC, useEffect } from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { SearchIcon } from '../icon'
import UserTable from './user-table'
import { INFLUENCER_USERS_TYPE } from '@/types/user'
import { API_URL } from '@/utils/constants'

interface Props {
  folder: string
  data: INFLUENCER_USERS_TYPE[]
  handleSlideOpen: () => void
}

const Main: FC<Props> = ({ folder, data, handleSlideOpen }) => {
  const getFolder = async () => {
    const response = await fetch(`${API_URL}/tag`)
    console.log(response)
  }
  useEffect(() => {
    getFolder()
  }, [])
  return (
    <main className='mt-3 w-full h-full'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <Cog6ToothIcon className='w-5 h-5 ml-3' />
        </div>
        <div className='w-1/3'>
          <div className='relative mt-2 rounded-md shadow-sm w-full'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <SearchIcon className='w-4 h-4' />
            </div>
            <input
              type='text'
              className='block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 align-text-bottom'
              placeholder='메모의 키워드를 입력하세요'
            />
          </div>
        </div>
      </div>
      <section>
        <UserTable influencer={data} handleSlideOpen={handleSlideOpen} />
      </section>
    </main>
  )
}

export default Main
