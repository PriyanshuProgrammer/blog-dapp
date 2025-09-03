import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { FormEvent } from 'react'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useBasicProgram } from '@/basic/basic-data-access'
import { getBlogAddress } from '@/lib/utils'
import { SystemProgram } from '@solana/web3.js'
import { Button } from '../ui/button'

const CreateBlogs = () => {
  //hooks
  const { publicKey } = useWallet()
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const { program } = useBasicProgram()

  // actions
  if (!publicKey) {
    return (
      <div className="grid place-items-center">
        <WalletButton />
      </div>
    )
  }

  const createBlog = async (e: FormEvent) => {
    e.preventDefault()
    if (!titleRef.current?.value || !contentRef.current?.value) {
      toast.error('Title and Content are required')
      return
    }
    try {
      const count = (await program.account.blog.all()).length
      const blogPda = getBlogAddress(count.toString(), publicKey, program.programId)
      await program.methods
        .initializeBlog(count.toString(), titleRef.current.value, contentRef.current.value)
        //@ts-ignore
        .accounts({ signer: publicKey, blog: blogPda[0], systemProgram: SystemProgram.programId })
        .rpc({ commitment: 'confirmed' })
      toast.success('Blog created successfully')
    } catch (e) {
      toast.error('Error creating blog')
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-[90%] md:w-[60%] flex flex-col">
        <p className="text-2xl font-bold mb-6 text-center">Create a Blog</p>
        <form className="flex flex-col gap-4" onSubmit={createBlog}>
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600 transition"
            type="text"
            placeholder="Blog Title"
            ref={titleRef}
          />
          <textarea
            className="border border-gray-300 rounded-lg px-4 py-2 min-h-[300px] resize-none focus:outline-none focus:ring-1 ring-gray-600 transition"
            placeholder="Blog Content"
            ref={contentRef}
          ></textarea>
          <Button className='w-fit mx-auto' variant={'outline'} type="submit">
            Create blog
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlogs
