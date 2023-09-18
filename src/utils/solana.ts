import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export const convertLamportsToSOL = (lamports: number) => {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(
    (lamports || 0) / LAMPORTS_PER_SOL,
  )
}
