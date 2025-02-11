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
import { X, Twitter, MessageCircle, Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Country {
  name: string;
  code: string;
}

interface AddSocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (socials: string[], nickname: string, country: string) => void;
  initialSocials: string[];
  walletAddress: string;
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
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [link, setLink] = useState("");
  const [nickname, setNickname] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformSearchTerm, setPlatformSearchTerm] = useState("");
  const [socials, setSocials] = useState<string[]>(initialSocials);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        const fetchedCountries: Country[] = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const filteredPlatforms = platforms.filter((p) =>
    p.label.toLowerCase().includes(platformSearchTerm.toLowerCase()) ||
    p.value.toLowerCase().includes(platformSearchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatform && handleValidation(selectedPlatform, link)) {
      const newSocials = [...socials, `${selectedPlatform}:${link}`];
      onSubmit(newSocials, nickname, country);
      setSocials(newSocials);
      setLink("");
      setError("");
    } else {
      setError("Please select a platform and enter a valid URL");
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
            <div>
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

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <p className="text-sm text-gray-400">Nickname</p>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname..."
                className="bg-zinc-800 border-0 text-white placeholder:text-zinc-600 focus-visible:ring-0 p-2 rounded-md"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Country</p>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full bg-zinc-800 border-0 text-white focus:ring-0 [&_svg]:text-white">
                  {country ? (
                    <div className="flex items-center gap-2">
                      {countries.find(c => c.name === country)?.code && (
                        <img
                          src={`https://flagcdn.com/${countries.find(c => c.name === country)?.code.toLowerCase()}.svg`}
                          alt="flag"
                          className="w-5 h-4"
                        />
                      )}
                      <span>{country}</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Select country" />
                  )}
                </SelectTrigger>
                <SelectContent
                  portalled={false}
                  className="bg-zinc-800 border-zinc-700 max-h-60 overflow-auto w-[var(--radix-select-trigger-width)]"
                >
                  <div className="p-2">
                    <div className="flex items-center border border-gray-600 rounded px-2 py-1 mb-2">
                      <Search className="mr-2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={searchTerm}
                        autoFocus
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent outline-none text-white placeholder:text-gray-500 flex-1"
                      />
                    </div>
                  </div>
                  {filteredCountries.map((c) => (
                    <SelectItem
                      key={c.name}
                      value={c.name}
                      className="text-white hover:bg-zinc-700 hover:outline hover:outline-1 hover:outline-white"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/${c.code.toLowerCase()}.svg`}
                          alt={`${c.name} flag`}
                          className="w-5 h-4 object-cover rounded-sm"
                        />
                        <span>{c.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 mb-8">
            <Select
              value={selectedPlatform}
              onValueChange={setSelectedPlatform}
            >
              <SelectTrigger className="w-[200px] border-0 bg-zinc-800/50 text-white focus:ring-0 [&_svg]:text-white">
                <SelectValue placeholder="Select Social Handle" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 transition-none animate-none w-[var(--radix-select-trigger-width)]">
                <div className="p-2">
                  <div className="flex items-center border border-gray-600 rounded px-2 py-1 mb-2">
                    <Search className="mr-2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search platform..."
                      value={platformSearchTerm}
                      autoFocus
                      onChange={(e) => setPlatformSearchTerm(e.target.value)}
                      className="bg-transparent outline-none text-white placeholder:text-gray-500 flex-1"
                    />
                  </div>
                </div>
                {filteredPlatforms.map((platform) => (
                  <SelectItem
                    key={platform.value}
                    value={platform.value}
                    className="text-white hover:bg-zinc-700 hover:outline hover:outline-1 hover:outline-white"
                  >
                    <div className="flex items-center">
                      {typeof platform.icon === "function"
                        ? platform.icon()
                        : <platform.icon className="mr-2 h-4 w-4" />}
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
              placeholder={selectedPlatform ? `Enter your ${selectedPlatform} profile link...` : "Select a platform first"}
              className="min-h-[100px] bg-transparent border-0 text-white text-lg placeholder:text-zinc-600 focus-visible:ring-0 resize-none p-0"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <span className="text-zinc-600 text-sm">
                {socials.length} social(s) added
              </span>
              <Button
                type="submit"
                disabled={!link || !selectedPlatform}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 rounded-lg disabled:opacity-50"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}