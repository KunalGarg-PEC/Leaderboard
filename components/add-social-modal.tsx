"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ChevronDown, Twitter, MessageCircle, Github, Linkedin, Instagram, Facebook } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface AddSocialsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (socials: string[]) => void
  initialSocials: string[]
}

export function AddSocialsModal({ isOpen, onClose, onSubmit, initialSocials }: AddSocialsModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState("twitter")
  const [link, setLink] = useState("")
  const [socials, setSocials] = useState<string[]>(initialSocials)

  const currentDate = new Date()
  const formattedDate = currentDate
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase()

  const platforms = [
    { value: "twitter", label: "Twitter", icon: Twitter },
    { value: "discord", label: "Discord", icon: MessageCircle },
    { value: "github", label: "GitHub", icon: Github },
    { value: "linkedin", label: "LinkedIn", icon: Linkedin },
    { value: "instagram", label: "Instagram", icon: Instagram },
    { value: "facebook", label: "Facebook", icon: Facebook },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (link) {
      const newSocials = [...socials, `${selectedPlatform}:${link}`]
      onSubmit(newSocials)
      setSocials(newSocials)
      setLink("")
    }
  }

  const handleAddAnother = () => {
    if (link) {
      setSocials([...socials, `${selectedPlatform}:${link}`])
      setLink("")
      setSelectedPlatform("twitter")
    }
  }

  const isButtonDisabled = !link

  useEffect(() => {
    setSocials(initialSocials)
  }, [initialSocials])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-[#1C1D1F] border-0">
        <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[200px] border-0 bg-zinc-800/50 text-white focus:ring-0">
                <SelectValue placeholder="Select platform" />
                <ChevronDown className="h-4 w-4 opacity-50" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value} className="text-white">
                    <div className="flex items-center">
                      <platform.icon className="mr-2 h-4 w-4" />
                      {platform.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={onClose} variant="ghost" className="p-0 w-8 h-8 rounded-full hover:bg-zinc-800">
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Textarea
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={`Enter your ${selectedPlatform} profile link...`}
              className="min-h-[100px] bg-transparent border-0 text-white text-lg placeholder:text-zinc-600 focus-visible:ring-0 resize-none p-0"
            />

            <div className="flex items-center justify-between">
              <span className="text-zinc-600 text-sm">{socials.length} social(s) added</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={handleAddAnother}
                  disabled={isButtonDisabled}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 rounded-lg disabled:opacity-50"
                >
                  Add Another
                </Button>
                <Button
                  type="submit"
                  disabled={isButtonDisabled}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 rounded-lg disabled:opacity-50"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

