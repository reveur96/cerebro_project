export type InputType = 'USERNAME' | 'PASSWORD' | 'PASSWORD_CHECK' | 'EMAIL'

export type GetCaptionMessageParams = {
  inputType: InputType
  isValid: boolean | undefined
  isRequired?: boolean
}

export interface AlertMessage {
  title: string
  contents: string
}
