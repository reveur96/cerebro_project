import { FC } from 'react'
import { INFLUENCER_TYPE } from '../types/user'
import { numberComma } from '@/utils/functions'

type UserTableProps = {
  user: INFLUENCER_TYPE[] | null
  handleSlideOpen: () => void
}

const columns = ['유저', '플랫폼', '카테고리', '팔로워', '팔로잉', '성별']

const UserTable: FC<UserTableProps> = ({ user, handleSlideOpen }) => {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 shadow rounded-lg'>
          <div className='inline-block min-w-full bg-white align-middle '>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  {columns.map((column, i) => {
                    return (
                      <th
                        key={i}
                        scope='col'
                        className='py-6 text-start text-sm font-semibold text-gray-900 px-5 '
                      >
                        {column}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {user?.map((user) => (
                  <tr
                    key={user.id}
                    className='text-left hover:bg-purple-100 cursor-pointer'
                    onClick={() => handleSlideOpen()}
                  >
                    <td className='whitespace-nowrap py-5 pl-4 pr-3 text-sm'>
                      <div className='flex items-center'>
                        <div className='ml-4'>
                          <div className='font-medium text-gray-900'>{user.name}</div>
                          <div className='mt-1'>
                            <span className='text-gray-500 text-xs'>{user.username}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <div className='flex items-center gap-1'>
                        <div className='text-gray-900'>{user.platform_type}</div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <div className='flex flex-wrap justify-start4'>
                        {user.category.split(',').map((item) => {
                          return (
                            <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-gray-700 border border-gray-300 '>
                              <div className='text-xs font-normal leading-none max-w-full flex-initial'>
                                {item}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-start'>
                      {numberComma(user.follower)}명
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      {numberComma(user.following)}명
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      {user.gender === 'male' ? '남성' : '여성'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTable
