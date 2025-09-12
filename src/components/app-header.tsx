import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { WalletButton } from '@/components/solana/solana-provider'
import { Link, useLocation } from 'react-router'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const { pathname } = useLocation()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="w-full border-b">
      <div className="mx-auto px-4 py-4 flex justify-between items-center max-w-6xl border-x">
        <span className="text-2xl font-bold">
          Sol<span className="text-red-600">Book</span>
        </span>
        <div className="flex items-center justify-center gap-4">
          <div className="hidden flex-1 md:flex items-center">
            <ul className="flex gap-2 flex-nowrap items-center">
              {links.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={`hover:bg-slate-100 p-2 rounded-sm ${isActive(path) ? 'text-blue-500' : ''}`}
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <div className="hidden md:block">
          <WalletButton />
        </div>
        {showMenu && (
          <div className="md:hidden fixed inset-x-0 top-[52px] bottom-0 bg-neutral-100/95 backdrop-blur-sm">
            <div className="flex flex-col p-4 gap-4 border-t">
              <ul className="flex flex-col gap-4">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      className={`hover:text-neutral-500 block text-lg py-2  ${isActive(path) ? 'text-neutral-500' : ''} `}
                      to={path}
                      onClick={() => setShowMenu(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
