import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useBasicProgram } from '@/basic/basic-data-access'
import { useWallet } from '@solana/wallet-adapter-react'
import { getCommentAddress } from '@/lib/utils'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { LoaderOne } from '../ui/loader'

const Comments = ({ id }: { id: string | undefined }) => {
  const { program } = useBasicProgram()
  const { publicKey } = useWallet()
  const [comments, setComments] = useState<any[] | null>(null)
  const commentRef = useRef<HTMLInputElement>(null)

  const createComment = async () => {
    if (!id || !publicKey) {
      toast.error('Connect wallet to perform this action')
      return
    }
    if (!commentRef.current || !commentRef.current?.value) {
      toast.error('Please enter some data in the comment')
      return
    }
    // logic to add comment
    try {
      const blogPubKey = new PublicKey(id)
      const count = await program.account.blog.fetch(blogPubKey)
      console.log(count.commentCounter)
      const commentPda = getCommentAddress(publicKey, blogPubKey, program.programId, count.commentCounter)
      await program.methods
        .addComment(commentRef.current.value)
        .accounts({
          signer: publicKey,
          blog: blogPubKey,
          //@ts-ignore
          comment: commentPda[0],
          systemProgram: SystemProgram.programId,
        })
        .rpc()

      commentRef.current.value = ''
      toast.success('Comment added successfully')
      getComments()
    } catch (_) {
      toast.error('Error adding comment')
    }
  }

  const getComments = async () => {
    if (!id || !publicKey) return
    try {
      const comments = await program.account.comment.all([
        {
          memcmp: {
            offset: 8,
            bytes: id,
          },
        },
      ])
      setComments(comments)
    } catch (_) {
      toast.error('Error fetching comments')
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <>
      <div className="mt-10">comments</div>
      <div className="w-full flex gap-0.5 my-3 border-b pb-3">
        <input type="text" className="border-2 border-slate-200 flex-1 rounded-sm px-2" ref={commentRef} />
        <Button onClick={createComment} variant="outline">
          Submit
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {comments === null && (
          <div className="flex justify-center">
            <LoaderOne />
          </div>
        )}
        {comments?.length === 0 && <div>No comments yet</div>}
        {comments?.map((comment, index) => (
          <div key={index} className="border p-2 border-gray-200 rounded-sm">
            <p>{comment.account.comment}</p>
            <p className="text-gray-500 text-[12px] break-all">{comment.publicKey.toBase58()}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Comments
