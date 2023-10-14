import React, { useEffect, useState } from 'react'
import { StyledImage, StyledText, StyledView } from '../../constants/nativewind'
import { Button } from '../../components/Common'
import useMetaplex from '../../hooks/useMetaplex'
import { useConnection } from '../../providers/ConnectionProvider'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import nacl from 'tweetnacl'
import { ProgressBar } from 'react-native-paper'
import { IconSolana } from '../../components/Icons/Icon'
import {
  NftWithToken,
  SendAndConfirmTransactionResponse,
} from '@metaplex-foundation/js'
import ModalSuccessMinted from '../../components/Paper/Modal/ModalSuccessMinted'
import { CANDY_MACHINE_ID } from '../../constants/variables'

const MintNFTScreen = () => {
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [nftsMinted, setNftsMinted] = useState<number>(0)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [nftMinted, setNftMinted] = useState<NftWithToken>()
  const [responseMinted, setResponseMinted] =
    useState<SendAndConfirmTransactionResponse>()
  const [showModal, setShowModal] = useState<boolean>(false)

  const { connection } = useConnection()
  const { selectedAccount, authorizeSession } = useAuthorization()
  const { metaplex } = useMetaplex(
    connection,
    selectedAccount,
    authorizeSession,
  )

  useEffect(() => {
    checkCandyMachine()
  }, [connection, selectedAccount])

  const checkCandyMachine = async () => {
    if (!metaplex) return null

    try {
      const candyMachine = await metaplex.candyMachines().findByAddress({
        address: new PublicKey(CANDY_MACHINE_ID),
      })

      setTotalSupply(parseInt(candyMachine.itemsAvailable))
      setNftsMinted(parseInt(candyMachine.itemsMinted))
    } catch (error) {
      console.log(error)
    }
  }

  const sleep = async (ms: number) => {
    return new Promise((r) => setTimeout(r, ms))
  }

  const onPressMintNFT = async () => {
    if (!metaplex) return null

    setIsMinting(true)
    try {
      const payer = Keypair.generate()
      const toAccount = Keypair.generate().publicKey

      const candyMachine = await metaplex.candyMachines().findByAddress({
        address: new PublicKey(CANDY_MACHINE_ID),
      })

      const { nft, response } = await metaplex.candyMachines().mint(
        {
          candyMachine,
          collectionUpdateAuthority: candyMachine.authorityAddress,
        },
        {
          commitment: 'finalized',
        },
      )

      setNftMinted(nft)
      setResponseMinted(response)
      setShowModal(true)

      await connection.confirmTransaction(response)

      const blockhashResponse = await connection.getLatestBlockhashAndContext()
      const lastValidBlockHeight = blockhashResponse.context.slot + 150

      const transaction = new Transaction({
        feePayer: payer.publicKey,
        blockhash: blockhashResponse.value.blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
      }).add(
        SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: toAccount,
          lamports: 1000000,
        }),
      )
      const message = transaction.serializeMessage()
      const signature = nacl.sign.detached(message, payer.secretKey)
      transaction.addSignature(payer.publicKey, Buffer.from(signature))
      const rawTransaction = transaction.serialize()
      let blockheight = await connection.getBlockHeight()

      while (blockheight < lastValidBlockHeight) {
        connection.sendRawTransaction(rawTransaction, {
          skipPreflight: true,
        })
        await sleep(500)
        blockheight = await connection.getBlockHeight()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <StyledView className="mx-4 h-full">
      <ModalSuccessMinted
        isShow={showModal}
        dataMinted={{
          nft: nftMinted as NftWithToken,
          response: responseMinted as SendAndConfirmTransactionResponse,
        }}
      />
      <StyledText className="mb-2 text-2xl font-semibold text-white text-center">
        Ghosty Origin Collection
      </StyledText>
      <StyledImage
        className="mx-auto w-[356px] h-[356px] rounded-xl"
        source={{
          uri: 'https://bafybeifuthz7yrxfapyh2mvch4r5enuhcxhlw6bdscjvix7jb3l7usee6i.ipfs.nftstorage.link/',
        }}
      />
      <StyledView className="mt-4 mx-1">
        <ProgressBar
          progress={nftsMinted / 1000}
          color="#14F195"
          style={{
            backgroundColor: '#3f3f46',
            height: 14,
            borderRadius: 50,
          }}
        />
        <StyledText className="text-lg text-solana-green">
          {nftsMinted} / {totalSupply} NFTs
        </StyledText>
      </StyledView>
      <StyledView>
        <StyledText className="text-lg text-white text-justify">
          Acquire a Mint NFT to earn the verified badge that will appear on your
          profile; supplies are limited. This exclusive opportunity is for our
          Solciety users.
        </StyledText>
        <StyledView className="flex flex-row items-center mt-2">
          <StyledText className="text-lg text-white mr-2">Price</StyledText>
          <IconSolana size={18} />
          <StyledText className="text-lg text-white font-bold ml-2">
            0.1
          </StyledText>
        </StyledView>
      </StyledView>
      <Button
        className="absolute bottom-1 py-7 mt-2 mb-4"
        title="Mint NFT"
        color="sol-green"
        textColor="black"
        textSize="lg"
        border={2}
        borderColor="sol-green"
        radius="xl"
        onPress={onPressMintNFT}
        isDisabled={isMinting}
        isLoading={isMinting}
      />
    </StyledView>
  )
}

export default MintNFTScreen
