import { SOLCIETY_API_URL } from '@env'
import axios from 'axios'
import { IPost } from '../types/post'

export const PostService = () => {
  const PostRequest = axios.create({
    baseURL: SOLCIETY_API_URL,
  })

  const getPosts = async (params?: object) => {
    const res = await PostRequest.get<{ results: IPost[] }>('/posting', {
      params,
    })

    return res.data.results
  }

  return {
    getPosts,
  }
}
