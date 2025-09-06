import { useBasicProgram } from '@/basic/basic-data-access'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { getReactionAddress } from '@/lib/utils'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import Comments from './comments'
import { LoaderOne } from '../ui/loader'

interface IBlog {
  title: string
  content: string
  likes: number
  dislikes: number
}

const BlogView = () => {
  //hooks
  const { id } = useParams()
  const { program } = useBasicProgram()
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<IBlog>()
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const { publicKey } = useWallet()

  //actions
  const getBlogData = async () => {
    if (!id) return
    setLoading(true)
    const blogData = await program.account.blog.fetch(id)
    setBlog({
      title: blogData.title,
      content: blogData.content,
      likes: blogData.likes,
      dislikes: blogData.dislikes,
    })
    setLoading(false)
  }

  const getLikeStatus = async () => {
    if (!id || !publicKey) {
      return
    }
    try {
      const blogPubKey = new PublicKey(id)
      const reactionPda = getReactionAddress(publicKey, blogPubKey, program.programId)
      const likeStatus = await program.account.reaction.fetch(reactionPda[0])
      if (likeStatus.reaction.like) {
        setIsLiked(true)
        setIsDisliked(false)
      } else if (likeStatus.reaction.dislike) {
        setIsLiked(false)
        setIsDisliked(true)
      }
    } catch (e) {}
  }

  const LikeBlog = async () => {
    if (!id || !publicKey) {
      toast.error('Connect your wallet to perform this action')
      return
    }
    try {
      const blogPubKey = new PublicKey(id)
      const reactionPda = getReactionAddress(publicKey, blogPubKey, program.programId)
      await program.methods
        .likeTweet()
        .accounts({
          signer: publicKey,
          blog: blogPubKey,
          //@ts-ignore
          reaction: reactionPda[0],
          systemProgram: SystemProgram.programId,
        })
        .rpc()
      getLikeStatus()
      getBlogData()
    } catch (e) {
      toast.error('Failed to like the blog')
    }
  }

  const DislikeTweet = async () => {
    if (!id || !publicKey) {
      toast.error('Connect your wallet to perform this action')
      return
    }
    try {
      const blogPubKey = new PublicKey(id)
      const reactionPda = getReactionAddress(publicKey, blogPubKey, program.programId)
      await program.methods
        .dislikeTweet()
        .accounts({
          signer: publicKey,
          blog: blogPubKey,
          //@ts-ignore
          reaction: reactionPda[0],
          systemProgram: SystemProgram.programId,
        })
        .rpc()
      getLikeStatus()
      getBlogData()
    } catch (e) {
      toast.error('Failed to dislike the blog')
    }
  }

  useEffect(() => {
    getBlogData()
    getLikeStatus()
  }, [id])

  //effects
  return (
    <div className="flex justify-center min-h-screen mt-20">
      {loading ? (
        <div className="py-10">
          <LoaderOne />
        </div>
      ) : (
        <div className="bg-white rounded-lg border-2 border-gray-200 p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{blog?.title}</h1>
          <p className="text-gray-500 text-sm mb-6 break-all">Address: {id}</p>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{blog?.content}</p>
          <div className="flex gap-6 mt-4">
            <Button
              style={
                isLiked
                  ? {
                      backgroundColor: 'black',
                      color: 'white',
                    }
                  : {}
              }
              variant="outline"
              onClick={LikeBlog}
            >
              Like({blog?.likes})
            </Button>
            <Button
              style={
                isDisliked
                  ? {
                      backgroundColor: 'black',
                      color: 'white',
                    }
                  : {}
              }
              variant="outline"
              onClick={DislikeTweet}
            >
              Dislike({blog?.dislikes})
            </Button>
          </div>
          <Comments id={id} />
        </div>
      )}
    </div>
  )
}

export default BlogView
