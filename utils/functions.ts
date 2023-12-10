import { GetCaptionMessageParams } from '@/types/forms'
import { API_URL, INPUT_INVALID_MESSAGE, INPUT_REQUIRED_MESSAGE } from './constants'
import { CerebroApiError } from './models'
import { CerebroApiResponse } from '@/types/common'

export function getCaptionMessage({ inputType, isValid, isRequired }: GetCaptionMessageParams) {
  if (typeof isValid === 'undefined') {
    if (isRequired) {
      return INPUT_REQUIRED_MESSAGE
    } else {
      return ''
    }
  }

  if (isValid) {
    return ''
  } else {
    return INPUT_INVALID_MESSAGE[inputType]
  }
}

export const classNames = (list: (string | undefined)[]) => {
  let result = ''
  list.forEach((item) => {
    if (typeof item === 'string') result += `${item} `
  })

  return result.trim()
}

export const numberComma = (x: any): null | string | number => {
  return x !== undefined ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null
}

export async function fetchApi<T>(endpoint: string, init?: RequestInit | undefined) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      ...init?.headers,
    },
  })

  const result = await response.json()

  if (!response.ok) {
    throw new CerebroApiError(result.statusCode, result.message)
  }

  return result as CerebroApiResponse<T>
}
