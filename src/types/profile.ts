export interface IProfile {
  _id: string
  public_key: string
  __v: number
  alias: string | null
  bio: string | null
  created_at: number
  has_new_post: boolean
  image: string
  updated_at: number
}
