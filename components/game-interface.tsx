"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Zap, Shield, Coins, Plus, Minus } from "lucide-react"

interface GameInterfaceProps {
  isWalletConnected: boolean
  selectedNetwork: string
  balance: string
  setBalance: (balance: string) => void
}

const assetsByNetwork = {
  ethereum: [
    { symbol: "ETH", name: "Ethereum", balance: "2.45", icon: "Ξ", min: 0.001, max: 10 },
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00", icon: "💵", min: 1, max: 5000 },
    { symbol: "USDT", name: "Tether", balance: "890.50", icon: "💰", min: 1, max: 5000 },
    { symbol: "DAI", name: "Dai", balance: "500.00", icon: "🏛️", min: 1, max: 2000 },
  ],
  polygon: [
    { symbol: "MATIC", name: "Polygon", balance: "850.00", icon: "🔷", min: 1, max: 1000 },
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00", icon: "💵", min: 1, max: 5000 },
    { symbol: "USDT", name: "Tether", balance: "890.50", icon: "💰", min: 1, max: 5000 },
  ],
  arbitrum: [
    { symbol: "ETH", name: "Ethereum", balance: "2.45", icon: "Ξ", min: 0.001, max: 10 },
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00", icon: "💵", min: 1, max: 5000 },
    { symbol: "ARB", name: "Arbitrum", balance: "450.00", icon: "🔵", min: 1, max: 1000 },
  ],
  optimism: [
    { symbol: "ETH", name: "Ethereum", balance: "2.45", icon: "Ξ", min: 0.001, max: 10 },
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00", icon: "💵", min: 1, max: 5000 },
    { symbol: "OP", name: "Optimism", balance: "320.50", icon: "🔴", min: 1, max: 500 },
  ],
  base: [
    { symbol: "ETH", name: "Ethereum", balance: "2.45", icon: "Ξ", min: 0.001, max: 10 },
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00", icon: "💵", min: 1, max: 5000 },
  ],
  bsc: [
    { symbol: "BNB", name: "BNB", balance: "15.80", icon: "🟡", min: 0.01, max: 50 },
    { symbol: "USDT", name: "Tether", balance: "890.50", icon: "💰", min: 1, max: 5000 },
  ],
  avalanche: [
    { symbol: "AVAX", name: "Avalanche", balance: "45.20", icon: "🔺", min: 0.1, max: 100 },
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00", icon: "💵", min: 1, max: 5000 },
  ],
}

export function GameInterface({ isWalletConnected, selectedNetwork, balance, setBalance }: GameInterfaceProps) {
  const [selectedSide, setSelectedSide] = useState<"heads" | "tails" | null>(null)
  const [betAmount, setBetAmount] = useState(0.1)
  const [selectedAsset, setSelectedAsset] = useState("ETH")
  const [isFlipping, setIsFlipping] = useState(false)
  const [lastResult, setLastResult] = useState<"heads" | "tails" | null>(null)
  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null)
  const [coinRotation, setCoinRotation] = useState(0)

  const currentAssets = assetsByNetwork[selectedNetwork as keyof typeof assetsByNetwork] || assetsByNetwork.ethereum
  const selectedAssetData = currentAssets.find((asset) => asset.symbol === selectedAsset) || currentAssets[0]

  const flipCoin = async () => {
    if (!isWalletConnected || !selectedSide || isFlipping) return

    setIsFlipping(true)
    setGameResult(null)

    // Animate coin flip
    const flipDuration = 2000
    const rotations = 10 + Math.random() * 10
    setCoinRotation((prev) => prev + rotations * 180)

    setTimeout(() => {
      const result = Math.random() < 0.5 ? "heads" : "tails"
      setLastResult(result)

      const won = result === selectedSide
      setGameResult(won ? "win" : "lose")

      if (won) {
        const currentBalance = Number.parseFloat(balance)
        setBalance((currentBalance + betAmount * 0.95).toFixed(selectedAssetData.symbol === "ETH" ? 3 : 2))
      } else {
        const currentBalance = Number.parseFloat(balance)
        setBalance(Math.max(0, currentBalance - betAmount).toFixed(selectedAssetData.symbol === "ETH" ? 3 : 2))
      }

      setIsFlipping(false)
    }, flipDuration)
  }

  const adjustBetAmount = (increment: boolean) => {
    const step = selectedAssetData.symbol === "ETH" ? 0.001 : selectedAssetData.symbol.includes("USD") ? 1 : 0.1
    const newAmount = increment ? betAmount + step : betAmount - step
    const clampedAmount = Math.max(selectedAssetData.min, Math.min(selectedAssetData.max, newAmount))
    setBetAmount(Number(clampedAmount.toFixed(selectedAssetData.symbol === "ETH" ? 3 : 2)))
  }

  const handleSliderChange = (value: number[]) => {
    setBetAmount(value[0])
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold shadow-2xl shadow-gold/10 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Coin Animation - Compact */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className={`w-24 h-24 rounded-full border-4 border-gold bg-gold-gradient flex items-center justify-center text-2xl font-bold text-white transition-transform duration-2000 ease-out shadow-lg shadow-gold/30 animate-pulse-gold ${isFlipping ? "animate-spin" : ""}`}
              style={{ transform: `rotateY(${coinRotation}deg)` }}
            >
              {lastResult === "heads" ? "👑" : lastResult === "tails" ? "💰" : "?"}
            </div>
            {gameResult && (
              <div
                className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm ${gameResult === "win" ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
              >
                {gameResult === "win" ? "🎉" : "😔"}
              </div>
            )}
          </div>
        </div>

        {/* Side Selection - Compact */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            variant={selectedSide === "heads" ? "default" : "outline"}
            onClick={() => setSelectedSide("heads")}
            className={`h-12 text-sm font-semibold transition-all ${
              selectedSide === "heads"
                ? "bg-gold-gradient text-white shadow-lg shadow-gold/25"
                : "border-gold text-gold hover:bg-gold/10"
            }`}
            disabled={isFlipping}
          >
            👑 HEADS
          </Button>
          <Button
            variant={selectedSide === "tails" ? "default" : "outline"}
            onClick={() => setSelectedSide("tails")}
            className={`h-12 text-sm font-semibold transition-all ${
              selectedSide === "tails"
                ? "bg-gold-gradient text-white shadow-lg shadow-gold/25"
                : "border-gold text-gold hover:bg-gold/10"
            }`}
            disabled={isFlipping}
          >
            💰 TAILS
          </Button>
        </div>

        {/* Asset Selection - Compact */}
        <div className="mb-4">
          <Select value={selectedAsset} onValueChange={setSelectedAsset} disabled={isFlipping}>
            <SelectTrigger className="bg-card/50 border-gold text-foreground h-10">
              <div className="flex items-center space-x-2">
                <span className="text-sm">{selectedAssetData?.icon}</span>
                <span className="text-sm">{selectedAssetData?.symbol}</span>
                <span className="text-xs text-muted-foreground">Bal: {selectedAssetData?.balance}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card border-gold">
              {currentAssets.map((asset) => (
                <SelectItem key={asset.symbol} value={asset.symbol} className="text-foreground hover:bg-muted">
                  <div className="flex items-center space-x-2">
                    <span>{asset.icon}</span>
                    <span>{asset.symbol}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bet Amount with Range Slider and +/- Buttons */}
        <div className="space-y-3 mb-4 flex-1">
          <label className="text-sm font-medium text-muted-foreground">Bet Amount</label>

          {/* Amount Display and +/- Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustBetAmount(false)}
              disabled={isFlipping || betAmount <= selectedAssetData.min}
              className="border-gold text-gold hover:bg-gold/10 h-8 w-8 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>

            <div className="flex-1 text-center">
              <div className="text-lg font-bold text-gold">
                {betAmount.toFixed(selectedAssetData.symbol === "ETH" ? 3 : 2)} {selectedAsset}
              </div>
              <div className="text-xs text-muted-foreground">
                Min: {selectedAssetData.min} • Max: {selectedAssetData.max}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustBetAmount(true)}
              disabled={isFlipping || betAmount >= selectedAssetData.max}
              className="border-gold text-gold hover:bg-gold/10 h-8 w-8 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {/* Range Slider */}
          <div className="px-2">
            <Slider
              value={[betAmount]}
              onValueChange={handleSliderChange}
              min={selectedAssetData.min}
              max={selectedAssetData.max}
              step={selectedAssetData.symbol === "ETH" ? 0.001 : selectedAssetData.symbol.includes("USD") ? 1 : 0.1}
              disabled={isFlipping}
              className="w-full"
            />
          </div>

          {/* Potential Payout - Compact */}
          <div className="bg-muted/30 rounded-lg p-3 border border-gold/20">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Win Amount:</span>
              <span className="font-bold text-green-500">
                {(betAmount * 1.95).toFixed(selectedAssetData.symbol === "ETH" ? 3 : 2)} {selectedAsset}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-muted-foreground">Multiplier: 1.95x</span>
              <span className="text-red-500">House Edge: 2.5%</span>
            </div>
          </div>
        </div>

        {/* Flip Button */}
        <Button
          onClick={flipCoin}
          disabled={!isWalletConnected || !selectedSide || isFlipping || betAmount <= 0}
          className="w-full h-12 text-lg font-bold bg-gold-gradient hover:opacity-90 disabled:opacity-50 shadow-lg shadow-gold/25 transition-all text-white mb-4"
        >
          {isFlipping ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>FLIPPING...</span>
            </div>
          ) : !isWalletConnected ? (
            "CONNECT WALLET"
          ) : !selectedSide ? (
            "SELECT HEADS OR TAILS"
          ) : (
            <>
              <Coins className="w-4 h-4 mr-2" />
              FLIP COIN
            </>
          )}
        </Button>

        {/* Game Result - Compact */}
        {gameResult && (
          <div
            className={`p-3 rounded-lg text-center font-bold text-sm border-2 ${
              gameResult === "win"
                ? "bg-green-500/20 text-green-500 border-green-500/30"
                : "bg-red-500/20 text-red-500 border-red-500/30"
            }`}
          >
            {gameResult === "win" ? "🎉 GOLDEN WIN! 🎉" : "😔 Try Again"}
            <div className="text-xs mt-1 opacity-80">
              {lastResult === "heads" ? "👑" : "💰"} {lastResult?.toUpperCase()} • You picked:{" "}
              {selectedSide?.toUpperCase()}
            </div>
          </div>
        )}

        {/* Features - Compact */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-muted/30 rounded-lg p-2 text-center border border-gold/20">
            <Shield className="w-4 h-4 text-gold mx-auto mb-1" />
            <div className="text-xs font-semibold text-foreground">Provably Fair</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-2 text-center border border-green-500/20">
            <Zap className="w-4 h-4 text-green-500 mx-auto mb-1" />
            <div className="text-xs font-semibold text-foreground">Instant Payouts</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-2 text-center border border-gold/20">
            <TrendingUp className="w-4 h-4 text-gold mx-auto mb-1" />
            <div className="text-xs font-semibold text-foreground">50/50 Odds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
