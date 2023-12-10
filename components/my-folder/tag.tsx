import { TagType } from '@/types/tag'
import { classNames, fetchApi } from '@/utils/functions'
import { FC, useState, useRef } from 'react'
import { TagIcon } from '../icon'
import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TagStatus } from '@/utils/constants'

interface TagsProps {
  item: TagType
  handleCurrentFolder: (tag: string) => void
  getTagData: (tagStateId: TagStatus) => Promise<void>
}

const Tag: FC<TagsProps> = ({ item, handleCurrentFolder, getTagData }) => {
  const TagTypeRef = useRef<HTMLInputElement>(null)
  const TagRef = useRef<HTMLInputElement>(null)
  const [editModeTagId, setEditModeTagId] = useState<number | null>()
  const [editedTagTypeValue, setEditedTagTypeValue] = useState<string | undefined>()
  const [editedTagValue, setEditedTagValue] = useState<string | undefined>()
  const [hoveredTagId, setHoveredTagId] = useState<number | undefined>()
  const [hoveredTagTypeId, setHoveredTagTypeId] = useState<number | undefined>()
  const [isTagTypeEditMode, setIsTagTypeEditMode] = useState<boolean>(false)
  const [isTagEditMode, setIsTagEditMode] = useState<boolean>(false)
  const [isHoveredTag, setIsHoveredTag] = useState<boolean>(false)
  const [isHoveredTagType, setIsHoveredTagType] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)

  async function deleteTagData(id: number) {
    await fetchApi(`/tag/${id}`, { method: 'DELETE' })
  }

  async function editTagData(id: number, item: TagType, editedTag: string | undefined) {
    await fetchApi(`/tag/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        tagTypeId: item.id,
        tagName: editedTag,
      }),
    })
  }

  async function editTagTypeData(
    id: number,
    tagStateId: number,
    editedTagType: string | undefined,
  ) {
    await fetchApi(`/tag/type/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        tagState: tagStateId,
        tagType: editedTagType,
      }),
    })
  }

  async function deleteTagTypeData(id: number) {
    await fetchApi(`/tag/type/${id}`, { method: 'DELETE' })
  }

  const handleTagTypeClick = (item: TagType) => {
    if (item.tag != undefined && item.tag?.length > 0) {
      setIsClicked((prev) => !prev)
      setIsOpen((prev) => !prev)
    }
  }

  const handleTagTypeDeleteButton = async (id: number, tagStateId: TagStatus, tags: any) => {
    let isConfirmed = true

    if (tags.length > 0) {
      isConfirmed = confirm('해당 태그타입 하위에 생성된 태그가 있습니다. 삭제하시겠습니까?')
    }

    if (isConfirmed) {
      await deleteTagTypeData(id)
      await getTagData(tagStateId)
    }
  }

  const handleTagTypeEditMode = (tagTypeName: string) => {
    setEditedTagTypeValue(tagTypeName)
    setIsTagTypeEditMode((prev) => !prev)
    setIsOpen((prev) => !prev)
  }

  const handleTagTypeEditButton = async (
    id: number,
    tagStateId: number,
    editedTagType: string | undefined,
  ) => {
    setIsTagTypeEditMode((prev) => !prev)
    await editTagTypeData(id, tagStateId, editedTagType)
    await getTagData(tagStateId)
  }

  const handleTagTypeEditCancelButton = () => {
    setIsTagTypeEditMode((prev) => !prev)
    setEditedTagTypeValue('')
    setIsOpen((prev) => !prev)
  }

  const handleTagDeleteButton = async (id: number, item: any) => {
    await deleteTagData(id)
    await getTagData(item.tagState.id)
  }

  const handleTagEditMode = (tagId: number, tagName: string) => {
    setEditModeTagId(tagId)
    setEditedTagValue(tagName)
    setIsTagEditMode((prev) => !prev)
  }

  const handleTagEditButton = async (id: number, item: TagType, editedTag: string | undefined) => {
    setIsTagEditMode((prev) => !prev)
    await editTagData(id, item, editedTag)
    await getTagData(item.tagState.id)
  }

  const handleTagEditCancelButton = () => {
    setIsTagEditMode((prev) => !prev)
    setEditedTagValue('')
  }

  return (
    <div key={item.id} onClick={() => handleCurrentFolder(item.tagType)}>
      <div
        onMouseEnter={() => {
          setIsHoveredTagType(true)
          setHoveredTagTypeId(item.id)
        }}
        onMouseLeave={() => setIsHoveredTagType(false)}
        onClick={() => handleTagTypeClick(item)}
        className={classNames([
          'flex flex-row justify-between px-1 w-full cursor-pointer',
          isClicked ? 'bg-blue-100' : 'bg-white hover:bg-gray-100',
        ])}
      >
        <div className='flex flex-row items-center'>
          <TagIcon
            className={classNames([
              'w-5 min-w-fit h-5 m-1',
              hoveredTagTypeId === item.id && isHoveredTagType && !isTagTypeEditMode && !isClicked
                ? 'text-blue-500'
                : 'text-gray-500',
            ])}
          />
          {isTagTypeEditMode ? (
            <div className='flex flex-row items-center mr-1'>
              <input
                autoFocus
                ref={TagTypeRef}
                value={editedTagTypeValue}
                onChange={(e) => setEditedTagTypeValue(e.target.value)}
                className=' w-full resize-none rounded-md border-0 py-1 px-2 ml-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none  focus:ring-inherit focus:ring-blue-500 sm:text-sm sm:leading-6 overflow-hidden'
              />
              <button onClick={() => handleTagTypeEditCancelButton()}>
                <XMarkIcon className='text-gray-500 w-6 h-6 rounded-md mx-1 bg-white py-1 px-1 shadow-sm hover:bg-red-100 hover:ring-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-red-500' />
              </button>
              <button
                onClick={() =>
                  handleTagTypeEditButton(item.id, item.tagState.id, editedTagTypeValue)
                }
              >
                <CheckIcon className='text-gray-500 w-6 h-6 rounded-md  bg-white py-1 px-1 shadow-sm hover:bg-blue-100 hover:ring-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-blue-500' />
              </button>
            </div>
          ) : (
            <>
              <a
                className={classNames([
                  'break-keep group flex gap-x-3 rounded-md p-1 text-sm leading-6 font-semibold',
                  hoveredTagTypeId === item.id &&
                  isHoveredTagType &&
                  !isTagTypeEditMode &&
                  !isClicked
                    ? 'text-blue-500'
                    : 'text-gray-700 ',
                ])}
              >
                {item.tagType}
              </a>
              <span
                className={classNames([
                  'inline-flex items-center gap-x-1.5 rounded-full px-2 mx-2 text-xs font-semibold shadow-sm',
                  isClicked
                    ? 'ring-1 ring-gray-500  text-gray-600'
                    : 'ring-1 ring-gray-300  text-gray-400',
                ])}
              >
                {item.tag?.length}
              </span>
            </>
          )}
        </div>
        {!isTagTypeEditMode && (
          <div
            className={classNames([
              'flex',
              hoveredTagTypeId === item.id && isHoveredTagType && !isTagTypeEditMode
                ? 'visible'
                : 'invisible',
            ])}
          >
            <button
              onClick={() => handleTagTypeEditMode(item.tagType)}
              className='text-xs text-gray-300 mr-1.5'
            >
              <PencilSquareIcon className='text-gray-400 w-4 h-4 hover:text-blue-500' />
            </button>
            <button
              onClick={() => handleTagTypeDeleteButton(item.id, item.tagState.id, item.tag)}
              className='text-xs text-gray-300 mr-2'
            >
              <TrashIcon className='text-gray-400 w-4 h-4 hover:text-blue-500' />
            </button>
          </div>
        )}
      </div>
      {isOpen && item.tag ? (
        <ul
          role='list'
          className={classNames([
            'space-y-1 list-disc list-inside pl-9 py-2',
            isClicked ? 'bg-gray-100 shadow-inner' : 'bg-white hover:bg-gray-100 ',
          ])}
        >
          {item.tag?.map((tag) => {
            return (
              <li
                key={tag.tagId}
                onMouseEnter={() => {
                  setIsHoveredTag(true)
                  setHoveredTagId(tag.tagId)
                }}
                onMouseLeave={() => setIsHoveredTag(false)}
                className='text-gray-900 text-sm list-inside flex flex-row justify-between pb-1 '
              >
                {isTagEditMode && tag.tagId === editModeTagId ? (
                  <div className='flex flex-row  items-center pr-2'>
                    <input
                      autoFocus
                      ref={TagRef}
                      value={editedTagValue}
                      onChange={(e) => setEditedTagValue(e.target.value)}
                      className='w-full resize-none rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none  focus:ring-inherit focus:ring-blue-500 sm:text-sm sm:leading-6 overflow-hidden'
                    />
                    <button onClick={() => handleTagEditCancelButton()}>
                      <XMarkIcon className='text-gray-500 w-6 h-6 rounded-md mx-1   bg-white py-1 px-1 shadow-sm  hover:bg-red-100 hover:ring-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-red-500' />
                    </button>
                    <button onClick={() => handleTagEditButton(tag.tagId, item, editedTagValue)}>
                      <CheckIcon className='text-gray-500 w-6 h-6 rounded-md  bg-white py-1 px-1 shadow-sm hover:bg-indigo-100 hover:ring-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-indigo-500' />
                    </button>
                  </div>
                ) : (
                  <span className='break-keep cursor-default'>{tag.tagName}</span>
                )}
                {!isTagEditMode && (
                  <div
                    className={classNames([
                      'flex pl-3',
                      tag.tagId === hoveredTagId && isHoveredTag && !isTagEditMode
                        ? 'visible'
                        : 'invisible',
                    ])}
                  >
                    <button
                      onClick={() => handleTagEditMode(tag.tagId, tag.tagName)}
                      className='text-xs text-gray-300 mr-2'
                    >
                      <PencilSquareIcon className='text-gray-400 w-4 h-4 hover:text-blue-500' />
                    </button>
                    <button
                      onClick={() => handleTagDeleteButton(tag.tagId, item)}
                      className='text-xs text-gray-300 mr-2'
                    >
                      <TrashIcon className='text-gray-400 w-4 h-4 hover:text-blue-500' />
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default Tag