"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, calculateTradePercentages } from "@/lib/utils";
import { getLeaderboardData, addUserData } from "./data/leaderboard-data";
import { Twitter, MessageCircle } from "lucide-react";
import { SocialLinks } from "./components/social-links";
import { Badge } from "./components/badge";
import { AddSocialsModal } from "./components/add-social-modal";
import { PublicKey } from "@solana/web3.js";
import { Switch } from "@/components/ui/switch";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";
interface ConnectOpts {
  onlyIfTrusted: boolean;
}
interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  isPhantom: boolean;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

export default function Leaderboard() {
  const [isInitialCheckComplete, setIsInitialCheckComplete] = useState(false);
  const { topTraders, rankedTraders } = getLeaderboardData();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showSocialsModal, setShowSocialsModal] = useState(false);
  const [userSocials, setUserSocials] = useState<string[]>([]);
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [pubKey, setPubKey] = useState<PublicKey | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [nonce, setNonce] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [fingerprint] = useState<string>("test-fingerprint-123");
  const [isListed, setIsListed] = useState(false);

  const handleToggleListed = (newIsListed: boolean) => {
    setIsListed(newIsListed);
    const walletAddress = pubKey?.toBase58();
    if (walletAddress) {
      if (newIsListed) {
        addUserData(walletAddress, userSocials);
      } else {
        // removeUserData(walletAddress);
      }
    }
  };

  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window as Window & { solana?: PhantomProvider };
      if (solWindow.solana?.isPhantom) {
        const phantomProvider = solWindow.solana;
        setProvider(phantomProvider);
        // Check if already connected
        phantomProvider
          .connect({ onlyIfTrusted: true })
          .then(({ publicKey }) => {
            setIsWalletConnected(true);
            setPubKey(publicKey);
          })
          .catch(() => {}) // Ignore errors if not connected
          .finally(() => setIsInitialCheckComplete(true)); // Update check status
      } else {
        setIsInitialCheckComplete(true);
      }
    } else {
      setIsInitialCheckComplete(true);
    }
  }, []);

  useEffect(() => {
    if (!provider) return;

    const handleConnect = (publicKey: PublicKey) => {
      setIsWalletConnected(true);
      setPubKey(publicKey);
    };

    const handleDisconnect = () => {
      setIsWalletConnected(false);
      setPubKey(null);
    };

    provider.on("connect", handleConnect);
    provider.on("disconnect", handleDisconnect);

    return () => {
      provider.off("connect", handleConnect);
      provider.off("disconnect", handleDisconnect);
    };
  }, [provider]);

  const handleConnectWallet = async () => {
    if (!provider) {
      alert("Please install Phantom Wallet!");
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      await provider.connect();
    } catch (error) {
      console.error("Connection error:", error);
      alert("Failed to connect to Phantom Wallet");
    }
  };

  const handleAddSocials = (socials: string[]) => {
    setUserSocials(socials);
    setShowSocialsModal(false);
    const walletAddress = pubKey?.toBase58() || "NOT CONNECTED!";
    addUserData(walletAddress, socials);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white md:p-6">
      <div className="w-full h-px bg-gray-800 mb-6" />
      {/* Header Section */}
      <div className="mx-auto mb-8 flex items-center justify-between mt-8">
        <div className="mx-9">
          <p className="text-gray-400 text-sm">
            Overview the best & most successful wallets
          </p>
          <h1 className="text-xl font-medium">
            Realized <span className="text-emerald-400">PnL</span> Leaderboard
          </h1>
        </div>
        <div className="flex gap-3 mx-6 items-center">
          {!isInitialCheckComplete ? (
            <Button className="bg-[#9D5EF4] text-white" disabled>
              Loading...
            </Button>
          ) : isWalletConnected ? (
            <>
              <div className="flex items-center gap-2 border border-gray-700 rounded-md px-3 py-2">
                <span className="text-gray-400 text-sm">
                  {isListed ? "Listed" : "Not Listed"}
                </span>
                <Switch
                  checked={isListed}
                  onCheckedChange={handleToggleListed}
                  className="data-[state=checked]:bg-emerald-900 data-[state=unchecked]:bg-[#302f2e]"
                />
              </div>
              <Button
                onClick={() => setShowSocialsModal(true)}
                className="bg-[#8B4FE3] hover:bg-[#8B4FE3] text-white"
              >
                {userSocials.length > 0 ? "Edit Socials" : "Add Socials"}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleConnectWallet}
              className="bg-[#9D5EF4] hover:bg-[#8B4FE3] text-white"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-gray-800 mb-6" />

      {/* Tabs */}
      <div className="mx-6 mb-16">
        <Tabs defaultValue="daily">
          <TabsList className="bg-transparent border border-gray-800 rounded-lg p-1">
            <TabsTrigger
              value="daily"
              className="px-4 py-2 rounded-md transition-colors data-[state=active]:bg-gray-800 data-[state=active]:text-white hover:bg-gray-700 hover:text-white"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="px-4 py-2 rounded-md transition-colors data-[state=active]:bg-gray-800 data-[state=active]:text-white hover:bg-gray-700 hover:text-white"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="px-4 py-2 rounded-md transition-colors data-[state=active]:bg-gray-800 data-[state=active]:text-white hover:bg-gray-700 hover:text-white"
            >
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Top Cards */}
      <div className="max-w-6xl mx-auto mt-8 mb-8 perspective-1000">
        <div className="flex justify-center items-start gap-6">
          {topTraders.map((trader, i) => (
            <Card
              key={i}
              className={cn(
                "border-gray-800 relative overflow-visible",
                "transition-all duration-500 ease-out",
                trader.position === "center"
                  ? "z-20 w-[340px] transform scale-[1.03] -translate-y-1 translate-z-[30px] p-5 pb-12 pt-4 bg-[#0F1115] hover:opacity-100 hover:scale-[1.05] hover:translate-z-[40px]"
                  : "z-10 w-[300px] transform scale-95 translate-y-0 translate-z-[-10px] opacity-90 hover:opacity-100 hover:scale-100 hover:translate-z-0 p-6 pt-7 bg-[#0F1115]"
              )}
            >
              {trader.position === "left" && <Badge type="silver" />}
              {trader.position === "center" && <Badge type="gold" />}
              {trader.position === "right" && <Badge type="bronze" />}
              <div
                className={cn(
                  "relative z-10 transition-transform duration-500 flex flex-col items-center text-center",
                  trader.position === "center"
                    ? "transform translateZ(20px) py-1"
                    : "transform translateZ(0px)"
                )}
              >
                <div className="flex flex-col items-center mb-8 mt-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gray-700 rounded-full" />
                    <SocialLinks />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-1 text-white">
                  {trader.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {trader.walletAddress}
                </p>
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  {trader.pnl} ≋
                </div>
                <p className="text-gray-400 mb-6">{trader.value}</p>
                <div className="w-full h-px bg-gray-800 mb-4 relative">
                  <div
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-emerald-500/20 to-transparent"
                    style={{
                      width:
                        trader.position === "center"
                          ? "calc(100% + 2.6rem)"
                          : "calc(100% + 3.1rem)",
                      left:
                        trader.position === "center" ? "-1.3rem" : "-1.5rem",
                    }}
                  />
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-sm text-gray-400">
                      {trader.greenTrades}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full" />
                    <span className="text-sm text-gray-400">
                      {trader.redTrades}
                    </span>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative">
                    {(() => {
                      const { greenPercentage, redPercentage } =
                        calculateTradePercentages(
                          trader.greenTrades,
                          trader.redTrades
                        );
                      return (
                        <>
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-transparent"
                            style={{
                              width: `${greenPercentage}%`,
                              clipPath: `polygon(0 0, 100% 50%, 0 100%, 0 0)`,
                            }}
                          />
                          <div
                            className="absolute top-0 right-0 h-full bg-gradient-to-l from-red-400 to-transparent"
                            style={{
                              width: `${redPercentage}%`,
                              clipPath: `polygon(100% 0, 0 50%, 100% 100%, 100% 0)`,
                            }}
                          />
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
              {trader.position === "center" && (
                <>
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-x-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
                    <div className="absolute inset-x-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-purple-500/10 via-purple-500/5 to-transparent" />
                </>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="w-full h-px bg-gray-800" />
      </div>

      {/* List View */}
      <div className="max-w-6xl mx-auto space-y-2 mb-12">
        {rankedTraders.map((trader, i) => (
          <div
            key={i}
            className="bg-[#0F1115] border border-gray-800 rounded-lg p-4 flex items-center"
          >
            <div className="flex items-center gap-4 w-[50%]">
              <div className="relative">
                <div className="w-12 h-12 bg-gray-700 rounded-full" />
                <div className="absolute -top-2 -left-2 w-7 h-7 bg-[#2A2D3A] rounded-full flex items-center justify-center text-xs font-bold text-gray-300 border-2 border-[#1A1D25]">
                  #{trader.rank}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{trader.name}</h3>
                <div className="flex items-center justify-left gap-4">
                  <p className="text-gray-500 text-sm">
                    {trader.walletAddress}
                  </p>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                      <Twitter className="w-3 h-3 text-gray-400" />
                    </div>
                    <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-800 mx-4" />
            <div className="flex flex-col items-center gap-2 w-[25%]">
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative">
                {(() => {
                  const { greenPercentage, redPercentage } =
                    calculateTradePercentages(
                      trader.greenTrades,
                      trader.redTrades
                    );
                  return (
                    <>
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-transparent"
                        style={{
                          width: `${greenPercentage}%`,
                          clipPath: `polygon(0 0, 100% 50%, 0 100%, 0 0)`,
                        }}
                      />
                      <div
                        className="absolute top-0 right-0 h-full bg-gradient-to-l from-red-400 to-transparent"
                        style={{
                          width: `${redPercentage}%`,
                          clipPath: `polygon(100% 0, 0 50%, 100% 100%, 100% 0)`,
                        }}
                      />
                    </>
                  );
                })()}
              </div>
              <div className="flex justify-between w-full text-xs text-gray-400">
                <span>{trader.greenTrades}</span>
                <span>{trader.redTrades}</span>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-800 mx-4" />
            <div className="w-[25%] text-right">
              <div className="text-emerald-400 font-bold">{trader.pnl} ≋</div>
              <div className="text-gray-400 text-sm">{trader.value}</div>
            </div>
          </div>
        ))}
      </div>

      <AddSocialsModal
        isOpen={showSocialsModal}
        onClose={() => setShowSocialsModal(false)}
        onSubmit={handleAddSocials}
        initialSocials={userSocials}
        walletAddress={pubKey?.toBase58() || "NOT CONNECTED!"}
      />
    </div>
  );
}
