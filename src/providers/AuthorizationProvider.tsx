import {
  AuthorizationResult,
  AuthorizeAPI,
  Account as AuthorizedAccount,
  AuthToken,
  Base64EncodedAddress,
  DeauthorizeAPI,
  ReauthorizeAPI,
} from '@solana-mobile/mobile-wallet-adapter-protocol'
import { PublicKey } from '@solana/web3.js'
import { toUint8Array } from 'js-base64'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { RPC_ENDPOINT } from '../constants/variables'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { toByteArray } from '../utils/solana'

export type Account = Readonly<{
  address: Base64EncodedAddress
  label?: string
  publicKey: PublicKey
}>

export type Authorization = Readonly<{
  accounts: Account[]
  authToken: AuthToken
  selectedAccount: Account
}>

const getAccountFromAuthorizedAccount = (
  account: AuthorizedAccount,
): Account => {
  return {
    ...account,
    publicKey: getPublicKeyFromAddress(account.address),
  }
}

const getAuthorizationFromAuthorizationResult = (
  authorizationResult: AuthorizationResult,
  previouslySelectedAccount?: Account,
): Authorization => {
  let selectedAccount: Account

  if (
    previouslySelectedAccount == null ||
    !authorizationResult.accounts.some(
      ({ address }) => address == previouslySelectedAccount.address,
    )
  ) {
    const firstAccount = authorizationResult.accounts[0]
    selectedAccount = getAccountFromAuthorizedAccount(firstAccount)
  } else {
    selectedAccount = previouslySelectedAccount
  }

  return {
    accounts: authorizationResult.accounts.map(getAccountFromAuthorizedAccount),
    authToken: authorizationResult.auth_token,
    selectedAccount,
  }
}

const getPublicKeyFromAddress = (address: Base64EncodedAddress): PublicKey => {
  const publicKeyByteArray = toUint8Array(address)
  return new PublicKey(publicKeyByteArray)
}

export const APP_IDENTITY = {
  name: 'Solciety dApp',
  uri: 'https://solciety.xyz',
  icon: 'favicon.ico',
}

export interface AuthorizationProviderContext {
  accounts: Account[] | null
  authorizeSession: (wallet: AuthorizeAPI & ReauthorizeAPI) => Promise<Account>
  deauthorizeSession: (wallet: DeauthorizeAPI) => void
  onChangeAccount: (nextSelectedAccount: Account) => void
  selectedAccount: Account | null
}

const AuthorizationContext = createContext<AuthorizationProviderContext>({
  accounts: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authorizeSession: (_wallet: AuthorizeAPI & ReauthorizeAPI) => {
    throw new Error('AuthorizationProvider not initialized')
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deauthorizeSession: (_wallet: DeauthorizeAPI) => {
    throw new Error('AuthorizationProvider not initialized')
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChangeAccount: (_nextSelectedAccount: Account) => {
    throw new Error('AuthorizationProvider not initialized')
  },
  selectedAccount: null,
})

const AuthorizationProvider = (props: { children: React.ReactNode }) => {
  const [authorization, setAuthorization] = useState<Authorization | null>(null)
  const { children } = props

  useEffect(() => {
    if (authorization) return
    ;(async () => {
      const [cachedAuthToken, cachedBase64Address] = await Promise.all([
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('base64Address'),
      ])

      if (cachedAuthToken && cachedBase64Address) {
        const pubKeyAsByteArray = toByteArray(cachedBase64Address)
        const cachedAccount: Account = {
          address: cachedBase64Address,
          publicKey: new PublicKey(pubKeyAsByteArray),
        }
        const cachedCurrentAccount: Authorization = {
          accounts: [cachedAccount],
          authToken: cachedAuthToken,
          selectedAccount: cachedAccount,
        }

        setAuthorization(cachedCurrentAccount)
      }
    })()
  }, [authorization, setAuthorization])

  const handleAuthorizationResult = useCallback(
    async (
      authorizationResult: AuthorizationResult,
    ): Promise<Authorization> => {
      const nextAuthorization = getAuthorizationFromAuthorizationResult(
        authorizationResult,
        authorization?.selectedAccount,
      )

      await setAuthorization(nextAuthorization)

      return nextAuthorization
    },
    [authorization, setAuthorization],
  )

  const authorizeSession = useCallback(
    async (wallet: AuthorizeAPI & ReauthorizeAPI) => {
      const authorizationResult = await (authorization
        ? wallet.reauthorize({
            auth_token: authorization.authToken,
            identity: APP_IDENTITY,
          })
        : wallet.authorize({
            cluster: RPC_ENDPOINT,
            identity: APP_IDENTITY,
          }))

      const authorizedAccount = await (
        await handleAuthorizationResult(authorizationResult)
      ).selectedAccount

      if (authorizationResult) {
        AsyncStorage.setItem('authToken', authorizationResult.auth_token)
        AsyncStorage.setItem('base64Address', authorizedAccount.address)
      }

      return authorizedAccount
    },
    [authorization, handleAuthorizationResult],
  )

  const deauthorizeSession = useCallback(
    async (wallet: DeauthorizeAPI) => {
      if (authorization?.authToken === null) return

      await wallet.deauthorize({
        auth_token: authorization?.authToken as string,
      })

      setAuthorization(null)
    },
    [authorization, setAuthorization],
  )

  const onChangeAccount = useCallback(
    (nextSelectedAccount: Account) => {
      setAuthorization((currentAuthorization) => {
        if (
          !currentAuthorization?.accounts.some(
            ({ address }) => address === nextSelectedAccount.address,
          )
        ) {
          throw new Error(
            `${nextSelectedAccount.address} is not one of the available addresses`,
          )
        }

        return {
          ...currentAuthorization,
          selectedAccount: nextSelectedAccount,
        }
      })
    },
    [setAuthorization],
  )

  const value = useMemo(
    () => ({
      accounts: authorization?.accounts ?? null,
      authorizeSession,
      deauthorizeSession,
      onChangeAccount,
      selectedAccount: authorization?.selectedAccount ?? null,
    }),
    [authorization, authorizeSession, deauthorizeSession, onChangeAccount],
  )

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  )
}

const useAuthorization = () => useContext(AuthorizationContext)

export { AuthorizationProvider, useAuthorization }
