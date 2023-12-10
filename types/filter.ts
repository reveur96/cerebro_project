export type FilterType = {
  [key: string]: OptionType[]
  category: OptionType[]
  platform: OptionType[]
  follower: OptionType[]
  gender: OptionType[]
  age: OptionType[]
  campaignType: OptionType[]
}

export type OptionType = {
  [key: string]: string | number | boolean | { min: number; max: number }
  label: string | number
  checked: boolean
  value: string | number | { min: number; max: number }
}
