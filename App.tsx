import React from 'react'
import RootNavigation from './src/navigations/RootNavigation'
import { ConnectionProvider } from './src/providers/ConnectionProvider'
import { RPC_ENDPOINT } from './src/constants/variables'
import { AuthorizationProvider } from './src/providers/AuthorizationProvider'
import { clusterApiUrl } from '@solana/web3.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function App(): JSX.Element {
  return (
    <ConnectionProvider
      config={{ commitment: 'processed' }}
      endpoint={clusterApiUrl(RPC_ENDPOINT)}
    >
      <AuthorizationProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigation />
        </GestureHandlerRootView>
      </AuthorizationProvider>
    </ConnectionProvider>
  )
}

export default App
