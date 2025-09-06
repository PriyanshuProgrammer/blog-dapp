import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useBasicProgram } from '@/basic/basic-data-access'
import { PublicKey } from '@solana/web3.js'
import { LoaderOne } from '@/components/ui/loader'

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

export default function Blogs() {
  //hooks
  const [blogsAddresses, setBlogsAddresses] = useState<IBlog[] | null>(null)
  const navigate = useNavigate()
  const { program } = useBasicProgram()

  // actions
  const fetchBlogs = async () => {
    try {
      const accounts = await program.account.blog.all()
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
              onClick={() => navigate(`${blog.publicKey.toBase58()}`)}
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
