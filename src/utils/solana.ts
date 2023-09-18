import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export const convertLamportsToSOL = (lamports: number) => {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(
    (lamports || 0) / LAMPORTS_PER_SOL,
  )
}

export const toByteArray = (base64String: string) => {
  const binaryString = Buffer.from(base64String, 'base64')

  return new Uint8Array(binaryString)
}
