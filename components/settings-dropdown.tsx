"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Settings, Copy, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SettingsDropdown() {
  const [theme, setTheme] = useState(false)
  const [sounds, setSounds] = useState(false)
  const [platform, setPlatform] = useState("Pump/Dexs")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-[#1a1a1a] border-gray-800 text-white">
        <div className="p-4 space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-lg font-normal">Theme</Label>
            <Switch checked={theme} onCheckedChange={setTheme} className="data-[state=checked]:bg-blue-600" />
          </div>

          {/* Sounds Toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-lg font-normal">Sounds</Label>
            <Switch checked={sounds} onCheckedChange={setSounds} className="data-[state=checked]:bg-blue-600" />
          </div>

          {/* Platform Selector */}
          <div className="flex items-center justify-between">
            <Label className="text-lg font-normal">Platform</Label>
            <Button variant="outline" className="bg-transparent border-gray-700 text-white">
              {platform}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Custom Settings */}
          <div className="space-y-4">
            <Label className="text-lg font-normal">Custom Settings</Label>

            <div className="space-y-2">
              <div className="relative">
                <Input placeholder="Helius Api Key" className="bg-transparent border-gray-700 text-white pr-10" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard("helius-api-key")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <Input placeholder="Rpc Url" className="bg-transparent border-gray-700 text-white pr-10" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard("rpc-url")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-400">Supports comma separated lists</p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}