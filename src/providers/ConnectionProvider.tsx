import { Connection, ConnectionConfig } from '@solana/web3.js'
import React, {
  useMemo,
  type ReactNode,
  type FC,
  createContext,
  useContext,
} from 'react'

export interface ConnectionProviderProps {
  children: ReactNode
  endpoint: string
  config?: ConnectionConfig
}

export const ConnectionProvider: FC<ConnectionProviderProps> = ({
  children,
  endpoint,
  config = { commitment: 'confirmed' },
}) => {
  const connection = useMemo(
    () => new Connection(endpoint, config),
    [endpoint, config],
  )

  return (
    <ConnectionContext.Provider value={{ connection }}>
      {children}
    </ConnectionContext.Provider>
  )
}

export interface ConnectionContextState {
  connection: Connection
}

export const ConnectionContext = createContext<ConnectionContextState>(
  {} as ConnectionContextState,
)

export const useConnection = (): ConnectionContextState => {
  return useContext(ConnectionContext)
}
