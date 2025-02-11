"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, Settings, X, ExternalLink } from "lucide-react"

export function SiteHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const settingsRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

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
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSearch(false)
        setShowSettings(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  // Toggle Theme Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Toggle Sound
  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
  }

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 z-50 w-full bg-black shadow-md transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container flex h-16 max-w-screen-2xl items-center px-12 justify-between">
          {/* Logo & Price */}
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className="text-3xl font-bold text-white tracking-wide hover:text-gray-300 transition"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              MightX
            </Link>

            {/* Currency Link */}
            <Link
              href="https://www.tradingview.com/chart/?symbol=BINANCE%3ASOLUSDT.P"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white bg-black px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-900 transition"
            >
              <span className="text-2xl font-extrabold text-yellow-500">💲</span>
              <span className="text-lg font-semibold">203.06</span>
            </Link>

            {/* Navigation */}
            <nav
              className="flex items-center space-x-12 text-base font-semibold tracking-wide text-gray-400"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
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
          </div>

          {/* Actions (Search & Settings) */}
          <div className="flex items-center space-x-8 relative">
            {/* Search Button & Input Field */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-400 hover:text-white transition p-3 rounded-lg hover:bg-gray-800"
              >
                <Search className="h-6 w-6" />
              </button>
              {showSearch && (
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Enter Wallet Address"
                  className="absolute top-12 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  autoFocus
                />
              )}
            </div>

            {/* Settings Icon */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-400 hover:text-white transition p-3 rounded-lg hover:bg-gray-800"
            >
              <Settings className="h-6 w-6" />
            </button>

            {/* Settings Popup (Under Settings Icon) */}
            {showSettings && (
              <div
                ref={settingsRef}
                className="absolute top-14 right-0 w-72 bg-black p-4 rounded-lg shadow-lg border border-gray-700"
              >
                {/* Close Button */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-white">Settings</h2>
                  <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Theme Toggle */}
                <div className="flex justify-between items-center text-white">
                  <span>Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleTheme} />
                    <div className="w-10 h-5 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300"></div>
                  </label>
                </div>

                {/* Sounds Toggle */}
                <div className="flex justify-between items-center text-white mt-3">
                  <span>Sounds</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isSoundOn} onChange={toggleSound} />
                    <div className="w-10 h-5 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300"></div>
                  </label>
                </div>

                {/* Platform Dropdown */}
                <div className="mt-4 text-white">
                  <label className="block mb-1">Platform</label>
                  <select className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded-lg">
                    <option>Pump/Dexscreener</option>
                    <option>TradingView</option>
                  </select>
                </div>

                {/* Custom Settings */}
                <div className="mt-4 text-white">
                  <label className="block mb-1">Helius API Key</label>
                  <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg p-2">
                    <input type="text" className="w-full bg-transparent text-white focus:outline-none" />
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="mt-3 text-white">
                  <label className="block mb-1">RPC URL</label>
                  <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg p-2">
                    <input type="text" className="w-full bg-transparent text-white focus:outline-none" />
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}