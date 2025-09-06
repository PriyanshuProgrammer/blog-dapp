import { useNavigate } from 'react-router'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'
import solImg from '@/assets/solana.png'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-screen grid">
      <SolanaIcon x={10} y={15} />
      <SolanaIcon x={80} y={20} />
      <SolanaIcon x={15} y={70} />
      <SolanaIcon x={70} y={60} />
      <div className="flex flex-col gap-4 items-center justify-center mx-auto md:w-[70%]">
        <span
          className="bg-blue-100 mb-4 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 
             rounded-sm border border-blue-400 
shadow-[0_0_10px_1px_rgba(59,130,246,0.5)]
             hover:shadow-[0_0_20px_6px_rgba(59,130,246,0.5)] transition-shadow duration-300"
        >
          Created by&nbsp;
          <a href="https://x.com/PriyanshuV_code" target="_blank" rel="noreferrer" className="underline">
            Priyanshu
          </a>
        </span>
        <p className="text-5xl md:text-7xl text-center font-bold">
          Your words, forever on the&nbsp;
          <span className="bg-gradient-to-tr from-fuchsia-600 to-teal-500 bg-clip-text text-transparent">
            blockchain
          </span>
        </p>
        <p className="text-center md:text-2xl md:w-[60%] text-gray-500">
          Own your voice, share your story, and let your words live on the blockchain forever.
        </p>
        <div className="flex gap-4 items-center justify-center">
          <WalletButton />
          <Button variant={'outline'} onClick={() => navigate('/create-blog')}>
            Create Blog
          </Button>
        </div>
      </div>
    </div>
  )
}

const SolanaIcon = ({ x, y }: { x: number; y: number }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${solImg})`,
        position: 'absolute',
        top: `${y}vh`,
        left: `${x}vw`,
        zIndex: -1,
      }}
      className={`w-20 h-20 hidden md:block bg-contain bg-no-repeat`}
    ></div>
  )
}
export default Dashboard
