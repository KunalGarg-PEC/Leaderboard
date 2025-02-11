"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Twitter, MessageCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface AddSocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (socials: string[]) => void;
  initialSocials: string[];
  walletAddress: string; // Add this line
}

const handleValidation = (platform: string, link: string): boolean => {
  const patterns: Record<string, RegExp> = {
    twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/,
    discord: /^https?:\/\/(discord\.gg|discord\.com\/invite)\/[a-zA-Z0-9]+$/,
    telegram: /^https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/,
  };
  return patterns[platform]?.test(link) || false;
};

export function AddSocialsModal({
  isOpen,
  onClose,
  onSubmit,
  initialSocials,
  walletAddress,
}: AddSocialsModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState("twitter");
  const [link, setLink] = useState("");
  const [socials, setSocials] = useState<string[]>(initialSocials);
  const [error, setError] = useState("");

  const platforms = [
    { value: "twitter", label: "Twitter", icon: Twitter },
    { value: "discord", label: "Discord", icon: MessageCircle },
    {
      value: "telegram",
      label: "Telegram",
      icon: () => (
        <Image
          src="/telegram-svgrepo-com (1).svg"
          alt="Telegram"
          width={16}
          height={16}
          className="mr-2"
        />
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation(selectedPlatform, link)) {
      const newSocials = [...socials, `${selectedPlatform}:${link}`];
      onSubmit(newSocials);
      setSocials(newSocials);
      setLink("");
      setError("");
    } else {
      setError("Invalid URL format for " + selectedPlatform);
    }
  };

  const handleAddAnother = () => {
    if (handleValidation(selectedPlatform, link)) {
      setSocials([...socials, `${selectedPlatform}:${link}`]);
      setLink("");
      setSelectedPlatform("twitter");
      setError("");
    } else {
      setError("Invalid URL format for " + selectedPlatform);
    }
  };

  useEffect(() => {
    setSocials(initialSocials);
  }, [initialSocials]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-black border-0 rounded-3xl">
        <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <p className="text-sm text-gray-400">Wallet Address</p>
              <p className="text-white font-mono truncate">{walletAddress}</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="p-0 w-8 h-8 rounded-full hover:bg-zinc-800"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
          <div className="flex items-center justify-between mb-8">
            <Select
              value={selectedPlatform}
              onValueChange={setSelectedPlatform}
            >
              <SelectTrigger className="w-[200px] border-0 bg-zinc-800/50 text-white focus:ring-0">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {platforms.map((platform) => (
                  <SelectItem
                    key={platform.value}
                    value={platform.value}
                    className="text-white"
                  >
                    <div className="flex items-center">
                      {typeof platform.icon === "function" ? (
                        platform.icon()
                      ) : (
                        <platform.icon className="mr-2 h-4 w-4" />
                      )}
                      {platform.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Textarea
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={`Enter your ${selectedPlatform} profile link...`}
              className="min-h-[100px] bg-transparent border-0 text-white text-lg placeholder:text-zinc-600 focus-visible:ring-0 resize-none p-0"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <span className="text-zinc-600 text-sm">
                {socials.length} social(s) added
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={handleAddAnother}
                  disabled={!link}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 rounded-lg disabled:opacity-50"
                >
                  Add Another
                </Button>
                <Button
                  type="submit"
                  disabled={!link}
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
  );
}
