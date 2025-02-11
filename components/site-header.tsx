"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, Settings, X, ExternalLink, Send } from "lucide-react"

export function SiteHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)

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

  return (
    <header
      className={`fixed top-0 z-50 w-full pt-3 bg-black shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center px-12 justify-between">
        {/* Logo & Navigation */}
        <div className="flex items-center space-x-5">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/companylogo.png" alt="MightX Logo" className="h-14 w-14" />
            <span className="text-4xl font-bold text-white tracking-wide hover:text-gray-300 transition"
              style={{ fontFamily: "Roboto, sans-serif" }}>
              MightX
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-base font-medium tracking-wide text-gray-400"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            {["Trench", "Tracker", "Clan", "Leaderboard"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} 
                className="relative transition-all duration-300 hover:text-white hover:bg-[#1E1E1E] p-2 rounded-lg hover:scale-105">
                {item}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Search & Connect Button */}
        <div className="flex items-center space-x-4">
          <div className={`relative flex items-center transition-all duration-300 ${showSearch ? 'w-96' : 'w-52'}`}>
            <Search className="absolute left-3 text-gray-400" size={20} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[#1E1E1E] text-gray-400 border border-[#2A2A2A] focus:outline-none"
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
            />
          </div>
          <button className="flex items-center space-x-2 px-8 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition">
            <Send size={16} />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </header>
  )
}
