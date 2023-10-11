import { SOLCIETY_API_URL } from '@env'
import axios from 'axios'
import { getTokenUser } from '../utils/common'
import { ICollectible, IPostNFT } from '../types/nft'

export const NftService = () => {
  const NftRequest = axios.create({
    baseURL: SOLCIETY_API_URL,
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
