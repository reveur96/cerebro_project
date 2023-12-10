import React, { SVGProps } from 'react'

export type IconComponent = React.FC<SVGProps<SVGSVGElement>>

export const ArrowLeft: IconComponent = (props) => (
  <svg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.9934 20.1187C13.3876 20.5511 13.3934 21.2459 13.0001 21.6773C12.6096 22.1056 11.9813 22.111 11.5818 21.6727L5.29715 14.7793C4.90434 14.3485 4.89757 13.6573 5.29715 13.219L11.5818 6.32561C11.9746 5.89474 12.6069 5.88972 13.0001 6.32106C13.3906 6.74942 13.392 7.44245 12.9934 7.87964L8.41433 12.9023H21.9976C22.5513 12.9023 23.0001 13.3892 23.0001 13.9992C23.0001 14.605 22.5476 15.096 21.9976 15.096H8.41433L12.9934 20.1187Z'
      fill='current'
    />
    <mask id='mask0_26_2726' maskUnits='userSpaceOnUse' x='4' y='5' width='20' height='18'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.9934 20.1187C13.3876 20.5511 13.3934 21.2459 13.0001 21.6773C12.6096 22.1056 11.9813 22.111 11.5818 21.6727L5.29715 14.7793C4.90434 14.3485 4.89757 13.6573 5.29715 13.219L11.5818 6.32561C11.9746 5.89474 12.6069 5.88972 13.0001 6.32106C13.3906 6.74942 13.392 7.44245 12.9934 7.87964L8.41433 12.9023H21.9976C22.5513 12.9023 23.0001 13.3892 23.0001 13.9992C23.0001 14.605 22.5476 15.096 21.9976 15.096H8.41433L12.9934 20.1187Z'
        fill='white'
        stroke='current'
      />
    </mask>
    <g mask='url(#mask0_26_2726)'></g>
  </svg>
)

export const FileUpload: IconComponent = (props) => (
  <svg
    width='17'
    height='17'
    viewBox='0 0 17 17'
    xmlns='http://www.w3.org/2000/svg'
    className='w-5 h-5'
    {...props}
  >
    <path
      d='M15.5167 3.16667H13.8333V1.48333C13.8333 1.03333 13.4667 0.666668 13.0167 0.666668H12.9917C12.5333 0.666668 12.1667 1.03333 12.1667 1.48333V3.16667H10.4917C10.0417 3.16667 9.675 3.53333 9.66667 3.98333V4.00833C9.66667 4.46667 10.0333 4.83333 10.4917 4.83333H12.1667V6.50833C12.1667 6.95833 12.5333 7.33333 12.9917 7.325H13.0167C13.4667 7.325 13.8333 6.95833 13.8333 6.50833V4.83333H15.5167C15.9667 4.83333 16.3333 4.46667 16.3333 4.01667V3.98333C16.3333 3.53333 15.9667 3.16667 15.5167 3.16667ZM11.3333 6.50833V5.66667H10.4917C10.05 5.66667 9.63333 5.49167 9.31667 5.18333C9.00833 4.86667 8.83333 4.45 8.83333 3.98333C8.83333 3.68333 8.91667 3.40833 9.05833 3.16667H2.16667C1.25 3.16667 0.5 3.91667 0.5 4.83333V14.8333C0.5 15.75 1.25 16.5 2.16667 16.5H12.1667C13.0833 16.5 13.8333 15.75 13.8333 14.8333V7.93333C13.5833 8.075 13.3 8.16667 12.9833 8.16667C12.075 8.15833 11.3333 7.41667 11.3333 6.50833ZM11.3 14.8333H3C2.65833 14.8333 2.45833 14.4417 2.66667 14.1667L4.31667 11.975C4.49167 11.7417 4.83333 11.7583 5 11.9917L6.33333 14L8.50833 11.1C8.675 10.8833 9 10.875 9.16667 11.0917L11.625 14.1583C11.8417 14.4333 11.65 14.8333 11.3 14.8333Z'
      fill='current'
    />
  </svg>
)

export const Close: IconComponent = (props) => (
  <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0.323093 15.6769C0.753883 16.1077 1.45419 16.1077 1.88498 15.6769L8 9.56189L14.115 15.6769C14.5458 16.1077 15.2461 16.1077 15.6769 15.6769C16.1077 15.2461 16.1077 14.5458 15.6769 14.115L9.56189 8L15.6769 1.88498C16.1077 1.45419 16.1077 0.753883 15.6769 0.323093C15.2461 -0.107698 14.5458 -0.107698 14.115 0.323093L8 6.43811L1.88498 0.323093C1.45419 -0.107698 0.753883 -0.107698 0.323093 0.323093C-0.107698 0.753883 -0.107698 1.45419 0.323093 1.88498L6.43811 8L0.323093 14.115C-0.107698 14.5458 -0.107698 15.2461 0.323093 15.6769Z'
    />
  </svg>
)

export const More: IconComponent = (props) => (
  <svg width='6' height='20' viewBox='0 0 6 20' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M2.99983 5.42858C4.25697 5.42858 5.28554 4.4 5.28554 3.14286C5.28554 1.88572 4.25697 0.857147 2.99983 0.857147C1.74268 0.857147 0.714111 1.88572 0.714111 3.14286C0.714111 4.4 1.74268 5.42858 2.99983 5.42858ZM2.99983 7.71429C1.74268 7.71429 0.714111 8.74286 0.714111 10C0.714111 11.2571 1.74268 12.2857 2.99983 12.2857C4.25697 12.2857 5.28554 11.2571 5.28554 10C5.28554 8.74286 4.25697 7.71429 2.99983 7.71429ZM2.99983 14.5714C1.74268 14.5714 0.714111 15.6 0.714111 16.8571C0.714111 18.1143 1.74268 19.1429 2.99983 19.1429C4.25697 19.1429 5.28554 18.1143 5.28554 16.8571C5.28554 15.6 4.25697 14.5714 2.99983 14.5714Z'
      fill='current'
    />
  </svg>
)

export const Delete: IconComponent = (props) => (
  <svg width='16' height='18' viewBox='0 0 16 18' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M5 0V1H0V3H1V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H13C13.5304 18 14.0391 17.7893 14.4142 17.4142C14.7893 17.0391 15 16.5304 15 16V3H16V1H11V0H5ZM3 3H13V16H3V3ZM5 5V14H7V5H5ZM9 5V14H11V5H9Z'
      fill='current'
    />
  </svg>
)

export const SearchIcon: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-5 h-5'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
    />
  </svg>
)

export const TagIcon: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='1.5'
    stroke='currentColor'
    className='w-6 h-6'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
    />
    <path strokeLinecap='round' strokeLinejoin='round' d='M6 6h.008v.008H6V6z' />
  </svg>
)
