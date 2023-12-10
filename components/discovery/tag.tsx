import React, { useState, useEffect, FC } from 'react'

interface TagData {
  tagId: number
  tagName: string | undefined
  tagTypeId: number | string
  tagType: {
    tagType: string
    tagState: string
  }
}

interface Props {
  copyTag: TagData[]
  setCopyTag: React.Dispatch<React.SetStateAction<TagData[]>>
  tagData: TagData[]
}

const Tag: FC<Props> = ({ copyTag, setCopyTag, tagData }) => {
  const [commonCodeTag, setCommonCodeTag] = useState<number | string>(1)
  const [publicOrPrivate, setPublicOrPrivate] = useState<string>('public')
  const [publicTagName, setPublicTagName] = useState<string | undefined>(tagData[0]?.tagName)
  const [tagName, setTagName] = useState<string>('')
  const [isInputTextShow, setIsInputTextShow] = useState<boolean>(false)

  const firstElement = copyTag[0].tagId

  const filteredData = tagData.filter((item) => item.tagTypeId === commonCodeTag)

  const newElement: TagData = {
    tagId: firstElement + 1,
    tagName: publicOrPrivate === 'public' ? publicTagName : tagName,
    tagTypeId: publicOrPrivate === 'public' ? commonCodeTag : 3,
    tagType: {
      tagType: 'tagType(?)',
      tagState: publicOrPrivate,
    },
  }

  const addTagging = () => {
    setCopyTag((prev) => [newElement, ...prev])
  }

  useEffect(() => {
    if (publicOrPrivate === 'public') {
      setIsInputTextShow(false)
    } else if (publicOrPrivate === 'private') {
      setIsInputTextShow(true)
    }

    setPublicTagName(filteredData[0]?.tagName)
  }, [commonCodeTag, publicOrPrivate])

  return (
    <div>
      <p className=' mb-2'>태그</p>
      <div className='flex justify-between overflow-x-auto mb-3'>
        <select
          className='border border-black rounded-md px-1 pb-1'
          name='publicOrPrivate'
          onChange={(e) => setPublicOrPrivate(e.target.value)}
        >
          <option value='public'>public</option>
          <option value='private'>private</option>
        </select>
        <select
          className='border border-black rounded-md  px-1 pb-1'
          style={{ width: '105px' }}
          name='commonCode'
          onChange={(e) => setCommonCodeTag(Number(e.target.value))}
          disabled={publicOrPrivate === 'private'}
        >
          <option value={1}>진행 상태</option>
          <option value={2}>지역</option>
        </select>
        <select
          className='border border-black rounded-md  px-1 pb-1'
          style={{ width: '105px' }}
          name='publicTagName'
          onChange={(e) => setPublicTagName(e.target.value)}
          disabled={publicOrPrivate === 'private'}
        >
          {filteredData.map((first) => {
            return (
              <option key={first.tagId} value={first.tagName}>
                {first.tagName}
              </option>
            )
          })}
        </select>{' '}
      </div>
      <div className='flex justify-between items-center h-8'>
        {isInputTextShow ? (
          <input
            type='text'
            value={tagName}
            placeholder='태그 입력'
            onChange={(e) => setTagName(e.target.value)}
            className='border border-gray-500 rounded-md py-1 h-full'
          />
        ) : (
          <div className='flex-grow h-full'></div>
        )}
        <button className='rounded-md bg-blue-600 py-1 px-3 text-white' onClick={addTagging}>
          추가
        </button>
      </div>
    </div>
  )
}

export default Tag
