import { Program, web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

interface followUserProps {
  program: Program
  authorityPublicKey: PublicKey
  following: PublicKey
}

export const followUser = async ({
  program,
  authorityPublicKey,
  following,
}: followUserProps) => {
  const follow = web3.Keypair.generate()

  const signature = await program.methods
    .followUser(following)
    .accounts({
      follow: follow.publicKey,
      user: authorityPublicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([follow])
    .rpc()

  return signature
}
