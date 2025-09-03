import { PublicKey } from '@solana/web3.js'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as anchor from '@coral-xyz/anchor'
const BLOG = 'blog'
const React = 'react'
const Comment = 'comment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ellipsify(str = '', len = 4, delimiter = '..') {
  const strLen = str.length
  const limit = len * 2 + delimiter.length

  return strLen >= limit ? str.substring(0, len) + delimiter + str.substring(strLen - len, strLen) : str
}

export const getBlogAddress = (id: string, author: PublicKey, programId: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(BLOG), anchor.utils.bytes.utf8.encode(id), author.toBuffer()],
    programId,
  )
}

export const getReactionAddress = (signer: PublicKey, blog: PublicKey, programId: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(React), blog.toBuffer(), signer.toBuffer()],
    programId,
  )
}

export const getCommentAddress = (signer: PublicKey, blog: PublicKey, programId: PublicKey, count: number) => {
  let bytes = toBigEndianBytes(count)
  return PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(Comment), bytes, signer.toBuffer(), blog.toBuffer()],
    programId,
  )
}

function toBigEndianBytes(num: number) {
  const buffer = new ArrayBuffer(4)
  const view = new DataView(buffer)
  view.setUint32(0, num, false)
  return new Uint8Array(buffer)
}
