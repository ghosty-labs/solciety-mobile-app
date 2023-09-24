export interface INotificationItem {
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
  notification_status: TNotificationStatus
  reply_message?: string
  mention_message?: string
}

type TNotificationStatus = 'followed' | 'mentioned' | 'replied' | 'liked'
