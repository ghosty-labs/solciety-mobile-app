import axios from 'axios'
import { getTokenUser } from '../utils/common'
import { IPost } from '../types/post'
import { BASE_URL } from '../constants/variables'

export const LikeService = () => {
  const LikeRequest = axios.create({
    baseURL: BASE_URL,
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
