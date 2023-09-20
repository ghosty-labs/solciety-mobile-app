import { Program, web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

interface SendPostProps {
  program: Program
  authorityPublicKey: PublicKey
  tag: string
  content: string
}

export const sendPost = async ({
  program,
  authorityPublicKey,
  tag,
  content,
}: SendPostProps) => {
  const post = web3.Keypair.generate()

  const signature = await program.methods
    .sendPost(tag, content)
    .accounts({
      post: post.publicKey,
      user: authorityPublicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([post])
    .rpc()

  return signature
}
