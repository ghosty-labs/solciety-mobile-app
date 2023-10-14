import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, Portal } from 'react-native-paper'
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../../constants/nativewind'
import { INFTMinted } from '../../../types/nft'
import { IconStack, IconWallet } from '../../Icons/Icon'
import { prettyTruncate } from '../../../utils/common'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainTabParamList } from '../../../types/navigation'
import { NftService } from '../../../services/Nft'

interface ModalSucessMintedProps {
  isShow: boolean
  dataMinted: INFTMinted
}

const ModalSuccessMinted = ({
  isShow,
  dataMinted: data,
}: ModalSucessMintedProps) => {
  const [isIndexing, setIsIndexing] = useState<boolean>(true)
  const { postNft } = NftService()
  const navigation =
    useNavigation<NativeStackNavigationProp<MainTabParamList, 'Profile'>>()

  useEffect(() => {
    if (data?.response) {
      postNFT()
    }
  }, [data])

  const postNFT = async () => {
    try {
      await postNft({
        signature: data.response.signature,
        mint_address: data.nft.token.mintAddress.toString(),
        token_address: data.nft.token.address.toString(),
        collection_address: data.nft.collection?.address.toString() as string,
        name: data.nft.name,
        uri: data.nft.uri,
      })
      setIsIndexing(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsIndexing(false)
    }
  }

  return (
    <Portal>
      <Modal
        visible={isShow}
        dismissable={false}
        theme={{
          colors: {
            backdrop: 'black',
          },
        }}
      >
        <StyledView className="h-auto mx-2 px-6 py-2 bg-zinc-800 rounded-xl">
          <StyledText className="mt-2 mb-4 text-2xl font-semibold text-white text-center">
            🎉 Mint successfully 🎉
          </StyledText>
          {data?.nft?.json?.image && (
            <StyledImage
              className="mx-auto w-48 h-48 rounded-xl"
              source={{
                uri: data?.nft.json?.image,
              }}
            />
          )}
          <StyledView>
            <StyledText className="mt-2 text-2xl font-semibold text-solana-green text-center">
              {data?.nft?.name}
            </StyledText>
            <StyledView className="flex flex-row items-center justify-center mb-4">
              <IconStack size={20} color="white" />
              <StyledText className="text-lg font-extralight text-white text-center ml-2">
                Ghosty Origin Collection
              </StyledText>
            </StyledView>
            <StyledView className="flex flex-row flex-wrap gap-x-2">
              {data?.nft?.json?.attributes?.map((trait, index) => {
                return (
                  <StyledView
                    key={index}
                    className="m-1 p-2 border border-white rounded-lg"
                  >
                    <StyledText className="font-bold text-zinc-500">
                      {trait.trait_type}
                    </StyledText>
                    <StyledText className="text-white">
                      {trait.value}
                    </StyledText>
                  </StyledView>
                )
              })}
            </StyledView>
            <StyledView className="my-4">
              <StyledText className="mb-1 font-bold text-white">
                NFT Owner
              </StyledText>
              <StyledView className="flex flex-row items-center rounded-lg bg-zinc-700 p-2">
                <IconWallet size={32} color="white" />
                <StyledView className="ml-2">
                  <StyledText className="font-bold text-zinc-500">
                    Wallet Account
                  </StyledText>
                  <StyledText className="text-lg text-white">
                    {prettyTruncate(
                      data?.nft?.token.ownerAddress.toString(),
                      22,
                      'address',
                    )}
                  </StyledText>
                </StyledView>
              </StyledView>
              <StyledText className="mt-4 mb-1 font-bold text-white">
                Creators
              </StyledText>
              <StyledView>
                {data?.nft?.creators.map((creator, index) => {
                  return (
                    <StyledView
                      key={index}
                      className="flex flex-row justify-between"
                    >
                      <StyledText className="text-base text-white">
                        {prettyTruncate(
                          creator.address.toString(),
                          22,
                          'address',
                        )}
                      </StyledText>
                      <StyledText className="text-base text-white">
                        {creator.share}%
                      </StyledText>
                    </StyledView>
                  )
                })}
              </StyledView>
              <StyledText className="mt-4 mb-1 font-bold text-white">
                Royalties
              </StyledText>
              {data?.nft?.sellerFeeBasisPoints && (
                <StyledText className="text-base text-white">
                  {data?.nft?.sellerFeeBasisPoints / 100}%
                </StyledText>
              )}
            </StyledView>
          </StyledView>
          {isIndexing ? (
            <StyledView className="flex flex-row items-center justify-center my-2">
              <ActivityIndicator animating={true} size={20} color="#3f3f46" />
              <StyledText className="ml-2 text-zinc-400">
                indexing process...
              </StyledText>
            </StyledView>
          ) : (
            <StyledTouchableOpacity
              className="my-2"
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Profile', {
                  accountId: data?.nft?.token.ownerAddress.toString(),
                })
              }
            >
              <StyledText className="-mt-2 underline underline-offset-4 text-base font-bold text-center text-solana-green">
                Go to Profile
              </StyledText>
            </StyledTouchableOpacity>
          )}
        </StyledView>
      </Modal>
    </Portal>
  )
}

export default ModalSuccessMinted
