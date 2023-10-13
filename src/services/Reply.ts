import axios from 'axios'
import { IReply } from '../types/reply'
import { BASE_URL } from '../constants/variables'

export const ReplyService = () => {
  const ReplyRequest = axios.create({
    baseURL: BASE_URL,
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
