import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { INFLUENCER_USERS } from '@/utils/data'
import SlideOver from '@/components/slide-over'
import Aside from '@/components/my-folder/aside'
import Main from '@/components/my-folder/main'
import tagData from '@/public/data/taglist.json'
import { TagType } from '@/types/tag'
import { INFLUENCER_USERS_TYPE } from '@/types/user'
import { fetchApi } from '@/utils/functions'
import { TagStatus } from '@/utils/constants'

interface Props {
  data: INFLUENCER_USERS_TYPE[]
}

const MyFolder: NextPage<Props> = ({ data }) => {
  const [isSlideOpen, setIsSlideOpen] = useState<boolean>(false)
  const [publicTag, setPublicTag] = useState<TagType[] | null>(null)
  const [privateTag, setPrivateTag] = useState<TagType[] | null>(null)
  const [currentFolder, setCurrentFolder] = useState<string>('2')
  const [fetchData] = useState<INFLUENCER_USERS_TYPE[]>(data)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleSlideOpen = () => {
    setIsSlideOpen((prev) => !prev)
  }

  const handleCurrentFolder = (tag: string) => {
    setCurrentFolder(tag)
  }

  const getTagData = async (tagStatus: number) => {
    setIsLoading(true)
    const response = await fetchApi(`/tag/type/all?status=${tagStatus}`)
    if (tagStatus === TagStatus.PUBLIC) {
      setPublicTag(response.data as TagType[])
    } else if (tagStatus === TagStatus.PRIVATE) {
      setPrivateTag(response.data as TagType[])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getTagData(TagStatus.PUBLIC)
    getTagData(TagStatus.PRIVATE)
  }, [])

  return (
    <>
      <SlideOver isSlideOpen={isSlideOpen} handleSlideOpen={handleSlideOpen} tagData={tagData} />
      <section className='flex w-full items-start gap-x-8 pr-8 overflow-y-auto'>
        <Aside
          publicTag={publicTag}
          privateTag={privateTag}
          handleCurrentFolder={handleCurrentFolder}
          currentFolder={currentFolder}
          getTagData={getTagData}
        />
        <Main folder={currentFolder} data={fetchData} handleSlideOpen={handleSlideOpen} />
      </section>
    </>
  )
}

export default MyFolder

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: INFLUENCER_USERS,
    },
  }
}
