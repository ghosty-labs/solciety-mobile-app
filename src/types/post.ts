export interface IPost {
  _id: string
  signature: string
  key: string
  user: string
  alias?: string
  image: string
  tag: string
  content: string
  comment?: number
  likes?: ICurrentUserLiked
  created_at: number
  updated_at: number
  liked?: string[]
  total_like: number
  total_comment: number
  post_data: IPostData
  // likes
  post: string
}

interface ICurrentUserLiked {
  user: string
  post: string
  created_at: number
}

interface IPostData {
  content: string
  tag: string
  user: string
  created_at: number
  user_image: string
  user_alias: string | null
  total_like: number
  total_comment: number
}

export interface IPostStatus {
  has_new_post: boolean
}

export type TPostItem = 'post' | 'post-all' | 'post-detail' | 'post-profile'
