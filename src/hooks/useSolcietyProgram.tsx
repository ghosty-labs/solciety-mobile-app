import { useMemo } from 'react'
import * as anchor from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import idl from '../program/idl/solciety.json'

interface SolcietyProgramProps {
  connection: Connection
  anchorWallet: anchor.Wallet | null
}

export const useSolcietyProgram = ({
  connection,
  anchorWallet,
}: SolcietyProgramProps) => {
  const solcietyProgramId = useMemo(() => {
    return new PublicKey(idl.metadata.address)
  }, [])

  const [solcietyPDA] = useMemo(() => {
    const solcietySeed = anchor.utils.bytes.utf8.encode('solciety')

    return anchor.web3.PublicKey.findProgramAddressSync(
      [solcietySeed],
      solcietyProgramId,
    )
  }, [solcietyProgramId])

  const provider = useMemo(() => {
    if (!anchorWallet) return null

    return new anchor.AnchorProvider(connection, anchorWallet, {
      preflightCommitment: 'confirmed',
      commitment: 'processed',
    })
  }, [anchorWallet, connection])

  const program = useMemo(() => {
    if (!provider) return null

    return new anchor.Program(
      JSON.parse(JSON.stringify(idl)),
      solcietyProgramId,
      provider,
    )
  }, [solcietyProgramId, provider])

  const value = useMemo(
    () => ({
      solcietyProgram: program,
      solcietyProgramId: solcietyProgramId,
      solcietyPDA: solcietyPDA,
    }),
    [program, solcietyProgramId, solcietyPDA],
  )

  return value
}
