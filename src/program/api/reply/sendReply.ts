import { Program, web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

interface SendReplyProps {
  program: Program
  authorityPublicKey: PublicKey
  post: PublicKey
  content: string
}

export const sendReply = async ({
  program,
  authorityPublicKey,
  post,
  content,
}: SendReplyProps) => {
  const signer = web3.Keypair.generate()

  const signature = await program.methods
    .sendComment(post, content, post)
    .accounts({
      comment: signer.publicKey,
      user: authorityPublicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([signer])
    .rpc()

  return signature
}
