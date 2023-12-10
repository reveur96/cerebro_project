export type CerebroApiResponse<T> = {
  status: any
  data: T
  statusCode: number
  error?: string
}

export type LoginResult = {
  accessToken: string
  name: string
}
