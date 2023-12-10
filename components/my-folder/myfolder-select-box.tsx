import React, { Dispatch, FC, useEffect, useMemo, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { TagData } from '@/types/tag'
import { TagType } from '@/types/tag'
import { AlertMessage } from '@/types/forms'
import { CerebroApiResponse } from '@/types/common'
import { fetchApi } from '@/utils/functions'
import { TagStatus } from '@/utils/constants'

interface Option {
  id?: number
  label: string | number
  value: string
}

interface Props {
  publicTag: TagType[] | null
  privateTag: TagType[] | null
  getTagData: (tagStatus: TagStatus) => void
}

function getTagOptionsByTagTypes(tagTypes: TagType[]): Option[] {
  return tagTypes.map((item) => ({
    id: item.id,
    label: item.tagType || '',
    value: item.tagType || '',
  }))
}

const MyFolderTagSelectBox: FC<Props> = ({ publicTag, privateTag, getTagData }) => {
  const [newTagValue, setNewTagValue] = useState<Option | null>(null)
  const [tagTypeValue, setTagTypeValue] = useState<Option | null>(null)
  const [newTagTypeValue, setNewTagTypeValue] = useState<Option | null>(null)
  const [tagStateValue, setTagStateValue] = useState<Option | null>(null)
  const [tagTypeCode, setTagTypeCode] = useState<number | undefined>(undefined)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertToggle, setAlertToggle] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({ title: '', contents: '' })

  const tagTypeOptions = useMemo<Option[] | undefined>(() => {
    const tags = tagStateValue?.value === `${TagStatus.PUBLIC}` ? publicTag : privateTag

    if (tags !== null) {
      return getTagOptionsByTagTypes(tags)
    }
  }, [tagStateValue?.value])

  const DropdownIndicator = () => {
    return null
  }

  const handleTypeChange = (types: Option | null) => {
    setTagTypeValue(types)
    setNewTagTypeValue(null)
    setTagTypeCode(types?.id)
  }

  const handleStateValueChange = (value: Option | null) => {
    setTagStateValue(value)
  }

  const handleTagKeyDown = (
    e: React.KeyboardEvent,
    value: Option | null,
    setValue: Dispatch<React.SetStateAction<Option | null>>,
  ) => {
    if (e.key === 'Backspace' && value) {
      const newValue = value?.value.slice(0, -1)
      setValue({ label: newValue, value: newValue })
    }
    if (value?.value === '') {
      setValue(null)
    }
  }

  const setAllNull = () => {
    setTagStateValue(null)
    setTagTypeValue(null)
    setNewTagValue(null)
  }

  const addTagging = async () => {
    const showAlertMessage = (title: string, contents: string) => {
      setAlertMessage({
        title: title,
        contents: contents,
      })
      setShowAlert(true)
      setAlertToggle(!alertToggle)
    }

    if (!tagTypeValue) {
      showAlertMessage('태그 타입을 선택해주세요', '')
    }
    if (tagTypeValue && !newTagValue) {
      showAlertMessage('태그를 입력해주세요', '')
    }

    if (newTagTypeValue && newTagValue) {
      const createTagType: CerebroApiResponse<TagType> = await fetchApi(`/tag/type`, {
        method: 'POST',
        body: JSON.stringify({
          tagState: Number(tagStateValue?.value),
          tagType: tagTypeValue?.value,
        }),
      })

      const newTypeId = createTagType.data?.id

      if (createTagType.status === 'SUCCESS') {
        const createTag: CerebroApiResponse<TagData> = await fetchApi(`/tag`, {
          method: 'POST',
          body: JSON.stringify({
            tagName: newTagValue?.value,
            tagTypeId: newTypeId,
          }),
        })

        if (createTag.status === 'SUCCESS') {
          showAlertMessage('태그가 성공적으로 생성되었습니다', '')
          tagStateValue?.value === `${TagStatus.PUBLIC}`
            ? getTagData(TagStatus.PUBLIC)
            : getTagData(TagStatus.PRIVATE)
        } else {
          showAlertMessage('태그 생성에 실패하였습니다', '다시 시도해주세요')
        }
      } else {
        showAlertMessage('태그 타입 생성에 실패하였습니다', '다시 시도해주세요')
      }
    }

    if (tagTypeValue && !newTagTypeValue && newTagValue) {
      const createOnlyTag: CerebroApiResponse<TagData> = await fetchApi(`/tag`, {
        method: 'POST',
        body: JSON.stringify({
          tagName: newTagValue?.value,
          tagTypeId: tagTypeCode,
        }),
      })

      if (createOnlyTag.status === 'SUCCESS') {
        showAlertMessage('태그가 성공적으로 생성되었습니다', '')
        tagStateValue?.value === `${TagStatus.PUBLIC}`
          ? getTagData(TagStatus.PUBLIC)
          : getTagData(TagStatus.PRIVATE)
      } else if (createOnlyTag.error === 'TAG_NAME_ALREADY_EXIST') {
        showAlertMessage('이미 존재하는 태그입니다', '다시 입력해주세요')
      } else {
        showAlertMessage('태그 생성에 실패하였습니다', '다시 시도해주세요')
      }
    }

    setAllNull()
  }

  const createOption = (label: string) => ({
    label,
    value: label,
  })

  const handleCreate = (inputValue: string, type: string) => {
    const newOption = createOption(inputValue)
    if (type === 'tagType') {
      setTagTypeValue(newOption), setNewTagTypeValue(newOption)
    }

    if (type === 'tag') {
      setNewTagValue(newOption)
    }
  }

  useEffect(() => {
    setTagTypeValue(null)
  }, [tagStateValue])

  useEffect(() => {
    setNewTagValue(null)
  }, [tagTypeValue, tagStateValue])

  return (
    <>
      <div className='w-full pt-4 pb-2 flex flex-col justify-between'>
        <div className='flex'>
          <div className='w-1/2'>
            <Select<Option>
              className='mr-2 mb-2 text-sm'
              placeholder='tagState'
              options={tagState}
              onChange={handleStateValueChange}
              value={tagStateValue}
            />
          </div>
          <div className='w-1/2'>
            <CreatableSelect
              className='mb-2 text-sm'
              options={tagTypeOptions}
              onChange={handleTypeChange}
              onKeyDown={(e) => {
                handleTagKeyDown(e, tagTypeValue, setTagTypeValue)
                handleTagKeyDown(e, newTagTypeValue, setNewTagTypeValue)
              }}
              value={tagTypeValue}
              onCreateOption={(e) => handleCreate(e, 'tagType')}
              placeholder='tagType'
              createOptionPosition={'first'}
            />
          </div>
        </div>
        <CreatableSelect
          className='w-full mr-3 mb-2 text-sm'
          onChange={setNewTagValue}
          onKeyDown={(e) => {
            handleTagKeyDown(e, newTagValue, setNewTagValue)
          }}
          value={newTagValue}
          onCreateOption={(e) => handleCreate(e, 'tag')}
          placeholder='tag'
          createOptionPosition={'first'}
          components={{ DropdownIndicator }}
          openMenuOnClick={false}
        />
        <button
          onClick={addTagging}
          className='flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          태그 추가
        </button>
      </div>
    </>
  )
}

export default MyFolderTagSelectBox

const tagState = [
  { value: `${TagStatus.PUBLIC}`, label: 'public' },
  { value: `${TagStatus.PRIVATE}`, label: 'private' },
]
