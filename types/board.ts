export type BoardType = {
  id: number
  attributes: {
    title: string
    content: string
    comments: {
      data: CommentType[]
    }
  }
}

export type ReplyType = {
  attributes: {
    comment: string
    createdAt: string
  }
  id: number
}

export type CommentType = {
  id: number
  attributes: {
    content: string
    createdAt: string
    users_permissions_user: {
      data: { attributes: { username: string; createdAt: string } }
    }
  }
}
