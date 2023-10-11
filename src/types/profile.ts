export interface IProfile {
  _id: string
  public_key: string
  alias: string | null
  image: string
  bio: string | null
  total_follower: 0
  total_following: 0
  total_post: 0
  has_new_post: boolean
  has_notification: boolean
  is_verified: boolean
  is_followed: boolean
  created_at: number
  updated_at: number
}
