import React, { useEffect, useState } from 'react'
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { RootStackParamList } from '../../types/navigation'
import { alertLog, numberFormatter, prettyTruncate } from '../../utils/common'
import { IconBar, IconChevronLeft } from '../Icons/Icon'
import { Button } from '../Common'
import { IProfile } from '../../types/profile'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { followUser } from '../../program/api/follow/followUser'
import { useConnection } from '../../providers/ConnectionProvider'
import { useAnchorWallet } from '../../hooks/useAnchorWallet'
import { useSolcietyProgram } from '../../hooks/useSolcietyProgram'
import { Idl, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { unfollowUser } from '../../program/api/follow/unfollowUser'
import { useRNPaper } from '../../providers/RNPaperProvider'
import { useStore } from '../../providers/ContextProvider'

interface ProfileHeaderProps {
  dataProfile: IProfile
}

const ProfileHeader = ({ dataProfile }: ProfileHeaderProps) => {
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [isSuccessCall, setIsSuccessCall] = useState<boolean>(false)
  const [totalFollowers, setTotalFollowers] = useState<number>(0)
  const [totalPost, setTotalPost] = useState<number>(0)

  const { connection } = useConnection()
  const { selectedAccount, authorizeSession } = useAuthorization()
  const anchorWallet = useAnchorWallet({ authorizeSession, selectedAccount })
  const { solcietyProgram } = useSolcietyProgram({
    connection,
    anchorWallet,
  })
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const paper = useRNPaper()
  const store = useStore()

  useEffect(() => {
    setTotalFollowers(dataProfile?.total_follower)
    setTotalPost(dataProfile?.total_post)

    if (dataProfile?.is_followed) return setIsFollowed(true)

    return setIsFollowed(false)
  }, [dataProfile])

  useEffect(() => {
    if (isSuccessCall) {
      setTimeout(() => {
        if (isFollowed) {
          setIsFollowed(false)
          setTotalFollowers(totalFollowers - 1)
        } else {
          setIsFollowed(true)
          setTotalFollowers(totalFollowers + 1)
        }
        paper?.setShowPortal(null)
        setIsSuccessCall(false)
      }, 4000)
    }
  }, [isSuccessCall])

  useEffect(() => {
    if (store?.newPost !== null) {
      setTimeout(() => {
        setTotalPost(totalPost + 1)
      }, 4000)
    }
  }, [store?.newPost])

  const onPressFollow = async () => {
    setIsSigning(true)

    try {
      const signature = await followUser({
        program: solcietyProgram as Program<Idl>,
        authorityPublicKey: selectedAccount?.publicKey as PublicKey,
        following: new PublicKey(dataProfile.public_key),
      })

      paper?.setTypeFollow?.('follow')
      paper?.setShowPortal('follow')
      setIsSuccessCall(true)
      console.log('signature: ', signature)
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : error
      if (errMsg !== 'null') {
        alertLog('Error Message', errMsg)
      }
    } finally {
      setIsSigning(false)
    }
  }

  const onPressUnfollow = async () => {
    setIsSigning(true)

    try {
      const signature = await unfollowUser({
        program: solcietyProgram as Program<Idl>,
        authorityPublicKey: selectedAccount?.publicKey as PublicKey,
        unfollowing: new PublicKey(dataProfile.public_key),
      })

      paper?.setTypeFollow?.('unfollow')
      paper?.setShowPortal('follow')
      setIsSuccessCall(true)
      console.log('signature: ', signature)
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : error
      if (errMsg !== 'null') {
        alertLog('Error Message', errMsg)
      }
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <StyledView className="w-full pt-4 px-4 mb-2">
      <StyledView className="flex flex-row items-center justify-between">
        <StyledView className="flex flex-row items-center gap-x-1">
          {selectedAccount?.publicKey.toString() !==
            dataProfile?.public_key && (
            <StyledTouchableOpacity
              className="mr-2"
              onPress={() => navigation.goBack()}
            >
              <IconChevronLeft size={20} color="white" />
            </StyledTouchableOpacity>
          )}
          <StyledText className="text-xl font-bold text-white">
            {prettyTruncate(dataProfile?.public_key, 12, 'address')}
          </StyledText>
          {dataProfile?.is_verified && (
            <StyledImage
              className="w-5 h-5 rounded-full object-cover"
              source={require('../../assets/badges/ghosty/verified.png')}
            />
          )}
        </StyledView>
        {selectedAccount?.publicKey.toString() === dataProfile?.public_key && (
          <StyledView>
            <StyledTouchableOpacity
              onPress={() => navigation.navigate('Setting')}
            >
              <IconBar size={28} color="white" />
            </StyledTouchableOpacity>
          </StyledView>
        )}
      </StyledView>
      <StyledView className="flex flex-row gap-x-5 mt-4">
        <StyledView className="w-28 h-28">
          {dataProfile?.image && (
            <StyledImage
              className="w-28 h-28 rounded-full object-cover"
              source={{
                uri: dataProfile?.image,
              }}
            />
          )}
        </StyledView>
        <StyledView>
          <StyledView className="flex flex-row items-center gap-x-2">
            {dataProfile?.alias ? (
              <StyledView>
                <StyledText className="text-xl font-semibold text-white">
                  {dataProfile.alias}
                </StyledText>
                <StyledText className="px-2 border border-zinc-500 text-zinc-500 rounded-md">
                  alias
                </StyledText>
              </StyledView>
            ) : (
              <StyledText className="px-3 py-1 border border-zinc-300 text-zinc-300 rounded-md">
                Set Alias
              </StyledText>
            )}
          </StyledView>
          <StyledView className="flex flex-row justify-between gap-x-7 mt-4">
            <StyledView className="flex items-center">
              <StyledText className="text-white">
                {numberFormatter(totalPost)}
              </StyledText>
              <StyledText className="font-semibold text-white">Post</StyledText>
            </StyledView>
            <StyledView className="flex items-center">
              <StyledText className="text-white">
                {numberFormatter(dataProfile?.total_following as number)}
              </StyledText>
              <StyledText className="font-semibold text-white">
                Following
              </StyledText>
            </StyledView>
            <StyledView className="flex items-center">
              <StyledText className="text-white">
                {numberFormatter(totalFollowers)}
              </StyledText>
              <StyledText className="font-semibold text-white">
                Followers
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
      <StyledText className="mt-2 ml-2 text-white">
        {dataProfile?.bio}
      </StyledText>
      <StyledView className="mx-auto w-full mt-2">
        {selectedAccount?.publicKey.toString() === dataProfile?.public_key ? (
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
        ) : isFollowed ? (
          <Button
            className="py-5 mt-2"
            title="Following"
            textColor="white"
            textSize="lg"
            border={2}
            borderColor="zinc"
            radius="xl"
            onPress={onPressUnfollow}
            isDisabled={isSigning || isSuccessCall}
            isLoading={isSigning || isSuccessCall}
          />
        ) : (
          <Button
            className="py-5 mt-2"
            title="Follow"
            color="white"
            textColor="black"
            textSize="lg"
            border={2}
            borderColor="white"
            radius="xl"
            onPress={onPressFollow}
            isDisabled={isSigning || isSuccessCall}
            isLoading={isSigning || isSuccessCall}
          />
        )}
      </StyledView>
    </StyledView>
  )
}

export default ProfileHeader
