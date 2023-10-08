import { SOLCIETY_API_URL } from '@env'
import axios from 'axios'
import { getTokenUser } from '../utils/common'
import { IPost } from '../types/post'

export const LikeService = () => {
  const LikeRequest = axios.create({
    baseURL: SOLCIETY_API_URL,
  })

  const getLikes = async (params?: object) => {
    const tokenUser = await getTokenUser()

    const res = await LikeRequest.get<{ results: IPost[] }>(`/like`, {
      params,
      headers: {
        Authorization: tokenUser,
      },
    })

    return res.data.results
  }

  return {
    getLikes,
  }
}
