import axios from 'axios'
import { IPost } from '../types/post'
import { getTokenUser } from '../utils/common'
import { BASE_URL } from '../constants/variables'

export const PostService = () => {
  const PostRequest = axios.create({
    baseURL: BASE_URL,
  })

  const getPosts = async (params?: object) => {
    const tokenUser = await getTokenUser()

    const res = await PostRequest.get<{ results: IPost[] }>(`/posting`, {
      params,
      headers: {
        Authorization: tokenUser,
      },
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

  const putLikePost = async (data?: object) => {
    const tokenUser = await getTokenUser()

    const res = await PostRequest.put(`/like/posting`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: tokenUser,
      },
    })

    return res.data
  }

  const putUnlikePost = async (data?: object) => {
    const tokenUser = await getTokenUser()

    const res = await PostRequest.put(`/unlike/posting`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: tokenUser,
      },
    })

    return res.data
  }

  return {
    getPosts,
    getPostStatus,
    putPostStatus,
    putLikePost,
    putUnlikePost,
  }
}
