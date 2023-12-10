import { FC, Fragment } from 'react'
import { classNames } from '@/utils/functions'
import { statusOptionType } from '../types/user'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const statusOption = [
  { id: 1, name: '활성', color: 'green' },
  { id: 2, name: '준비', color: 'yellow' },
  { id: 3, name: '진행중', color: 'blue' },
  { id: 4, name: '일시정지', color: 'yellow' },
  { id: 5, name: '종료', color: 'red' },
  { id: 6, name: '보관', color: 'purple' },
]

type SelectBoxProps = {
  status: statusOptionType
  setStatus: any
}

const SelectBox: FC<SelectBoxProps> = ({ status, setStatus }) => {
  return (
    <Listbox value={status} onChange={setStatus}>
      {({ open }) => (
        <>
          <div className='relative mt-2 w-2/12'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
              <span className='flex items-center'>
                <span
                  className={classNames([
                    `bg-${status.color}-500`,
                    'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                  ])}
                />
                <span className='ml-3 block truncate'>{status.name}</span>
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {statusOption.map((status) => (
                  <Listbox.Option
                    key={status.id}
                    className={({ active }) =>
                      classNames([
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      ])
                    }
                    value={status}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames([
                              `bg-${status.color}-500`,
                              'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                            ])}
                            aria-hidden='true'
                          />
                          <span
                            className={classNames([
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            ])}
                          >
                            {status.name}
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={classNames([
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            ])}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SelectBox
