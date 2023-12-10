import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { convertToTimeForm } from '@/utils/convertToTimeForm'
import { API_URL } from '../utils/constants'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'

interface memoList {
  id: number
  createdAt: string
  updatedAt: string
  creatorId: string | null
  updatorId: string | null
  memoContent: string | undefined
  influencerPlatformId: number
}

const InfluencerSlideMemo = () => {
  const submitTextareaRef = useRef<HTMLTextAreaElement>(null)
  const editTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [memoList, setMemoList] = useState<SetStateAction<memoList[]>>([])
  const [textareaValue, setTextareaValue] = useState<string | undefined>()
  const [editedMemoValue, setEditedMemoValue] = useState<string | undefined>()
  const [editMemoId, setEditMemoId] = useState<number>(0)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const randomUUID = Math.random()
  const createdDate = new Date()
  const [memoData, setMemoData] = useState<memoList[]>([])

  const MEMO_API = `${API_URL}/memos`
  const TOKEN = sessionStorage.getItem('accessToken')

  const influencerPlatformId = 1

  async function postMemoData(memo: string | undefined) {
    try {
      await axios.post(
        MEMO_API,
        {
          influencerPlatformId: influencerPlatformId,
          memoContent: memo,
        },
        { headers: { Authorization: `Bearer ${TOKEN}` } },
      )
    } catch (error) {
      alert(error)
    }
    setMemoData([
      ...memoData,
      {
        id: randomUUID,
        createdAt: createdDate.toString(),
        updatedAt: createdDate.toString(),
        creatorId: 'Krystal170',
        updatorId: 'Krystal170',
        memoContent: memo,
        influencerPlatformId: 1,
      },
    ])
  }

  async function getMemoData() {
    try {
      const { data } = await axios.get(`${MEMO_API}/all`, {
        params: { influencerPlatform: influencerPlatformId },
      })
      setMemoList(data.data)
    } catch (error) {
      alert(error)
    }
  }

  async function editMemoData(id: number, memo: string | undefined) {
    try {
      await axios.patch(
        MEMO_API,
        {
          memoContent: memo,
        },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
          params: {
            influencerPlatform: influencerPlatformId,
            memoId: id,
          },
        },
      )
    } catch (error: any) {
      if (error.response.data.message === 'Invalid Resource ID') {
        alert('권한이 없습니다. 다시 확인해주세요.')
      }
    }
    setMemoData([
      {
        id: id,
        createdAt: createdDate.toString(),
        updatedAt: createdDate.toString(),
        creatorId: 'Krystal170',
        updatorId: 'Krystal170',
        memoContent: memo,
        influencerPlatformId: 1,
      },
    ])
  }

  async function deleteMemoData(id: number) {
    try {
      await axios.delete(MEMO_API, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        params: {
          influencerPlatform: influencerPlatformId,
          memoId: id,
        },
      })
    } catch (error: any) {
      if (error.response.data.message === 'Invalid Resource ID') {
        alert('권한이 없습니다. 다시 확인해주세요.')
      }
    }

    setMemoData([])
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const enteredText = submitTextareaRef.current?.value
    if (enteredText?.trim().length === 0) {
      return alert('내용을 입력해주세요')
    }
    await postMemoData(enteredText)
    await getMemoData()

    if (submitTextareaRef.current) {
      setTextareaValue('')
      submitTextareaRef.current.style.height = 'auto'
    }
  }
  const handleEditedMemo = async (id: number, editedMemoValue: string | undefined) => {
    await editMemoData(id, editedMemoValue)
    await getMemoData()
    setEditedMemoValue('')
    setIsEditMode(false)
  }

  const memoTextBoxHandler = (event: any) => {
    const textarea = event.target
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`

    if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`
    }
    setTextareaValue(event.target.value)
  }

  const handleMemoEditButton = (id: number, memoContent: string | undefined) => {
    setIsEditMode(true)
    setEditMemoId(id)
    setEditedMemoValue(memoContent)
  }

  const handleMemoDeleteButton = async (id: number) => {
    await deleteMemoData(id)
    await getMemoData()
  }

  const handleEditCancelButton = () => {
    setIsEditMode(false)
    setEditedMemoValue('')
  }

  useEffect(() => {
    getMemoData()
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit} className=' flex flex-col'>
        <label htmlFor='memo' className='font-medium text-gray-900 mb-2'>
          메모
        </label>
        <textarea
          id='memo'
          ref={submitTextareaRef}
          onChange={memoTextBoxHandler}
          value={textareaValue}
          className='break-all pb-2 w-21 mb-2 resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inherit focus:ring-blue-500 sm:text-sm sm:leading-6 overflow-hidden'
        />
        <div className='flex flex-row'>
          <button className='flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
            메모 추가
          </button>
        </div>
      </form>

      <div className='w-auto'>
        <ul className='w-80 max-h-96 overflow-y-auto rounded-md ring-1 ring-gray-200 shadow-md'>
          {memoData.map(({ id, creatorId, memoContent, updatedAt }) => {
            return (
              <li
                key={id}
                className='min-h-[120px] px-2 py-2.5 flex flex-row border-t-2 box-border text-gray-900 shadow-sm  sm:text-sm sm:leading-6 '
              >
                <img
                  src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80'
                  alt=''
                  className='h-6 w-6 rounded-full'
                />
                <div className='w-full flex flex-col justify-between px-2'>
                  <div className='w-full flex flex-row justify-between '>
                    <span className='mb-1 text-gray-600 text-sm'>{creatorId}</span>
                    <div className='flex flex-row'>
                      <button
                        onClick={() => handleMemoEditButton(id, memoContent)}
                        className='text-xs text-gray-300 mr-1.5'
                      >
                        <PencilSquareIcon className='text-gray-400 w-4 h-4 hover:text-blue-500' />
                      </button>
                      <button
                        onClick={() => handleMemoDeleteButton(id)}
                        className='text-xs text-gray-300'
                      >
                        <TrashIcon className='text-gray-400 w-4 h-4 hover:text-blue-500' />
                      </button>
                    </div>
                  </div>
                  {isEditMode && editMemoId === id ? (
                    <>
                      <textarea
                        id='memo'
                        ref={editTextareaRef}
                        value={editedMemoValue}
                        onChange={(e) => setEditedMemoValue(e.target.value)}
                        autoFocus
                        className=' w-full resize-none mb-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none  focus:ring-inherit focus:ring-blue-500 sm:text-sm sm:leading-6 overflow-hidden'
                      />
                      <div className='flex flex-row justify-end'>
                        <button
                          onClick={() => handleEditCancelButton()}
                          className='w-fit rounded-md mb-2 bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 '
                        >
                          취소
                        </button>
                        <button
                          onClick={() => handleEditedMemo(id, editedMemoValue)}
                          className='w-fit rounded-md mb-2 ml-1 bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        >
                          완료
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className='mb-2 w-100 max-w-full h-auto break-all'>{memoContent}</p>
                  )}
                  <span className='text-gray-400 text-xs'>
                    {convertToTimeForm(updatedAt, 'date')}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
export default InfluencerSlideMemo
