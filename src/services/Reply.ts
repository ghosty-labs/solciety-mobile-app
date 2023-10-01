import { SOLCIETY_API_URL } from '@env'
import axios from 'axios'
import { IReply } from '../types/reply'

export const ReplyService = () => {
  const ReplyRequest = axios.create({
    baseURL: SOLCIETY_API_URL,
  })

  const getReplies = async (params?: object) => {
    const res = await ReplyRequest.get<{ results: IReply[] }>(`/comment`, {
      params,
    })

    return res.data.results
  }

  return {
    getReplies,
  }
}
