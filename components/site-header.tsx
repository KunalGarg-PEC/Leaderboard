"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"
import { SettingsDropdown } from "./settings-dropdown"

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-black shadow-md">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-6 mr-4">
          <Link href="/" className="text-xl font-bold text-white">
            Company Name
          </Link>
          <div className="flex items-center space-x-1 text-white">
            <span className="text-lg">$203.06</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        <nav className="flex items-center space-x-6 text-sm font-medium text-white/70">
          <Link href="/trades" className="transition-colors hover:text-white">
            Trades
          </Link>
          <Link href="/tokens" className="transition-colors hover:text-white">
            Tokens
          </Link>
          <Link href="/leaderboard" className="transition-colors hover:text-white">
            Leaderboard
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button className="bg-[#1a237e] text-white hover:bg-[#1a237e]/90">Connect Wallet</Button>

          <SettingsDropdown />
        </div>
      </div>
    </header>
  )
}