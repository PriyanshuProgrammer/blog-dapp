import { getBasicProgram, getBasicProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { useMemo } from 'react'
import { useAnchorProvider } from '@/components/solana/use-anchor-provider.tsx'

export function useBasicProgram() {
  const { connection } = useConnection()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getBasicProgramId("mainnet-beta"), [])
  const program = useMemo(() => getBasicProgram(provider, programId), [provider, programId])

  const getProgramAccount = async () => {
    let info = await connection.getParsedAccountInfo(programId)
    return info
  }
  return {
    program,
    programId,
    getProgramAccount,
  }
}
