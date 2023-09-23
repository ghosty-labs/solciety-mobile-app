import React from 'react'
import { StyledImage, StyledView } from '../../constants/nativewind'
import { ImageSourcePropType } from 'react-native'

interface AvatarProps {
  url: ImageSourcePropType
  size: number
}

const Avatar = ({ url, size }: AvatarProps) => {
  return (
    <StyledView>
      <StyledImage
        source={url}
        className="rounded-full object-cover"
        style={{
          width: size,
          height: size,
        }}
      />
    </StyledView>
  )
}

export default Avatar
