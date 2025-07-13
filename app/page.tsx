"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { GameInterface } from "@/components/game-interface"
import { StatsPanel } from "@/components/stats-panel"
import { AnimatedBackground } from "@/components/animated-background"
import { GameHistory } from "@/components/game-history"
import { Leaderboard } from "@/components/leaderboard"
import { CommentsSidebar } from "@/components/comments-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { useAccount, useBalance } from "wagmi"
import { useChainId } from 'wagmi'


export default function Home() {
  const
    // 
    [activeTab, setActiveTab] = useState("game")
    , [isWalletConnected, setIsWalletConnected] = useState(false)
    , [selectedNetwork, setSelectedNetwork] = useState("lisk")
    , [chainID, setChainID] = useState<number>()
    , { address } = useAccount()
    , _balance = useBalance({
      address: address,
      chainId: chainID,
      token: undefined,
    }).data?.formatted
    , [balance, setBalance] = useState(String(Number(_balance).toFixed(5)))
    , [walletAddress, setWalletAddress] = useState("")
    , [isCommentsSidebarOpen, setIsCommentsSidebarOpen] = useState(false);

  useEffect(() => {
    // @ts-ignore
    console.table(_balance, selectedNetwork, chainID)
  }, [selectedNetwork, chainID])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="golden-flip-theme">
      <div className="h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground relative overflow-hidden transition-colors duration-300 flex flex-col">
        <AnimatedBackground />

        {/* Comments Sidebar */}
        <CommentsSidebar
          isOpen={isCommentsSidebarOpen}
          setIsOpen={setIsCommentsSidebarOpen}
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
        />

        <div className="relative z-10 flex flex-col h-full">
          <Header
            isWalletConnected={isWalletConnected}
            setIsWalletConnected={setIsWalletConnected}
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
            setChainID={setChainID}
            balance={balance}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            setIsCommentsSidebarOpen={setIsCommentsSidebarOpen}
          />

          <main className="flex-1 container mx-auto px-4 py-4 overflow-hidden">
            {activeTab === "game" && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gold-gradient">HEADS UP</h1>
                  <p className="text-sm md:text-lg text-muted-foreground mb-1">Where Fortune Favors the Bold</p>
                  <p className="text-sm text-gold font-semibold">Double Your Crypto • Provably Fair • Multi-Chain</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-280px)]">
                  <div className="lg:col-span-2">
                    <GameInterface
                      isWalletConnected={isWalletConnected}
                      selectedNetwork={selectedNetwork}
                      balance={balance}
                      setBalance={setBalance}
                    />
                  </div>
                  <div className="h-full">
                    <StatsPanel />
                  </div>
                </div>
              </>
            )}

            {activeTab === "history" && (
              <div className="h-full overflow-y-auto">
                <GameHistory />
              </div>
            )}

            {activeTab === "leaderboard" && (
              <div className="h-full overflow-y-auto">
                <Leaderboard />
              </div>
            )}

            {activeTab === "about" && (
              <div className="max-w-4xl mx-auto h-full overflow-y-auto">
                <div className="bg-card/50 backdrop-blur-sm border border-gold rounded-2xl p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gold">About Golden Flip</h2>
                  <div className="space-y-3 text-muted-foreground text-sm">
                    <p>
                      Golden Flip is the most trusted Web3 coin flip platform, offering provably fair 50/50 games across
                      multiple EVM networks with golden opportunities for every player.
                    </p>
                    <h3 className="text-lg font-semibold text-foreground">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Provably fair gaming with blockchain transparency</li>
                      <li>Support for ETH, USDC, USDT, DAI, WBTC and 50+ tokens</li>
                      <li>Multi-chain support: Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche</li>
                      <li>Instant payouts with 1.95x multiplier</li>
                      <li>Professional security and anti-bot protection</li>
                      <li>Community-driven with integrated chat system</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
