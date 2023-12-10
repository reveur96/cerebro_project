import { TagType } from '@/types/tag'
import { FC, memo } from 'react'
import Tag from './tag'
import { fetchApi } from '@/utils/functions'
import MyFolderTagSelectBox from './myfolder-select-box'
import { TagStatus } from '@/utils/constants'

interface AsideProps {
  publicTag: TagType[] | null
  privateTag: TagType[] | null
  handleCurrentFolder: (tag: string) => void
  currentFolder: string
  getTagData: (tagStatus: TagStatus) => Promise<void>
}

const Aside: FC<AsideProps> = ({ publicTag, privateTag, handleCurrentFolder, getTagData }) => {
  return (
    <nav className='flex flex-1 flex-col bg-white px-10 h-[calc(100vh-5rem)] py-6 border-r min-w-[20rem] max-w-[20rem] overflow-y-auto overflow-x-hidden'>
      <div className='mb-1 pb-2 '>
        <div className='font-semibold text-xs pb-2 border-b border-blue-500 text-blue-500'>
          태그 추가
        </div>
        <MyFolderTagSelectBox
          publicTag={publicTag}
          privateTag={privateTag}
          getTagData={getTagData}
        />
      </div>
      <div className='w-full text-xs font-medium leading-6 text-blue-500 cursor-default'>공통</div>
      <hr className='my-1 border-blue-500' />
      <ul role='list' className='space-y-1 pb-5'>
        {publicTag?.map((item) => (
          <Tag item={item} handleCurrentFolder={handleCurrentFolder} getTagData={getTagData} />
        ))}
      </ul>
      <div className='w-full text-xs font-medium leading-6 text-blue-500 cursor-default'>
        사용자 지정
      </div>
      <hr className='my-1 border-blue-500' />
      <ul role='list' className=' space-y-1'>
        {privateTag?.map((item) => (
          <Tag item={item} handleCurrentFolder={handleCurrentFolder} getTagData={getTagData} />
        ))}
      </ul>
    </nav>
  )
}

export default memo(Aside)
