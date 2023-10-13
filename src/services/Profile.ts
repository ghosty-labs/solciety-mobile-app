import axios from 'axios'
import { IProfile } from '../types/profile'
import { getTokenUser } from '../utils/common'
import { BASE_URL } from '../constants/variables'

export const ProfileService = () => {
  const ProfileRequest = axios.create({
    baseURL: BASE_URL,
  })

  const getProfile = async (params?: object) => {
    const tokenUser = await getTokenUser()

    const res = await ProfileRequest.get<IProfile>(`/profile`, {
      params,
      headers: {
        Authorization: tokenUser,
      },
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
