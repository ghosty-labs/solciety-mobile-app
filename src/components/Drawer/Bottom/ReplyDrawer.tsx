import React, { useEffect, useRef, useState } from 'react'
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer'
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../../constants/nativewind'
import { Keyboard, useWindowDimensions } from 'react-native'
import { IPost } from '../../../types/post'
import {
  alertLog,
  generateRandomNumber,
  prettyTruncate,
} from '../../../utils/common'
import { useAuthorization } from '../../../providers/AuthorizationProvider'
import { REPLY_MAX_LENGTH } from '../../../constants/variables'
import { Button } from '../../Common'
import { useConnection } from '../../../providers/ConnectionProvider'
import { useAnchorWallet } from '../../../hooks/useAnchorWallet'
import { useSolcietyProgram } from '../../../hooks/useSolcietyProgram'
import { useStore } from '../../../providers/ContextProvider'
import { useRNPaper } from '../../../providers/RNPaperProvider'
import { sendReply } from '../../../program/api/reply/sendReply'
import { Idl, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { ProfileService } from '../../../services/Profile'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

interface ReplyDrawerProps {
  isShow: boolean
  onClose: () => void
  replyData: IPost
}

const ReplyDrawer = ({ isShow, onClose, replyData }: ReplyDrawerProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [reply, setReply] = useState<string>('')

  const bottomDrawerRef = useRef<BottomDrawerMethods>(null)
  const { width, height } = useWindowDimensions()
  const { connection } = useConnection()
  const { getProfile } = ProfileService()
  const { selectedAccount, authorizeSession } = useAuthorization()
  const anchorWallet = useAnchorWallet({ authorizeSession, selectedAccount })
  const { solcietyProgram } = useSolcietyProgram({
    connection,
    anchorWallet,
  })
  const store = useStore()
  const paper = useRNPaper()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      },
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  useEffect(() => {
    if (isShow) {
      bottomDrawerRef.current?.open()
    }
    setReply('')
  }, [isShow])

  useEffect(() => {
    refetch()
  }, [replyData])

  const handleClose = () => {
    onClose()
    setReply('')
  }

  const handleSendReply = async () => {
    setIsSigning(true)

    try {
      const signature = await sendReply({
        program: solcietyProgram as Program<Idl>,
        authorityPublicKey: selectedAccount?.publicKey as PublicKey,
        post: new PublicKey(replyData?.key),
        content: reply as string,
      })

      console.log('signature: ', signature)
      bottomDrawerRef.current?.close()
      onClose()

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store?.setNewReply({
        _id: generateRandomNumber().toString(),
        signature: generateRandomNumber().toString(),
        key: generateRandomNumber().toString(),
        user: `${selectedAccount?.publicKey as PublicKey}`,
        post: replyData?.key,
        parent: replyData?.key,
        content: reply,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
        is_verified: profileData?.is_verified as boolean,
        image: profileData?.image as string,
        alias: profileData?.alias as string,
      })
      paper?.setShowPortal('replied')
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : error
      if (errMsg === null) return console.log(errMsg)
      alertLog('Error Message', errMsg)
    } finally {
      setReply('')
      setIsSigning(false)
    }
  }

  const { data: profileData, refetch } = useQuery({
    queryKey: `get-profile-reply-drawer`,
    queryFn: () =>
      getProfile({
        public_key: selectedAccount?.publicKey,
      }),
    onError: (error) => {
      const err = error as AxiosError
      console.log('err get-posts-home-all:::> ', err)
    },
  })

  return (
    <BottomDrawer
      ref={bottomDrawerRef}
      initialHeight={height - 60}
      customStyles={{
        container: {
          backgroundColor: '#18181b',
        },
      }}
      onClose={handleClose}
    >
      <StyledView className={`${isKeyboardVisible && 'h-80'}`}>
        <StyledScrollView>
          <StyledView className="flex flex-row mx-4">
            <StyledView className="absolute top-2 left-6 w-0.5 h-full bg-solana-green" />
            {replyData?.image && (
              <StyledImage
                className="w-12 h-12 rounded-full mr-4"
                source={{
                  uri: replyData.image,
                }}
              />
            )}
            <StyledView className="flex flex-1 mb-4">
              <StyledView className="flex flex-row items-center">
                {replyData?.alias ? (
                  <StyledView className="flex flex-row items-center gap-x-2">
                    <StyledText className="text-base font-semibold text-white">
                      {replyData?.alias}
                    </StyledText>
                  </StyledView>
                ) : (
                  <StyledText className="text-base font-semibold text-white">
                    {prettyTruncate(replyData?.user, 18, 'address')}
                  </StyledText>
                )}
                {replyData?.is_verified && (
                  <StyledImage
                    className="w-4 h-4 rounded-full object-cover ml-1"
                    source={require('../../../assets/badges/ghosty/verified.png')}
                  />
                )}
              </StyledView>
              <StyledView className="flex flex-row">
                <StyledText className="flex-1 text-base text-white">
                  {replyData?.content}
                </StyledText>
              </StyledView>
              <StyledText className="text-base text-solana-green">
                {replyData?.tag !== '[untagged]' &&
                  `#${replyData?.tag.replaceAll('-', ' #')}`}
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="flex flex-row mx-4">
            {profileData?.image && (
              <StyledImage
                className="w-12 h-12 rounded-full mr-4"
                source={{
                  uri: profileData.image,
                }}
              />
            )}
            <StyledView>
              <StyledView className="flex flex-row items-center">
                {profileData?.alias ? (
                  <StyledView className="flex flex-row items-center gap-x-2">
                    <StyledText className="text-base font-semibold text-white">
                      {profileData.alias}
                    </StyledText>
                  </StyledView>
                ) : (
                  <StyledText className="text-base font-semibold text-white">
                    {prettyTruncate(
                      selectedAccount?.publicKey.toBase58(),
                      18,
                      'address',
                    )}
                  </StyledText>
                )}
                {profileData?.is_verified && (
                  <StyledImage
                    className="w-4 h-4 rounded-full object-cover ml-1"
                    source={require('../../../assets/badges/ghosty/verified.png')}
                  />
                )}
              </StyledView>
              <StyledView
                style={{
                  width: width - 100,
                }}
              >
                <StyledTextInput
                  className="flex -mt-2 -ml-1 text-base text-white"
                  placeholderTextColor="#71717a"
                  placeholder={`Reply to ${prettyTruncate(
                    replyData?.alias || replyData?.user,
                    12,
                    'address',
                  )}...`}
                  multiline={true}
                  maxLength={REPLY_MAX_LENGTH}
                  value={reply}
                  onChangeText={setReply}
                  autoFocus
                  focusable={false}
                  dataDetectorTypes={['link']}
                />
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledScrollView>
      </StyledView>
      <StyledView
        className={`absolute flex flex-row items-center w-12 h-4 ${
          isKeyboardVisible ? 'top-96 right-4' : 'top-6 right-4'
        }`}
      >
        <Button
          title="Reply"
          textColor="sol-green"
          textSize="xl"
          onPress={handleSendReply}
          isDisabled={reply.split(' ').join('').length === 0}
          isLoading={isSigning}
        />
      </StyledView>
    </BottomDrawer>
  )
}

export default ReplyDrawer
