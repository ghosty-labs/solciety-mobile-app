import {
  NftWithToken,
  SendAndConfirmTransactionResponse,
} from '@metaplex-foundation/js'

export interface INFTMinted {
  nft: NftWithToken
  response: SendAndConfirmTransactionResponse
}

export interface IPostNFT {
  signature: string
  mint_address: string
  token_address: string
  collection_address: string
  name: string
  uri: string
}

export interface ICollectible {
  _id: string
  mint_address: string
  token_address: string
  attributes: IAttribute[]
  collection_address: string
  created_at: number
  description: string
  name: string
  image: string
  signature: string
  symbol: string
  updated_at: number
  user: string
}

interface IAttribute {
  trait_type: string
  value: string
}
