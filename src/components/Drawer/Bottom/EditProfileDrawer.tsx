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
import { prettyTruncate } from '../../../utils/common'
import { Button } from '../../Common'
import { ALIAS_MAX_LENGTH, BIO_MAX_LENGTH } from '../../../constants/variables'
import { IProfile } from '../../../types/profile'
import { IconLock } from '../../Icons/Icon'
import { ProfileService } from '../../../services/Profile'
import { AxiosError } from 'axios'
import { useStore } from '../../../providers/ContextProvider'

interface EditProfileDrawerProps {
  isShow: boolean
  onClose: () => void
  profileData: IProfile
}

const EditProfileDrawer = ({
  isShow,
  onClose,
  profileData,
}: EditProfileDrawerProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [alias, setAlias] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [isMaxLength, setIsMaxLength] = useState<boolean>(false)

  const { width, height } = useWindowDimensions()
  const { putProfile } = ProfileService()
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null)
  const store = useStore()

  useEffect(() => {
    if (isShow) {
      bottomDrawerRef.current?.open()
      setAlias(profileData.alias?.replace('.sol', '') as string)
      setBio(profileData.bio as string)
    }
  }, [isShow])

  const handleOnChangeText = (e: string) => {
    if (e.length >= ALIAS_MAX_LENGTH) {
      setIsMaxLength(true)
      return
    }

    setAlias(
      e.replace(/\s/g, '').replace(
        // eslint-disable-next-line no-useless-escape
        /[&/\\#,+()$~%.'":*?<>{}\[\]\!\-`^@|•√π÷×¶∆£¢€¥°=©®™✓]/g,
        '',
      ),
    )
    setIsMaxLength(false)
  }

  const handleSendPost = async () => {
    setIsSubmitting(true)

    try {
      if (profileData?.alias?.replace('.sol', '') === alias) {
        await putProfile({
          bio: bio,
        })
      } else {
        await putProfile({
          alias: alias.toLowerCase() + '.sol',
          bio: bio,
        })
      }

      store?.setIsProfileUpdated(true)
      bottomDrawerRef.current?.close()
      onClose()
    } catch (error) {
      const err = error as AxiosError
      // eslint-disable-next-line no-unsafe-optional-chaining
      const _err = err.response?.data

      console.log((_err as AxiosError).message)
    } finally {
      setIsSubmitting(false)
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
        <StyledView className="flex flex-row mx-4 pb-4 border-b border-dashed border-zinc-700">
          {profileData?.image && (
            <StyledImage
              className="w-12 h-12 rounded-full mr-4"
              // source={{
              //   uri: profileData.image,
              // }}
              source={require('../../../assets/screen/notification/sample-verified.png')}
            />
          )}
          <StyledView className="flex flex-row justify-between items-center w-72">
            <StyledView>
              <StyledText className="text-base font-semibold text-zinc-500 mr-1">
                Account Address
              </StyledText>
              <StyledView className="flex flex-row items-center">
                <IconLock size={20} color="white" />
                <StyledText className="text-base font-semibold text-white ml-1">
                  {prettyTruncate(profileData?.public_key, 16, 'address')}
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView className="flex flex-row items-center w-12 h-4">
              <Button
                title="Done"
                textColor="sol-green"
                textSize="xl"
                onPress={handleSendPost}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              />
            </StyledView>
          </StyledView>
        </StyledView>
        <StyledView className="mt-4 mx-4">
          <StyledText className="text-base font-semibold text-zinc-500 mb-1">
            Alias
          </StyledText>
          <StyledView className="flex flex-row justify-between items-center flex-wrap rounded-xl border border-dashed border-zinc-700">
            <StyledTextInput
              className="w-72 ml-2 text-lg text-white"
              placeholder="jane"
              placeholderTextColor="#71717a"
              onChangeText={(e) => handleOnChangeText(e)}
              value={alias}
              maxLength={isMaxLength ? 0 : ALIAS_MAX_LENGTH}
              onSubmitEditing={() => null}
            />
            <StyledText className="pr-2 text-lg text-white">.SOL</StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="mt-4 mx-4">
          <StyledText className="text-base font-semibold text-zinc-500 mb-1">
            Bio
          </StyledText>
          <StyledView
            className="rounded-xl border border-zinc-700"
            style={{
              width: width - 30,
            }}
          >
            <StyledTextInput
              className="flex pl-2 text-lg text-white"
              placeholderTextColor="#71717a"
              placeholder="About you..."
              multiline={true}
              maxLength={BIO_MAX_LENGTH}
              value={bio}
              onChangeText={setBio}
              dataDetectorTypes={['link']}
            />
          </StyledView>
        </StyledView>
      </StyledView>
    </BottomDrawer>
  )
}

export default EditProfileDrawer
