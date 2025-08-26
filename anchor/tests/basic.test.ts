import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Basic } from '../target/types/basic'
import { PublicKey, SystemProgram } from '@solana/web3.js'

const title = 'The decentralized blog app'
const content =
  "a framework for building Solana programs in Rust, a discriminator is an 8-byte identifier added to the beginning of an account's data. Its primary use is for type safety and correct deserialization of Program Derived Accounts (PDAs) and other accounts."

const BLOG = 'blog'
const React = 'react'
describe('basic', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Basic as Program<Basic>
  // author of the blog
  const signer = anchor.web3.Keypair.generate()
  // blog data account

  it('should initialize the blog', async () => {
    const blogPda = getBlogAddress(signer.publicKey, program.programId)
    // airdrop some dev sol
    await airdrop(provider.connection, signer.publicKey)
    // create blog
    await program.methods
      .initializeBlog('1', title, content)
      .accounts({
        signer: signer.publicKey,
        //@ts-ignore
        blog: blogPda[0],
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer])
      .rpc({ commitment: 'confirmed' })

    // check if the account contains the data
    let blogContent = await program.account.blog.fetch(blogPda[0])
    expect(blogContent.content).toBe(content)
    expect(blogContent.title).toBe(title)
    expect(blogContent.likes).toBe(0)
    expect(blogContent.dislikes).toBe(0)
  })

  it('should not initialize the already initialized blog', async () => {
    const blogPda = getBlogAddress(signer.publicKey, program.programId)
    // create blog
    let threw = false
    try {
      await program.methods
        .initializeBlog('1', title, content)
        .accounts({
          signer: signer.publicKey,
          //@ts-ignore
          blog: blogPda[0],
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([signer])
        .rpc({ commitment: 'confirmed' })
    } catch (_) {
      threw = true
    }
    expect(threw).toBe(true)
  })

  it('should add like reaction on the blog', async () => {
    const blogPda = getBlogAddress(signer.publicKey, program.programId)
    const reactionPda = getReactionAddress(signer.publicKey, blogPda[0], program.programId)
    await program.methods
      .likeTweet()
      .accounts({
        signer: signer.publicKey,
        blog: blogPda[0],
        //@ts-ignore
        reaction: reactionPda[0],
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer])
      .rpc({ commitment: 'confirmed' })
    // check if the account contains the data
    let reaction = await program.account.reaction.fetch(reactionPda[0])
    let blogContent = await program.account.blog.fetch(blogPda[0])
    expect(blogContent.likes).toBe(1)
    expect(reaction.blog.toString()).toBe(blogPda[0].toString())
  })

  it('should not add both like and dislike reaction on the blog', async () => {
    const blogPda = getBlogAddress(signer.publicKey, program.programId)
    const reactionPda = getReactionAddress(signer.publicKey, blogPda[0], program.programId)
    let threw = false
    try {
      await program.methods
        .dislikeTweet()
        .accounts({
          signer: signer.publicKey,
          blog: blogPda[0],
          //@ts-ignore
          reaction: reactionPda[0],
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([signer])
        .rpc({ commitment: 'confirmed' })
    } catch (_) {
      threw = true
    }
    expect(threw).toBe(true)
    let blogContent = await program.account.blog.fetch(blogPda[0])
    expect(blogContent.dislikes).toBe(0)
  })
})

const getBlogAddress = (author: PublicKey, programId: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(BLOG), anchor.utils.bytes.utf8.encode('1'), author.toBuffer()],
    programId,
  )
}

const getReactionAddress = (signer: PublicKey, blog: PublicKey, programId: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(React), blog.toBuffer(), signer.toBuffer()],
    programId,
  )
}

async function airdrop(connection: any, address: any, amount = 1000000000) {
  await connection.confirmTransaction(await connection.requestAirdrop(address, amount), 'confirmed')
}
