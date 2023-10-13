import axios from 'axios'
import { getTokenUser } from '../utils/common'
import { INotificationItem } from '../types/notification'
import { BASE_URL } from '../constants/variables'

export const NotificationService = () => {
  const NotificationRequest = axios.create({
    baseURL: BASE_URL,
  })

  const getNotification = async (params?: object) => {
    const tokenUser = await getTokenUser()

    const res = await NotificationRequest.get<{ results: INotificationItem[] }>(
      `/notification`,
      {
        params,
        headers: {
          Authorization: tokenUser,
        },
      },
    )

    return res.data.results
  }

  const getNotificationStatus = async (params?: object) => {
    const res = await NotificationRequest.get<{ has_notification: boolean }>(
      `/notification/notification-status`,
      {
        params,
      },
    )

    return res.data.has_notification
  }

  const putNotificationStatus = async () => {
    const tokenUser = await getTokenUser()

    const res = await NotificationRequest.put(`/notification`, undefined, {
      headers: {
        Authorization: tokenUser,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  }

  return {
    getNotification,
    getNotificationStatus,
    putNotificationStatus,
  }
}
