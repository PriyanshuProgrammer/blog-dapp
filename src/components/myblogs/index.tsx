import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useBasicProgram } from '@/basic/basic-data-access'
import { toast } from 'sonner'

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
  if (!publicKey) {
    return (
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    )
  }
  const fetchBlogs = async () => {
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
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex justify-between w-[90%] md:w-[70%]">
        <div>My Blogs</div>
        <Button onClick={() => navigate('/create-blog')} variant="outline" className="w-fit px-2" size="icon">
          Create a blog
        </Button>
      </div>
      <div>
        {blogsAddresses === null && <div className="py-10">Loading...</div>}
        {blogsAddresses && blogsAddresses.length === 0 && <div className="py-10">No blogs found</div>}
        {blogsAddresses &&
          blogsAddresses.map((blog, index) => (
            <div
              onClick={() => navigate(`/blogs/${blog.publicKey.toBase58()}`)}
              key={index}
              className="border p-4 m-2 w-[600px] rounded-sm hover:border-gray-800 cursor-pointer"
            >
              <div>{blog.account.title}</div>
              <div className='text-gray-500 text-sm'>Address: {blog.publicKey.toBase58()}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
