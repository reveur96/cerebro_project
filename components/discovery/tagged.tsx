import { useState, FC } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

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
  tagName: string | undefined
  tagId: number
  getTag: () => void
  copyTag: TagData[]
  setCopyTag: React.Dispatch<React.SetStateAction<TagData[]>>
}

const Tagged: FC<Props> = ({ tagName, getTag, tagId, copyTag, setCopyTag }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false)

  const handleIsShow = (boolean: boolean) => {
    setShowDeleteButton(boolean)
  }

  const deleteTag = () => {
    const deleting = copyTag.filter((item) => item.tagId !== tagId)
    setCopyTag(deleting)
  }

  return (
    <div
      className='inline-block flex-shrink-0 relative  text-center text-sm mr-2 group'
      onMouseOver={() => handleIsShow(true)}
      onMouseOut={() => handleIsShow(false)}
    >
      <div className='flex items-center bg-blue-600  p-2 rounded-md text-white group-hover:bg-slate-600 group-hover:text-slate-500'>
        {tagName}
      </div>
      {showDeleteButton ? (
        <button
          className='rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          onClick={deleteTag}
        >
          <XMarkIcon className='w-5 h-5 text-white' />
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Tagged
