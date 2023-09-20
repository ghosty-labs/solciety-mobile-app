import { useMemo } from 'react'
import * as anchor from '@coral-xyz/anchor'
import {
  AuthorizeAPI,
  ReauthorizeAPI,
} from '@solana-mobile/mobile-wallet-adapter-protocol'
import { PublicKey, Transaction } from '@solana/web3.js'
import { Account } from '../providers/AuthorizationProvider'
import {
  Web3MobileWallet,
  transact,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'

interface AnchorWalletProps {
  authorizeSession: (wallet: AuthorizeAPI & ReauthorizeAPI) => Promise<
    Readonly<{
      address: string
      label?: string | undefined
      publicKey: PublicKey
    }>
  >

  selectedAccount: Account | null
}

export const useAnchorWallet = ({
  authorizeSession,
  selectedAccount,
}: AnchorWalletProps) => {
  return useMemo(() => {
    if (!selectedAccount || !authorizeSession) return null

    return {
      signTransaction: async (transaction: Transaction) => {
        return transact(async (wallet: Web3MobileWallet) => {
          await authorizeSession(wallet)

          const signedTransactions = await wallet.signTransactions({
            transactions: [transaction],
          })

          return signedTransactions[0]
        })
      },
      signAllTransactions: async (transactions: Transaction[]) => {
        return transact(async (wallet: Web3MobileWallet) => {
          await authorizeSession(wallet)

          const signedTransactions = await wallet.signTransactions({
            transactions: transactions,
          })

          return signedTransactions
        })
      },
      get publicKey() {
        return selectedAccount.publicKey
      },
    } as anchor.Wallet
  }, [authorizeSession, selectedAccount])
}
