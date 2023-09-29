import { SOLCIETY_API_URL } from '@env'
import axios from 'axios'
import { IPost } from '../types/post'
import { getTokenUser } from '../utils/common'

export const PostService = () => {
  const PostRequest = axios.create({
    baseURL: SOLCIETY_API_URL,
  })

  const getPosts = async (params?: object) => {
    const res = await PostRequest.get<{ results: IPost[] }>(`/posting`, {
      params,
    })

    return res.data.results
  }

  const getPostStatus = async (params?: object) => {
    const res = await PostRequest.get(`/posting/new-post-status`, {
      params,
    })

    return res.data
  }

  const putPostStatus = async () => {
    const tokenUser = await getTokenUser()

    const res = await PostRequest.put(`/posting/new-post-status`, undefined, {
      headers: {
        Authorization: tokenUser,
      },
    })

    return res.data
  }

  return {
    getPosts,
    getPostStatus,
    putPostStatus,
  }
}
