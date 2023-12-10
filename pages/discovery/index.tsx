import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import UserTable from '@/components/user-table'
import { INFLUENCER_USERS } from '@/utils/data'
import { INFLUENCER_TYPE } from '@/types/user'
import SlideOver from '@/components/slide-over'
import type { GetStaticProps } from 'next'
import tagData from '../../public/data/taglist.json'

type TestProps = {
  firstData: INFLUENCER_TYPE[]
  tagData: TagData[]
}

interface TagData {
  tagId: number
  tagName: string | undefined
  tagTypeId: number | string
  tagType: {
    tagType: string
    tagState: string
  }
}

const SAMPLE_INFLUENCER = [
  {
    id: 13024,
    platform_type: 'instagram',
    display_name: 'Korea Foundation',
    username: 'fk_fellowship',
    description: '테스트',
    follower: 5325235,
    following: 11234512,
    name: '김수정',
    gender: 'female',
    category: 'Food & Cooking, Music, Photography',
    birthday: '1996-02-16',
  },
]

const Test: NextPage<TestProps> = ({ firstData, tagData }) => {
  const [data, setData] = useState<INFLUENCER_TYPE[] | null>(firstData)
  const [isSlideOpen, setIsSlideOpen] = useState<boolean>(false)

  const handleSlideOpen = () => {
    setIsSlideOpen((prev) => !prev)
  }

  const [userList, setUserList] = useState<INFLUENCER_TYPE[]>([])

  const getUserList = async () => {
    const res = await fetch('/data/userlist.json')
    const data = await res.json()

    setUserList(data)
  }

  useEffect(() => {
    getUserList()
  }, [])

  return (
    <>
      <div className='px-20'>
        <SlideOver isSlideOpen={isSlideOpen} handleSlideOpen={handleSlideOpen} tagData={tagData} />
        <UserTable user={userList} handleSlideOpen={handleSlideOpen}></UserTable>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      tagData,
    },
  }
}
export default Test
