import { TagStatus } from '@/utils/constants'

export type TagType = {
  id: number
  tagType: string
  tagState: {
    id: TagStatus
    tagState: string
  }
  tag?: {
    tagId: number
    tagName: string
    tagTypeId: number
  }[]
}

export type TagData = {
  tagId: number
  tagName: string | undefined
  tagType: {
    id: number
    createdAt: string
    tagType: string
    tagState: {
      id: number
      tagState: string
    }
  }
}
