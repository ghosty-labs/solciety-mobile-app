export interface IPost {
  _id: string
  signature: string
  key: string
  user: string
  alias?: string
  tag: string
  content: string
  comment?: number
  likes?: number
  created_at: number
  updated_at: number
  liked?: string[]
  total_comment: number
}

export interface IPostStatus {
  has_new_post: boolean
}

export type TPostItem = 'post' | 'post-all' | 'post-detail' | 'post-profile'
