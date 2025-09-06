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
      <div className="flex flex-col relative items-center min-h-screen">
        <AppHeader links={links} />
        <main className="flex-grow container mx-auto w-full p-4">{children}</main>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
