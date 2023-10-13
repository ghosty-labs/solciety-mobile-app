import axios from 'axios'
import { getTokenUser } from '../utils/common'
import { ICollectible, IPostNFT } from '../types/nft'
import { BASE_URL } from '../constants/variables'

export const NftService = () => {
  const NftRequest = axios.create({
    baseURL: BASE_URL,
  })

  const getNfts = async (params?: object) => {
    const res = await NftRequest.get<{ results: ICollectible[] }>(`/nft`, {
      params,
    })

    return res.data.results
  }

  const postNft = async (data: IPostNFT) => {
    const tokenUser = await getTokenUser()

    const res = await NftRequest.post(`/nft`, data, {
      headers: {
        Authorization: tokenUser,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return res.data
  }

  return {
    getNfts,
    postNft,
  }
}
