export interface IPost {
  _id: string
  signature: string
  key: string
  user: string
  alias?: string
  tag: string
  content: string
  comment?: number
  likes?: ICurrentUserLiked
  created_at: number
  updated_at: number
  liked?: string[]
  total_like: number
  total_comment: number
}

interface ICurrentUserLiked {
  user: 'ANwvF5jduUnY7unZin42NxB5cz4ctFqEmcVt5nWekpFq'
  post: '6Aws4KtnhAG1CFRZSRJh19sKNKXY6gpRY3FJBVw7S41R'
  created_at: 1696239553482
}

export interface IPostStatus {
  has_new_post: boolean
}

export type TPostItem = 'post' | 'post-all' | 'post-detail' | 'post-profile'
