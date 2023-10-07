export interface IReply {
  _id: string
  signature: string
  key: string
  user: string
  post: string
  parent: string
  content: string
  created_at: number
  updated_at: number
  post_data: IPostData
  image: string
  alias: string | null
}

export interface IPostData {
  content: string
  tag: string
  user: string
  user_image: string
  user_alias: string | null
  created_at: number
  updated_at: number
}
