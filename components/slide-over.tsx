import { FC, Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import InfluencerSlideMemo from './memo'
import Tagged from './discovery/tagged'
import TagSelectBox from './tag-select-box'

interface Props {
  isSlideOpen: boolean
  handleSlideOpen: () => void
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

const SlideOver: FC<Props> = ({ isSlideOpen, handleSlideOpen, tagData }) => {
  const [taggedTag, setTaggedTag] = useState<TagData[]>([])
  const [copyTag, setCopyTag] = useState<TagData[]>([])

  const copiedArray = [...taggedTag]

  const getTag = async () => {
    const res = await fetch('/data/taglist.json') 
    const data = await res.json()

    setTaggedTag(data)
  }

  useEffect(() => {
    getTag()
    setCopyTag(copiedArray)
  }, [isSlideOpen])

  return (
    <Transition.Root show={isSlideOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleSlideOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto relative w-96'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={() => handleSlideOpen()}
                      >
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='h-full overflow-y-auto bg-white p-8'>
                    <div className='space-y-6 pb-16'>
                      <div className='flex items-center'>
                        <img
                          src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80'
                          alt=''
                          className='h-16 w-16 rounded-full'
                        />
                        <div>
                          <p className='ml-4 text-md font-medium text-gray-900'>@Aimee Douglas</p>
                          <p className='ml-4 text-sm font-small text-gray-700'>
                            agasdgsda gsadgsagsdag
                          </p>
                        </div>
                      </div>
                      <div className='flex overflow-x-auto py-2'>
                        {copyTag.map((tag) => {
                          return (
                            <Tagged
                              key={tag.tagId}
                              tagName={tag.tagName}
                              tagId={tag.tagId}
                              getTag={getTag}
                              copyTag={copyTag}
                              setCopyTag={setCopyTag}
                            />
                          )
                        })}
                      </div>
                      <div>
                        <h3 className='font-medium text-gray-900'>유저 정보</h3>
                        <dl className='mt-2 divide-y divide-gray-200 border-b border-t border-gray-200'>
                          <div className='flex justify-between py-3 text-sm font-medium'>
                            <dt className='text-gray-500'>가입일</dt>
                            <dd className='text-gray-900'>June 8, 2020</dd>
                          </div>
                          <div className='flex justify-between py-3 text-sm font-medium'>
                            <dt className='text-gray-500'>캠페인 진행 횟수</dt>
                            <dd className='text-gray-900'>5회</dd>
                          </div>
                          <div className='flex justify-between py-3 text-sm font-medium'>
                            <dt className='text-gray-500'>스페셜 베네핏 진행 횟수</dt>
                            <dd className='text-gray-900'>10회</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className='font-medium text-gray-900'>유저 데이터</h3>
                        <dl className='mt-2 divide-y divide-gray-200 border-b border-t border-gray-200'>
                          <div className='flex justify-between py-3 text-sm font-medium'>
                            <dt className='text-gray-500'>플랫폼</dt>
                            <dd className='text-gray-900'>Youtube, Instagram</dd>
                          </div>
                          <div className='flex justify-between py-3 text-sm font-medium'>
                            <dt className='text-gray-500'>팔로워</dt>
                            <dd className='text-gray-900'>500,203명</dd>
                          </div>
                          <div className='flex justify-between py-3 text-sm font-medium'>
                            <dt className='text-gray-500'>팔로잉</dt>
                            <dd className='text-gray-900'>50,320명</dd>
                          </div>
                        </dl>
                      </div>
                      <TagSelectBox />
                      <InfluencerSlideMemo />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SlideOver
