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
}
