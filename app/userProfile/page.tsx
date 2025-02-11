"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Star,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  SlidersHorizontal,
} from "lucide-react"
import Image from "next/image"

interface CoinData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  icon: string
  favorite?: boolean
}

export default function UserProfile() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState("top-gainers")
  const [showCount, setShowCount] = useState(20)

  const featuredCoins = [
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 38.4,
      change: "+7.05%",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qp6CjR89MxZSwI9bX7FnIrjI7C6hLS.png",
    },
    {
      name: "Binance",
      symbol: "BNB",
      price: 38.4,
      change: "+7.05%",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qp6CjR89MxZSwI9bX7FnIrjI7C6hLS.png",
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      price: 38.4,
      change: "+7.05%",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qp6CjR89MxZSwI9bX7FnIrjI7C6hLS.png",
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      price: 38.4,
      change: "+7.05%",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qp6CjR89MxZSwI9bX7FnIrjI7C6hLS.png",
    },
  ]

  const coins: CoinData[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 43975.72,
      change24h: 0.6,
      high24h: 44727.8,
      low24h: 43318.64,
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qp6CjR89MxZSwI9bX7FnIrjI7C6hLS.png",
      favorite: true,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3187.82,
      change24h: -2.78,
      high24h: 3263.18,
      low24h: 3077.03,
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qp6CjR89MxZSwI9bX7FnIrjI7C6hLS.png",
    },
    // Add more coin data here...
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price)
  }

  const topHoldings = [
    { name: "Sol", amount: "2.03k", value: "$393,456.6", icon: "☀️" },
    { name: "USDC", amount: "587k", value: "$587,419.1", icon: "💰" },
    { name: "PAIN", amount: "1.29m", value: "$45,333.1", icon: "😢" },
    { name: "Nikita", amount: "3m", value: "$29,987.6", icon: "👤" },
    { name: "streamer", amount: "24.6m", value: "$6,662.3", icon: "📺" },
    { name: "ETH", amount: "45.2", value: "$78,234.5", icon: "💎" },
    { name: "BTC", amount: "1.5", value: "$45,678.9", icon: "🔶" },
    { name: "LINK", amount: "5.6k", value: "$32,456.7", icon: "🔗" },
    { name: "UNI", amount: "12.3k", value: "$18,765.4", icon: "🦄" },
    { name: "AAVE", amount: "789", value: "$87,654.3", icon: "👻" },
    { name: "COMP", amount: "456", value: "$23,456.7", icon: "🏛️" },
    { name: "YFI", amount: "0.5", value: "$12,345.6", icon: "🌟" },
    { name: "SNX", amount: "3.4k", value: "$9,876.5", icon: "⚡" },
    { name: "MKR", amount: "23", value: "$34,567.8", icon: "🏭" },
    { name: "SUSHI", amount: "6.7k", value: "$21,098.7", icon: "🍣" },
  ]

  const defiTrades = [
    { type: "Sell", amount: "2.52m", token: "streamer", price: "3.83 Sol", time: "30s" },
    { type: "Sell", amount: "26.8m", token: "bro", price: "5.68 Sol", time: "10m" },
    { type: "Buy", amount: "10.1", token: "Sol", price: "23.9m bro", time: "11m" },
    { type: "Buy", amount: "15.1", token: "Sol", price: "27.1m streamer", time: "12m" },
    { type: "Buy", amount: "1.35", token: "Sol", price: "2.93m bro", time: "13m" },
    { type: "Sell", amount: "5.6k", token: "LINK", price: "12.3 ETH", time: "15m" },
    { type: "Buy", amount: "789", token: "AAVE", price: "45.6 ETH", time: "18m" },
    { type: "Sell", amount: "0.5", token: "YFI", price: "18.9 ETH", time: "22m" },
    { type: "Buy", amount: "3.4k", token: "SNX", price: "7.8 ETH", time: "25m" },
    { type: "Sell", amount: "23", token: "MKR", price: "56.7 ETH", time: "28m" },
    { type: "Buy", amount: "6.7k", token: "SUSHI", price: "34.5 ETH", time: "32m" },
    { type: "Sell", amount: "1.2k", token: "UNI", price: "2.3 ETH", time: "35m" },
    { type: "Buy", amount: "0.8", token: "WBTC", price: "15.6 ETH", time: "38m" },
    { type: "Sell", amount: "450", token: "COMP", price: "89.1 ETH", time: "42m" },
    { type: "Buy", amount: "2.3k", token: "CRV", price: "5.6 ETH", time: "45m" },
  ]

  const tokenPnL = [
    {
      token: "streamer",
      icon: "📺",
      pnl: "+22.50 Sol ($4,410.8)",
      trades: [
        { type: "Buy", amount: "35.39 Sol (44.5m)", time: "32m" },
        { type: "Sell", amount: "23.91 Sol (19.9m)", time: "30s" },
        { type: "Hold", amount: "33.99 Sol (24.6m)", value: "$6,662" },
      ],
    },
    {
      token: "ETH",
      icon: "💎",
      pnl: "+1.23 ETH ($2,460)",
      trades: [
        { type: "Buy", amount: "2.5 ETH", time: "2h" },
        { type: "Sell", amount: "1.27 ETH", time: "45m" },
        { type: "Hold", amount: "1.23 ETH", value: "$2,460" },
      ],
    },
    {
      token: "LINK",
      icon: "🔗",
      pnl: "-450 LINK ($1,350)",
      trades: [
        { type: "Buy", amount: "1000 LINK", time: "1d" },
        { type: "Sell", amount: "550 LINK", time: "4h" },
        { type: "Hold", amount: "450 LINK", value: "$1,350" },
      ],
    },
    {
      token: "UNI",
      icon: "🦄",
      pnl: "+1.2k UNI ($7,200)",
      trades: [
        { type: "Buy", amount: "5k UNI", time: "3d" },
        { type: "Sell", amount: "3.8k UNI", time: "1d" },
        { type: "Hold", amount: "1.2k UNI", value: "$7,200" },
      ],
    },
    {
      token: "AAVE",
      icon: "👻",
      pnl: "+78 AAVE ($23,400)",
      trades: [
        { type: "Buy", amount: "200 AAVE", time: "5d" },
        { type: "Sell", amount: "122 AAVE", time: "2d" },
        { type: "Hold", amount: "78 AAVE", value: "$23,400" },
      ],
    },
    {
      token: "SNX",
      icon: "⚡",
      pnl: "-230 SNX ($1,150)",
      trades: [
        { type: "Buy", amount: "1000 SNX", time: "1w" },
        { type: "Sell", amount: "770 SNX", time: "3d" },
        { type: "Hold", amount: "230 SNX", value: "$1,150" },
      ],
    },
    {
      token: "YFI",
      icon: "🌟",
      pnl: "+0.5 YFI ($12,500)",
      trades: [
        { type: "Buy", amount: "1 YFI", time: "2w" },
        { type: "Sell", amount: "0.5 YFI", time: "1w" },
        { type: "Hold", amount: "0.5 YFI", value: "$12,500" },
      ],
    },
    {
      token: "COMP",
      icon: "🏛️",
      pnl: "+45 COMP ($13,500)",
      trades: [
        { type: "Buy", amount: "100 COMP", time: "10d" },
        { type: "Sell", amount: "55 COMP", time: "5d" },
        { type: "Hold", amount: "45 COMP", value: "$13,500" },
      ],
    },
    {
      token: "MKR",
      icon: "🏭",
      pnl: "-2 MKR ($3,800)",
      trades: [
        { type: "Buy", amount: "10 MKR", time: "3w" },
        { type: "Sell", amount: "8 MKR", time: "1w" },
        { type: "Hold", amount: "2 MKR", value: "$3,800" },
      ],
    },
    {
      token: "SUSHI",
      icon: "🍣",
      pnl: "+1.5k SUSHI ($12,000)",
      trades: [
        { type: "Buy", amount: "5k SUSHI", time: "1m" },
        { type: "Sell", amount: "3.5k SUSHI", time: "2w" },
        { type: "Hold", amount: "1.5k SUSHI", value: "$12,000" },
      ],
    },
    {
      token: "CRV",
      icon: "🌊",
      pnl: "+3k CRV ($3,900)",
      trades: [
        { type: "Buy", amount: "10k CRV", time: "2m" },
        { type: "Sell", amount: "7k CRV", time: "3w" },
        { type: "Hold", amount: "3k CRV", value: "$3,900" },
      ],
    },
    {
      token: "BAL",
      icon: "⚖️",
      pnl: "-100 BAL ($2,000)",
      trades: [
        { type: "Buy", amount: "500 BAL", time: "45d" },
        { type: "Sell", amount: "400 BAL", time: "1m" },
        { type: "Hold", amount: "100 BAL", value: "$2,000" },
      ],
    },
    {
      token: "MATIC",
      icon: "🔷",
      pnl: "+5k MATIC ($4,500)",
      trades: [
        { type: "Buy", amount: "20k MATIC", time: "2m" },
        { type: "Sell", amount: "15k MATIC", time: "3w" },
        { type: "Hold", amount: "5k MATIC", value: "$4,500" },
      ],
    },
    {
      token: "DOT",
      icon: "🔴",
      pnl: "-200 DOT ($3,600)",
      trades: [
        { type: "Buy", amount: "1000 DOT", time: "3m" },
        { type: "Sell", amount: "800 DOT", time: "1m" },
        { type: "Hold", amount: "200 DOT", value: "$3,600" },
      ],
    },
    {
      token: "ATOM",
      icon: "⚛️",
      pnl: "+300 ATOM ($4,200)",
      trades: [
        { type: "Buy", amount: "1000 ATOM", time: "45d" },
        { type: "Sell", amount: "700 ATOM", time: "2w" },
        { type: "Hold", amount: "300 ATOM", value: "$4,200" },
      ],
    },
    {
      token: "AVAX",
      icon: "🔺",
      pnl: "+150 AVAX ($3,750)",
      trades: [
        { type: "Buy", amount: "500 AVAX", time: "2m" },
        { type: "Sell", amount: "350 AVAX", time: "3w" },
        { type: "Hold", amount: "150 AVAX", value: "$3,750" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Cryptocurrency Prices by Market Cap</h1>
          <p className="text-gray-400 text-sm">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
          </p>
        </div>

        {/* Featured Coins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {featuredCoins.map((coin) => (
            <div
              key={coin.symbol}
              className="bg-[#1C1F26] rounded-lg p-4 flex items-center justify-between border border-gray-800"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={coin.icon || "/placeholder.svg"}
                  alt={coin.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">{coin.name}</h3>
                  <p className="text-sm text-gray-400">${coin.price}</p>
                </div>
              </div>
              <div>
                <span className="text-green-400">{coin.change}</span>
                <div className="w-24 h-8 bg-[#2A2D3A] rounded mt-1">{/* Mini chart would go here */}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className={`${
                activeTab === "top-gainers" ? "bg-blue-500/20 text-blue-400" : "bg-transparent"
              } border-blue-500/50`}
              onClick={() => setActiveTab("top-gainers")}
            >
              Top Gainers
            </Button>
            <Button
              variant="outline"
              className={`${
                activeTab === "top-loser" ? "bg-blue-500/20 text-blue-400" : "bg-transparent"
              } border-blue-500/50`}
              onClick={() => setActiveTab("top-loser")}
            >
              Top Loser
            </Button>
            <Button
              variant="outline"
              className={`${
                activeTab === "new-in-market" ? "bg-blue-500/20 text-blue-400" : "bg-transparent"
              } border-blue-500/50`}
              onClick={() => setActiveTab("new-in-market")}
            >
              New in market
            </Button>
            <Button
              variant="outline"
              className={`${
                activeTab === "top-in-trading" ? "bg-blue-500/20 text-blue-400" : "bg-transparent"
              } border-blue-500/50`}
              onClick={() => setActiveTab("top-in-trading")}
            >
              Top in trading
            </Button>
            <Button
              variant="outline"
              className={`${
                activeTab === "top-in-volume" ? "bg-blue-500/20 text-blue-400" : "bg-transparent"
              } border-blue-500/50`}
              onClick={() => setActiveTab("top-in-volume")}
            >
              Top in Volume
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search Coin Name" className="bg-[#1C1F26] border-gray-800 w-[200px]" />
            <Button variant="outline" className="bg-[#1C1F26] border-gray-800">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-[#1C1F26] border-gray-800">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-[#1C1F26] border-gray-800">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Category</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Algorithm</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Platform</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Industry</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Coins Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-4 px-4 text-left">#</th>
                <th className="py-4 px-4 text-left">Coin Name</th>
                <th className="py-4 px-4 text-right cursor-pointer" onClick={() => handleSort("price")}>
                  <div className="flex items-center justify-end gap-2">
                    Coin Price
                    {sortColumn === "price" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="py-4 px-4 text-right cursor-pointer" onClick={() => handleSort("change24h")}>
                  <div className="flex items-center justify-end gap-2">
                    24h
                    {sortColumn === "change24h" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="py-4 px-4 text-right">24h High Price</th>
                <th className="py-4 px-4 text-right">24h Low Price</th>
                <th className="py-4 px-4 text-right">Chart</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-4 px-4">
                    <Star
                      className={`h-4 w-4 ${coin.favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={coin.icon || "/placeholder.svg"}
                        alt={coin.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span>{coin.name}</span>
                      <span className="text-gray-400">{coin.symbol}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">{formatPrice(coin.price)}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={coin.change24h >= 0 ? "text-green-400" : "text-red-400"}>
                      {coin.change24h >= 0 ? "+" : ""}
                      {coin.change24h}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">{formatPrice(coin.high24h)}</td>
                  <td className="py-4 px-4 text-right">{formatPrice(coin.low24h)}</td>
                  <td className="py-4 px-4">
                    <div className="w-24 h-8 bg-[#2A2D3A] rounded">{/* Mini chart would go here */}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <span>1-20 of 9,383 assets</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-[#1C1F26] border-gray-800">
              2
            </Button>
            <Button variant="outline" className="bg-[#1C1F26] border-gray-800">
              3
            </Button>
            <Button variant="outline" className="bg-[#1C1F26] border-gray-800">
              4
            </Button>
            <span>...</span>
            <Button variant="outline" className="bg-[#1C1F26] border-gray-800">
              <ChevronDown className="h-4 w-4 rotate-270" />
            </Button>
          </div>
        </div>

        {/* Top Holdings */}
        <Card className="bg-[#0F1115] border-gray-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">Top Holdings</h2>
            <span className="text-lg text-white">$1,063,491.6</span>
          </div>
          <div className="space-y-3 h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {topHoldings.map((holding, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-white">
                  <span>{holding.icon}</span>
                  <span>
                    {holding.amount} {holding.name}
                  </span>
                </div>
                <span className="text-gray-400">{holding.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* DeFi Trades */}
        <Card className="bg-[#0F1115] border-gray-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">DeFi Trades</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search tokens"
                className="bg-[#1C1F26] border-gray-800 text-sm w-[150px] text-white placeholder:text-gray-500"
              />
              <Button size="sm" variant="outline" className="bg-[#1C1F26] border-gray-800">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-3 h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {defiTrades.map((trade, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {trade.type === "Buy" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={trade.type === "Buy" ? "text-green-500" : "text-red-500"}>{trade.type}</span>
                  <span className="text-white">
                    {trade.amount} {trade.token}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">{trade.price}</span>
                  <span className="text-gray-600">{trade.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Token PnL */}
        <Card className="bg-[#0F1115] border-gray-800 p-4 mt-4 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">Token PnL</h2>
            <div className="text-green-500">946/232 +5,066.60 Sol ($993,206.7)</div>
          </div>
          <div className="h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tokenPnL.map((token, i) => (
                <div key={i} className="border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-white">
                      <span>{token.icon}</span>
                      <span>{token.token}</span>
                    </div>
                    <span className={token.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}>{token.pnl}</span>
                  </div>
                  <div className="space-y-2">
                    {token.trades.map((trade, j) => (
                      <div key={j} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              trade.type === "Buy"
                                ? "text-green-500"
                                : trade.type === "Sell"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                            }
                          >
                            {trade.type}
                          </span>
                          <span className="text-white">{trade.amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {trade.value && <span className="text-gray-400">{trade.value}</span>}
                          <span className="text-gray-600">{trade.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-8 bg-gradient-to-t from-[#0F1115] to-transparent pointer-events-none absolute bottom-0 left-0 right-0" />
        </Card>
      </div>
    </div>
  )
}

