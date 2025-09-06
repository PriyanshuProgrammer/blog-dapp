import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useBasicProgram } from '@/basic/basic-data-access'
import { toast } from 'sonner'
import { LoaderOne } from '../ui/loader'

interface IBlog {
  publicKey: PublicKey
  account: {
    blogAuthor: PublicKey
    commentCounter: number
    content: string
    dislikes: number
    likes: number
    title: string
  }
}

export default function MyBlogs() {
  const { publicKey } = useWallet()
  const navigate = useNavigate()
  const { program } = useBasicProgram()
  const [blogsAddresses, setBlogsAddresses] = useState<IBlog[] | null>(null)

  const fetchBlogs = async () => {
    if (!publicKey) return
    try {
      const accounts = await program.account.blog.all([
        {
          memcmp: {
            offset: 8, // Discriminator.
            bytes: publicKey.toBase58(),
          },
        },
      ])
      setBlogsAddresses(accounts)
    } catch (_) {
      toast.error('Error fetching blogs')
    }
  }

  // effects
  useEffect(() => {
    fetchBlogs()
  }, [])

  if (!publicKey) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-[90%] mx-auto md:w-[70%] h-screen mt-20">
      <div className="flex justify-between items-center w-full border-b border-gray-300 pb-3">
        <div className="text-slate-600 font-bold text-xl">Blogs</div>
        <Button onClick={() => navigate('/create-blog')} variant="outline" className="w-fit px-2" size="icon">
          Create a blog
        </Button>
      </div>
      <div className="w-full flex flex-col gap-4 mt-3">
        {blogsAddresses === null && (
          <div className="flex justify-center items-center py-10">
            <LoaderOne />
          </div>
        )}
        {blogsAddresses && blogsAddresses.length === 0 && (
          <div className="py-10 flex justify-center items-center">No blogs found</div>
        )}
        {blogsAddresses &&
          blogsAddresses.map((blog, index) => (
            <div
              onClick={() => navigate(`/blogs/${blog.publicKey.toBase58()}`)}
              key={index}
              className="border-2 p-4 rounded-sm hover:border-gray-400 transition-all duration-200 cursor-pointer"
            >
              <div>{blog.account.title}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
