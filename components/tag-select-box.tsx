import React, { FC, useState } from 'react'
import { FilterType } from '@/types/filter'
import CreatableSelect from 'react-select/creatable'
import { Close } from './icon'
import Select from 'react-select'

interface Option {
  label: string
  value: string
}

interface TagSelectBoxProps {
  handleCreateTag?: () => void
}
const TagSelectBox: FC<TagSelectBoxProps> = ({ handleCreateTag }) => {
  const [tagValue, setTagValue] = useState <readonly Option[] | [] >([])
  const [newTagValue, setNewTagValue] = useState<readonly Option[]>([])
  const [tagTypeValue, setTagTypeValue] = useState<Option | null>()
  const [newTagTypeValue, setNewTagTypeValue] = useState<Option | null>()

  const updateAddedTagList = () => {
    if (!tagTypeValue) return alert('tagType을 선택해주세요.')
    if (!tagValue) return alert('tag를 선택해주세요.')
    setTagTypeValue(null)
    setTagValue([])
  }

  const createOption = (label: string) => ({
    value: label,
    label,
  })

  const handleCreate = (inputValue: string, type: string) => {
    const newOption = createOption(inputValue)
    if (type === 'tagType') {
      setTagTypeValue(newOption), setNewTagTypeValue(newOption)
    }

    if (type === 'tag') {
      setTagValue((prev) => [...prev, newOption]), setNewTagValue((prev) => [...prev, newOption])
    }
    if (!handleCreateTag) return
    handleCreateTag()
  }

  return (
    <div className='w-full pt-4 pb-2 flex flex-col justify-between'>
      <div className='flex flex-row mb-4'>
        {tagList &&
          tagList.map((item: any) => {
            return (
              <div className='w-fit flex flex-row justify-between items-center rounded-md bg-indigo-500 py-2 px-2 shadow-sm ring-1 ring-inset ring-gray-200'>
                <span className='text-xs font-semibold text-white ' key={item.label}>
                  {item.label}
                </span>
                <Close fill='white' className='w-2 h-2 ml-2' />
              </div>
            )
          })}
      </div>

      <Select
        className='w-full mr-3 mb-2 text-sm'
        isClearable
        placeholder='tagState'
        options={tagState}
      />

      <CreatableSelect
        className='w-full mr-3 mb-2 text-sm'
        options={campaignType}
        onChange={(newValue) => setTagTypeValue(newValue)}
        value={tagTypeValue}
        onCreateOption={(e) => handleCreate(e, 'tagType')}
        placeholder='tagType'
        createOptionPosition={'first'}
      />

      <CreatableSelect
        className='w-full mr-3 mb-2 text-sm'
        options={campaigns}
        isMulti
        onChange={(newValue) => setTagValue(newValue)}
        value={tagValue}
        onCreateOption={(e) => handleCreate(e, 'tag')}
        placeholder='tag'
        createOptionPosition={'first'}
      />

      <button
        onClick={updateAddedTagList}
        className='flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        태그 추가
      </button>
    </div>
  )
}

export default TagSelectBox
