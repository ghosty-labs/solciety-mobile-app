import React from 'react'
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { StackProps } from '../../types/navigation'
import { prettyTruncate } from '../../utils/common'
import { IconBar } from '../Icons/Icon'
import { Button } from '../Common'

const ProfileHeader = ({ navigation }: StackProps) => {
  return (
    <StyledView className="w-full pt-4 px-4 mb-2">
      <StyledView className="flex flex-row items-center justify-between">
        <StyledView className="flex flex-row items-center gap-x-1">
          <StyledText className="text-xl font-bold text-white">
            {prettyTruncate(
              'ANwvF5jduUnY7unZin42NxB5cz4ctFqEmcVt5nWekpFq',
              12,
              'address',
            )}
          </StyledText>
          <StyledImage
            className="w-4 h-4 rounded-full object-cover"
            source={require('../../assets/common/verify.png')}
          />
        </StyledView>
        <StyledView>
          <StyledTouchableOpacity
            onPress={() => navigation.navigate('Setting')}
          >
            <IconBar size={28} color="white" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
      <StyledView className="flex flex-row gap-x-5 mt-4">
        <StyledImage
          className="w-28 h-28 rounded-full object-cover"
          source={require('../../assets/screen/notification/sample-verified.png')}
        />
        <StyledView>
          <StyledView className="flex flex-row items-center gap-x-2">
            <StyledText className="text-xl font-semibold text-white">
              iqbalutomo
            </StyledText>
            <StyledText className="px-2 border border-zinc-500 text-zinc-500 rounded-md">
              alias
            </StyledText>
          </StyledView>
          <StyledView className="flex flex-row justify-between gap-x-7 mt-4">
            <StyledView className="flex items-center">
              <StyledText className="text-white">3</StyledText>
              <StyledText className="font-semibold text-white">NFTs</StyledText>
            </StyledView>
            <StyledView className="flex items-center">
              <StyledText className="text-white">57</StyledText>
              <StyledText className="font-semibold text-white">
                Following
              </StyledText>
            </StyledView>
            <StyledView className="flex items-center">
              <StyledText className="text-white">1.2K</StyledText>
              <StyledText className="font-semibold text-white">
                Followers
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
      <StyledText className="mt-2 ml-2 text-white">
        Hello everyone! I&apos;m Iqbal a software engineer🚀
      </StyledText>
      <StyledView className="mx-auto w-full mt-2">
        <Button
          className="py-5 mt-2"
          title="Edit Profile"
          textColor="white"
          textSize="lg"
          border={2}
          borderColor="zinc"
          radius="xl"
          onPress={() => null}
        />
      </StyledView>
    </StyledView>
  )
}

export default ProfileHeader
