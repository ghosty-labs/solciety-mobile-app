import React, { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useConnection } from '../../providers/ConnectionProvider'
import {
  Account,
  useAuthorization,
} from '../../providers/AuthorizationProvider'
import { convertLamportsToSOL } from '../../utils/solana'

const HomeScreen = () => {
  const [balance, setBalance] = useState<number | null>(null)
  const { connection } = useConnection()
  const { selectedAccount } = useAuthorization()

  const fetchAndUpdatedBalance = useCallback(
    async (account: Account) => {
      const fetchedBalance = await connection.getBalance(account.publicKey)
      setBalance(fetchedBalance)
    },
    [connection],
  )

  useEffect(() => {
    if (!selectedAccount) return

    fetchAndUpdatedBalance(selectedAccount)
  }, [fetchAndUpdatedBalance, selectedAccount])

  return (
    <View style={{ height: '100%', backgroundColor: 'khaki' }}>
      <Text>Homepage</Text>
      <Text>Address: {selectedAccount?.address}</Text>
      <Text>Balance: {convertLamportsToSOL(balance as number)}</Text>
    </View>
  )
}

export default HomeScreen
