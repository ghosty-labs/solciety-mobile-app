import { Program, web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

interface followUserProps {
  program: Program
  authorityPublicKey: PublicKey
  unfollowing: PublicKey
}

export const unfollowUser = async ({
  program,
  authorityPublicKey,
  unfollowing,
}: followUserProps) => {
  const follow = web3.Keypair.generate()

  const signature = await program.methods
    .unfollowUser(unfollowing)
    .accounts({
      follow: follow.publicKey,
      user: authorityPublicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([follow])
    .rpc()

  return signature
}
