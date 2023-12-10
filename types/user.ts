export type INFLUENCER_TYPE = {
  id?: number
  gender?: string
  name: string
  display_name?: string
  username?: string
  grade?: string | null
  birthday: string
  category: string
  follower: number
  following: number
  description: string
  platform_type: string
}

export type statusOptionType = {
  id: number
  name: string
  color: string
}
