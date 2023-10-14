import React, { useEffect, useRef, useState } from 'react'
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer'
import {
  StyledImage,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../../constants/nativewind'
import { useWindowDimensions } from 'react-native'
import { useConnection } from '../../../providers/ConnectionProvider'
import { useAuthorization } from '../../../providers/AuthorizationProvider'
import { useAnchorWallet } from '../../../hooks/useAnchorWallet'
import { useSolcietyProgram } from '../../../hooks/useSolcietyProgram'
import { sendPost } from '../../../program/api/post/sendPost'
import { Idl, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { generateRandomNumber, prettyTruncate } from '../../../utils/common'
import TagInput from '../../Common/TagInput'
import { Button } from '../../Common'
import { CONTENT_MAX_LENGTH } from '../../../constants/variables'
import { useStore } from '../../../providers/ContextProvider'
import { useRNPaper } from '../../../providers/RNPaperProvider'
import { ProfileService } from '../../../services/Profile'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

interface PostDrawerProps {
  isShow: boolean
  onClose: () => void
}

const PostDrawer = ({ isShow, onClose }: PostDrawerProps) => {
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState<string>('')

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
    if (isShow) {
      bottomDrawerRef.current?.open()
    }
  }, [isShow])

  useEffect(() => {
    refetch()
  }, [isShow])

  const { data: profileData, refetch } = useQuery({
    queryKey: `get-profile-post-drawer`,
    queryFn: () =>
      getProfile({
        public_key: selectedAccount?.publicKey,
      }),
    onError: (error) => {
      const err = error as AxiosError
      console.log('err get-profile-post-drawer:::> ', err.response?.data)
    },
  })

  const handleSendPost = async () => {
    setIsSigning(true)

    try {
      const signature = await sendPost({
        program: solcietyProgram as Program<Idl>,
        authorityPublicKey: selectedAccount?.publicKey as PublicKey,
        tag: `${tags.join('-')}`,
        content: content as string,
      })

      console.log('signature: ', signature)
      bottomDrawerRef.current?.close()
      onClose()

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store?.setNewPost({
        _id: generateRandomNumber().toString(),
        signature: generateRandomNumber().toString(),
        key: generateRandomNumber().toString(),
        user: `${selectedAccount?.publicKey as PublicKey}`,
        alias: profileData?.alias as string,
        tag: tags.length !== 0 ? `${tags.join('-')}` : '[untagged]',
        content: content,
        comment: 0,
        likes: undefined,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
        total_like: 0,
        total_comment: 0,
        image: profileData?.image as string,
      })
      paper?.setShowPortal('posted')
    } catch (error) {
      console.log(error)
    } finally {
      setTags([])
      setContent('')
      setIsSigning(false)
    }
  }

  return (
    <BottomDrawer
      ref={bottomDrawerRef}
      initialHeight={height - 60}
      customStyles={{
        container: {
          backgroundColor: '#18181b',
        },
      }}
      onClose={() => onClose()}
    >
      <StyledView className="mt-2 h-full bg-zinc-900">
        <StyledView className="flex flex-row mx-4 border-b border-dashed border-zinc-700">
          {profileData?.image && (
            <StyledImage
              className="w-12 h-12 rounded-full mr-4"
              source={{
                uri: profileData?.image,
              }}
            />
          )}
          <StyledView>
            <StyledView className="flex flex-row justify-between items-center">
              <StyledView className="flex flex-row items-center">
                {profileData?.alias ? (
                  <StyledView className="flex flex-row items-center gap-x-2">
                    <StyledText className="text-base font-semibold text-white">
                      {profileData?.alias || profileData?.public_key}
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
              <StyledView className="flex flex-row items-center w-12 h-4">
                <Button
                  title="Post"
                  textColor="sol-green"
                  textSize="xl"
                  onPress={handleSendPost}
                  isDisabled={content.split(' ').join('').length === 0}
                  isLoading={isSigning}
                />
              </StyledView>
            </StyledView>
            <StyledView
              style={{
                width: width - 100,
              }}
            >
              <StyledTextInput
                className="flex -ml-1 text-base text-white"
                placeholderTextColor="#71717a"
                placeholder="Start a Post..."
                multiline={true}
                maxLength={CONTENT_MAX_LENGTH}
                value={content}
                onChangeText={setContent}
                autoFocus
                dataDetectorTypes={['link']}
              />
            </StyledView>
          </StyledView>
        </StyledView>
        <StyledView className="mt-4 mx-4">
          <StyledText className="mb-2 text-base text-white">Tags:</StyledText>
          <TagInput setTopics={(e) => setTags(e)} />
        </StyledView>
      </StyledView>
    </BottomDrawer>
  )
}

export default PostDrawer
