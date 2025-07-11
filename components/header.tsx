"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Wallet, ChevronDown, Coins, TrendingUp, Trophy, Info, MessageCircle, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { setBalance } from "@/utils/setBalance"

interface HeaderProps {
  isWalletConnected: boolean
  setIsWalletConnected: (connected: boolean) => void
  selectedNetwork: string
  setSelectedNetwork: (network: string) => void
  balance: string
  activeTab: string
  setActiveTab: (tab: string) => void
  walletAddress: string
  setWalletAddress: (address: string) => void
  setIsCommentsSidebarOpen: (open: boolean) => void
}

const networks = [
  { id: "celo", name: "CELO", color: "text-yellow-600", symbol: "CELO", chainId: 42220 },
  { id: "lisk", name: "LISK", color: "text-gray-500", symbol: "LSK", chainId: 1135 },
]

const walletOptions = [
  { name: "MetaMask", icon: "🦊" },
  { name: "OKX", icon: "⛌" },
]

export function Header({
  isWalletConnected,
  setIsWalletConnected,
  selectedNetwork,
  setSelectedNetwork,
  balance,
  activeTab,
  setActiveTab,
  walletAddress,
  setWalletAddress,
  setIsCommentsSidebarOpen,
}: HeaderProps) {
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  const { theme, setTheme } = useTheme()

  const connectWallet = (walletType: string) => {
    setIsWalletConnected(true)
    setWalletAddress("0x1234...5678")
    const network = networks.find((n) => n.id === selectedNetwork)
    setBalance(network?.symbol === "ETH" ? "2.45" : network?.symbol === "BNB" ? "15.8" : "1250.00")
    setShowWalletOptions(false)
  }

  const tabs = [
    { id: "game", label: "Game", icon: Coins },
    { id: "history", label: "History", icon: TrendingUp },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "about", label: "About", icon: Info },
  ]

  const selectedNetworkData = networks.find((n) => n.id === selectedNetwork)

  return (
    <header className="border-b border-gold bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gold-gradient rounded-full flex items-center justify-center animate-pulse-gold">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gold-gradient">Golden Flip</span>
            </div>

            {/* Comments Toggle Button */}
            <Button
              onClick={() => setIsCommentsSidebarOpen(true)}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10 flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
            </Button>

            <nav className="hidden md:flex space-x-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${activeTab === tab.id
                      ? "bg-gold/20 text-gold border border-gold shadow-lg shadow-gold/20"
                      : "text-muted-foreground hover:text-gold hover:bg-muted/50"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="border-gold text-gold hover:bg-gold/10"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <SelectTrigger className="w-44 bg-card/50 border-gold text-foreground">
                <div className="flex items-center space-x-2">
                  <span className={selectedNetworkData?.color}>●</span>
                  <span>{selectedNetworkData?.name}</span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-card border border-gold">
                {networks.map((network) => (
                  <SelectItem key={network.id} value={network.id} className="text-foreground hover:bg-muted">
                    <div className="flex items-center space-x-2">
                      <span className={network.color}>●</span>
                      <span>{network.name}</span>
                      <span className="text-xs text-muted-foreground">({network.symbol})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isWalletConnected ? (
              <div className="flex items-center space-x-3 bg-card/50 border border-gold rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gold font-semibold">
                  {balance} {selectedNetworkData?.symbol}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{walletAddress}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsWalletConnected(false)
                    setWalletAddress("")
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Button
                  onClick={() => setShowWalletOptions(!showWalletOptions)}
                  className="bg-gold-gradient hover:opacity-90 text-white font-semibold px-6 py-2 rounded-lg shadow-lg shadow-gold/25"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>

                {showWalletOptions && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-gold rounded-lg shadow-xl z-50">
                    {walletOptions.map((wallet) => (
                      <button
                        key={wallet.name}
                        onClick={() => connectWallet(wallet.name)}
                        className="w-full text-left px-4 py-3 text-foreground hover:bg-muted first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center space-x-3"
                      >
                        <span className="text-lg">{wallet.icon}</span>
                        <span>{wallet.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${activeTab === tab.id
                  ? "bg-gold/20 text-gold border border-gold"
                  : "text-muted-foreground hover:text-gold hover:bg-muted/50"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
