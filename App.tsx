import React from 'react'
import RootNavigation from './src/navigations/RootNavigation'
import { ConnectionProvider } from './src/providers/ConnectionProvider'
import { RPC_ENDPOINT } from './src/constants/variables'
import { AuthorizationProvider } from './src/providers/AuthorizationProvider'
import { clusterApiUrl } from '@solana/web3.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomDrawerProvider } from './src/providers/BottomDrawerProvider'
import { ContextProvider } from './src/providers/ContextProvider'
import { PaperProvider } from 'react-native-paper'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RNPaperProvider } from './src/providers/RNPaperProvider'

function App(): JSX.Element {
  const queryClient = new QueryClient()

  return (
    <ConnectionProvider
      config={{ commitment: 'processed' }}
      endpoint={clusterApiUrl(RPC_ENDPOINT)}
    >
      <AuthorizationProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <ContextProvider>
              <PaperProvider>
                <RNPaperProvider>
                  <BottomDrawerProvider>
                    <RootNavigation />
                  </BottomDrawerProvider>
                </RNPaperProvider>
              </PaperProvider>
            </ContextProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </AuthorizationProvider>
    </ConnectionProvider>
  )
}

export default App
