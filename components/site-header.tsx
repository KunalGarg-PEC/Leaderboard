"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, Settings, X, ExternalLink } from "lucide-react"
import { SettingsDropdown } from "./settings-dropdown"

export function SiteHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const settingsRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < lastScrollY)
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false)
      }
      if (searchRef.current && event.target !== searchRef.current) {
        setShowSearch(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSearch(false)
        setShowSettings(false)
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-black shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center px-8">
        {/* Logo & Price */}
        <div className="flex items-center space-x-6 mr-6">
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-white tracking-wide hover:text-gray-300 transition"
          >
            MightX
          </Link>
          <Link
            href="https://www.tradingview.com/chart/?symbol=BINANCE%3ASOLUSDT.P"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white bg-black px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-900 transition"
          >
            <span className="text-lg font-medium text-yellow-500">💲</span>
            <span className="text-lg font-medium">$203.06</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 text-sm font-medium text-gray-400">
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

        {/* Right-Side UI */}
        <div className="flex flex-1 items-center justify-end space-x-5">
          <Link href="/portfolio" className="flex items-center text-gray-400 hover:text-white transition">
            <span className="mr-2">📊</span> Portfolio
          </Link>
          <Link href="/watchlist" className="flex items-center text-gray-400 hover:text-white transition">
            <span className="mr-2">⭐</span> Watchlist
          </Link>

          {/* Search Bar */}
          <div className="relative flex items-center bg-gray-800 px-3 py-1 rounded-lg w-60">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search"
              className="bg-transparent text-gray-300 focus:outline-none px-2 w-full"
            />
            <span className="text-gray-500 ml-2">/</span>
          </div>

          {/* Mobile Toggle */}
          <button className="p-2 rounded-lg bg-gray-800 text-blue-500 hover:bg-gray-700">
            📱
          </button>

          {/* Login Button */}
          <button className="px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition">
            Log In
          </button>

          {/* Menu Button */}
          <button onClick={() => setShowMenu(!showMenu)} className="flex items-center p-2 rounded-full bg-gray-800 border border-gray-600 hover:bg-gray-700">
            <span className="mr-2">👤</span>
            <span className="text-gray-300">Menu</span>
          </button>

          {showMenu && (
            <div ref={menuRef} className="absolute right-10 top-16 bg-gray-900 p-4 rounded-lg shadow-lg w-64 text-white">
              <button onClick={() => setShowMenu(false)} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <p className="text-lg font-semibold mb-3">Menu</p>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md">Log In</button>
              <button className="w-full mt-2 border border-gray-600 p-2 rounded-md">Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
