import { FC, useLayoutEffect, useRef, useState } from 'react'
import { INFLUENCER_USERS_TYPE } from '@/types/user'
import { classNames } from '@/utils/functions'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'

type UserTableProps = {
  influencer: INFLUENCER_USERS_TYPE[] | null
  handleSlideOpen: () => void
}

const columns = ['유저', '상태', '카테고리', '등급', '성별']

const UserTable: FC<UserTableProps> = ({ influencer, handleSlideOpen }) => {
  const checkbox = useRef<HTMLInputElement>(null)
  const [influencerList, setInfluencerList] = useState<INFLUENCER_USERS_TYPE[] | null>(influencer)
  const [checked, setChecked] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedInfluencer, setSelectedInfluencer] = useState<INFLUENCER_USERS_TYPE[]>([])

  const handleSelect = (influencer: INFLUENCER_USERS_TYPE) => {
    if (selectedInfluencer.includes(influencer)) {
      return setSelectedInfluencer(
        selectedInfluencer.filter((selectedInfluencer) => selectedInfluencer !== influencer),
      )
    }
    setSelectedInfluencer([...selectedInfluencer, influencer])
  }

  useLayoutEffect(() => {
    if (!checkbox.current || !influencerList) return
    const isIndeterminate =
      selectedInfluencer.length > 0 && selectedInfluencer.length < influencerList.length
    setChecked(selectedInfluencer.length === influencerList?.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [selectedInfluencer])

  return (
    <>
      <div className='mt-6 flow-root bg-white rounded-sm shadow'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='relative'>
              {selectedInfluencer.length > 0 && (
                <div className='absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12'>
                  <button
                    type='button'
                    className='inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white'
                  >
                    수정하기
                  </button>
                  <button
                    type='button'
                    className='inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white'
                  >
                    삭제하기
                  </button>
                </div>
              )}
              <table className='min-w-full table-fixed divide-y divide-gray-300'>
                <thead>
                  <tr>
                    <th scope='col' className='relative px-7 sm:w-12 sm:px-6'>
                      <input
                        type='checkbox'
                        className='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600'
                        ref={checkbox}
                        checked={checked}
                      />
                    </th>
                    {columns.map((column, i) => {
                      return (
                        <th
                          scope='col'
                          className='min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900'
                        >
                          {column}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white overflow-y-autp'>
                  {influencerList?.map((influencer) => (
                    <tr key={influencer.id} className='hover:bg-gray-300'>
                      <td className='relative px-7 sm:w-12 sm:px-6'>
                        {selectedInfluencer.includes(influencer) && (
                          <div className='absolute inset-y-0 left-0 w-0.5 bg-blue-600' />
                        )}
                        <input
                          type='checkbox'
                          className='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600'
                          value={influencer.id}
                          checked={selectedInfluencer.includes(influencer)}
                          onChange={() => handleSelect(influencer)}
                        />
                      </td>
                      <td
                        onClick={() => handleSlideOpen()}
                        className={classNames([
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium cursor-pointer hover:animate-pulse',
                          selectedInfluencer.includes(influencer)
                            ? 'text-blue-600'
                            : 'text-gray-900',
                        ])}
                      >
                        <div className='flex flex-col'>
                          <span>{influencer.name}</span>
                          <span className='text-xs text-gray-400'>{influencer.username}</span>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {influencer.gender}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {influencer.grade}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {influencer.category}
                      </td>
                      <td className='whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3'>
                        <a href='#' className='text-blue-600 hover:text-blue-900'>
                          Edit<span className='sr-only'>, {influencer.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <nav className='flex items-center justify-between border-t border-gray-200 px-4 py-4'>
          <div className='-mt-px flex w-0 flex-1'>
            <a
              href='#'
              className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              <ArrowLongLeftIcon className='mr-3 h-5 w-5 text-gray-400' aria-hidden='true' />
              Previous
            </a>
          </div>
          <div className='hidden md:-mt-px md:flex'>
            <a
              href='#'
              className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              1
            </a>
            <a
              href='#'
              className='inline-flex items-center border-t-2 border-blue-500 px-4 pt-4 text-sm font-medium text-blue-600'
              aria-current='page'
            >
              2
            </a>
            <a
              href='#'
              className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              3
            </a>
            <span className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500'>
              ...
            </span>
            <a
              href='#'
              className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              8
            </a>
            <a
              href='#'
              className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              9
            </a>
            <a
              href='#'
              className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              10
            </a>
          </div>
          <div className='-mt-px flex w-0 flex-1 justify-end'>
            <a
              href='#'
              className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              Next
              <ArrowLongRightIcon className='ml-3 h-5 w-5 text-gray-400' aria-hidden='true' />
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}

export default UserTable
