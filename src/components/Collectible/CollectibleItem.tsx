import React from 'react'
import { StyledImage, StyledText, StyledView } from '../../constants/nativewind'
import { ICollectible } from '../../types/nft'
import { ActivityIndicator } from 'react-native-paper'

interface CollectibleItemProps {
  nft: ICollectible
}

const CollectibleItem = ({ nft }: CollectibleItemProps) => {
  return (
    <StyledView className="mx-4 mb-4">
      {nft.image ? (
        <StyledImage
          className="w-40 h-40 rounded-xl"
          source={{
            uri: nft.image,
          }}
        />
      ) : (
        <StyledView className="w-40 h-40 rounded-xl bg-zinc-800">
          <ActivityIndicator
            animating={true}
            color="#3f3f46"
            size={40}
            style={{
              marginVertical: 80,
            }}
          />
        </StyledView>
      )}
      <StyledText className="mt-0.5 text-base font-bold text-solana-green">
        {nft.name}
      </StyledText>
    </StyledView>
  )
}

export default CollectibleItem
