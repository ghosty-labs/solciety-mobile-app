import React, { useState } from 'react'
import { Button, Text } from 'react-native'
import { sendPost } from '../../program/api/sendPost'
import { useSolcietyProgram } from '../../hooks/useSolcietyProgram'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { Idl, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { useConnection } from '../../providers/ConnectionProvider'
import { useAnchorWallet } from '../../hooks/useAnchorWallet'
import { StyledTextInput, StyledView } from '../../constants/nativewind'

const PostScreen = () => {
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [tag, setTag] = useState<string>()
  const [content, setContent] = useState<string>()
  const { connection } = useConnection()
  const { selectedAccount, authorizeSession } = useAuthorization()
  const anchorWallet = useAnchorWallet({ authorizeSession, selectedAccount })
  const { solcietyProgram } = useSolcietyProgram({
    connection,
    anchorWallet,
  })

  const handleSendPost = async () => {
    setIsSigning(true)

    try {
      const signature = await sendPost({
        program: solcietyProgram as Program<Idl>,
        authorityPublicKey: selectedAccount?.publicKey as PublicKey,
        tag: tag as string,
        content: content as string,
      })

      console.log('signature: ', signature)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <StyledView className="mx-4">
      <Text>Post Screen</Text>
      <StyledTextInput onChangeText={setTag} value={tag} className="border" />
      <StyledTextInput
        onChangeText={setContent}
        value={content}
        className="border"
      />
      <Button title="send post" disabled={isSigning} onPress={handleSendPost} />
    </StyledView>
  )
}

export default PostScreen
