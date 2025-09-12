import { useNavigate } from 'react-router'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 items-center pt-20 bg-gradient-to-t from-purple-300 to-transparent h-full mx-auto max-w-6xl border-x">
      <span className="bg-blue-200 mb-4 text-black text-sm md:text-md font-medium me-2 px-5 py-1.5 rounded-full">
        Created by Priyanshu
      </span>
      <p className="text-3xl md:text-6xl md:w-[70%] w-[90%] text-center font-bold">
        Your words, forever on the&nbsp;
        <span className="bg-gradient-to-tr from-fuchsia-600 to-teal-500 bg-clip-text text-transparent">blockchain</span>
      </p>
      <p className="text-center md:text-xl md:w-[50%] w-[90%] text-gray-500">
        Own your voice, share your story, and let your words live on the blockchain forever.
      </p>
      <div className="flex gap-4 mt-6 items-center justify-center">
        <WalletButton />
        <Button
          className="bg-black text-white hover:bg-black hover:text-gray-200"
          variant={'outline'}
          onClick={() => navigate('/create-blog')}
        >
          Create Blog
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
