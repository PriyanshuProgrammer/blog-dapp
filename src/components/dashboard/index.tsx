import { useNavigate } from 'react-router'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 items-center justify-center mx-auto md:w-[50%] md:pt-10">
      <p className="text-5xl text-center font-bold">Your words, forever on the blockchain.</p>
      <p className="text-center text-gray-500">
        Publish without limits. With SolBlog, every post is tied to your wallet and stored on decentralized networks,
        making your content permanent, verifiable, and censorship-resistant. Own your voice, share your story, and let
        your words live on the blockchain forever.
      </p>
      <div className="flex gap-4 items-center justify-center">
        <WalletButton />
        <Button variant={'outline'} onClick={() => navigate('/create-blog')}>
          Create blog
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
