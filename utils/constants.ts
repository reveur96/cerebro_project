import { InputType } from '@/types/forms'

export const API_URL = 'http://localhost:3000'

export const INPUT_REQUIRED_MESSAGE = '* 필수 정보입니다'

export const INPUT_INVALID_MESSAGE: Record<InputType, string> = {
  USERNAME: '* 3자 이상의 영문,숫자만 사용 가능합니다',
  PASSWORD: '* 6자 이상의 영문, 숫자만 사용 가능합니다',
  PASSWORD_CHECK: '* 입력하신 비밀번호를 다시 한 번 확인해주세요',
  EMAIL: '* 이메일 주소를 다시 확인해주세요',
}

export const INPUT_VALIDATION_REGEXP: Record<InputType, RegExp> = {
  USERNAME: /^[a-zA-Z0-9]{4,}$/,
  PASSWORD: /^[a-zA-Z0-9!]{6,}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD_CHECK: /^[a-zA-Z0-9]{6,}$/,
}

export enum TagStatus {
  PUBLIC = 1,
  PRIVATE = 2,
}
