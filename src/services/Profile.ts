import { SOLCIETY_API_URL } from '@env'
import axios from 'axios'
import { IProfile } from '../types/profile'
import { getTokenUser } from '../utils/common'

export const ProfileService = () => {
  const ProfileRequest = axios.create({
    baseURL: SOLCIETY_API_URL,
  })

  const getProfile = async (params?: object) => {
    const res = await ProfileRequest.get<IProfile>(`/profile`, {
      params,
    })

    return res.data
  }

  const putProfile = async (data?: object, token?: string, type?: string) => {
    const tokenUser = await getTokenUser()

    const res = await ProfileRequest.put<{ data: IProfile }>(`/profile`, data, {
      headers: {
        Authorization: type === 'initUser' ? token : tokenUser,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  }

  return {
    getProfile,
    putProfile,
  }
}
