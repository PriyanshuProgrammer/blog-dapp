import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import { AppHeader } from '@/components/app-header'
import React from 'react'

export function AppLayout({
  children,
  links,
}: {
  children: React.ReactNode
  links: { label: string; path: string }[]
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div
        style={{
          fontFamily: 'courier-new, monospace',
        }}
        className="flex flex-col relative items-center "
      >
        <AppHeader links={links} />
        <main className="w-full border-b h-[85dvh]">{children}</main>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
