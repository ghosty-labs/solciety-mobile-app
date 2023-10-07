export interface INotificationItem {
  _id: string
  type: TNotificationStatus
  key: string
  user: string
  from: string
  icon: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  created_at: number
  updated_at: number
}

type TNotificationStatus = 'COMMENT' | 'LIKE' | 'FOLLOW'
