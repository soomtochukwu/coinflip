"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Coins, Zap, Globe } from "lucide-react"

export function StatsPanel() {
  const recentGames = [
    {
      id: 1,
      player: "0x1234...5678",
      bet: "0.5 ETH",
      result: "WIN",
      payout: "0.975 ETH",
      side: "heads",
      network: "Ethereum",
    },
    { id: 2, player: "0x8765...4321", bet: "1.2 USDC", result: "LOSE", payout: "0", side: "tails", network: "Polygon" },
    {
      id: 3,
      player: "0x9876...1234",
      bet: "0.1 ETH",
      result: "WIN",
      payout: "0.195 ETH",
      side: "heads",
      network: "Arbitrum",
    },
    { id: 4, player: "0x4567...8901", bet: "2.0 USDT", result: "LOSE", payout: "0", side: "tails", network: "BSC" },
    {
      id: 5,
      player: "0x2345...6789",
      bet: "0.8 ETH",
      result: "WIN",
      payout: "1.56 ETH",
      side: "tails",
      network: "Base",
    },
  ]

  const stats = [
    { label: "Total Volume", value: "1,234.5 ETH", icon: Coins, color: "text-gold" },
    { label: "Active Players", value: "2,847", icon: Users, color: "text-green-500" },
    { label: "Games Played", value: "45,123", icon: Zap, color: "text-gold" },
    { label: "Networks", value: "7 Chains", icon: Globe, color: "text-green-500" },
  ]

  const networkColors = {
    Ethereum: "text-blue-500",
    Polygon: "text-purple-500",
    Arbitrum: "text-cyan-500",
    BSC: "text-yellow-500",
    Base: "text-blue-600",
    Optimism: "text-red-500",
    Avalanche: "text-red-600",
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Live Stats - Compact */}
      <Card className="bg-card/50 backdrop-blur-sm border-gold">
        <CardHeader className="pb-2">
          <CardTitle className="text-gold flex items-center space-x-2 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Live Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
                  <div className={`text-sm font-semibold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Games - Compact */}
      <Card className="bg-card/50 backdrop-blur-sm border-gold flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-gold flex items-center space-x-2 text-sm">
            <Zap className="w-4 h-4" />
            <span>Recent Games</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 h-full overflow-y-auto">
          <div className="space-y-2">
            {recentGames.map((game) => (
              <div key={game.id} className="bg-muted/30 rounded-lg p-2 border border-gold/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground font-mono">{game.player}</span>
                  <span
                    className={`text-xs font-semibold px-1 py-0.5 rounded ${
                      game.result === "WIN" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {game.result}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">
                    {game.bet} • {game.side === "heads" ? "👑" : "💰"}
                  </span>
                  <span className={`text-xs ${networkColors[game.network as keyof typeof networkColors]}`}>
                    {game.network}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Supported Networks - Compact */}
      <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-500 text-sm flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Networks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="flex items-center space-x-1">
              <span className="text-blue-500">●</span>
              <span className="text-foreground">Ethereum</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-purple-500">●</span>
              <span className="text-foreground">Polygon</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-cyan-500">●</span>
              <span className="text-foreground">Arbitrum</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-red-500">●</span>
              <span className="text-foreground">Optimism</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-blue-600">●</span>
              <span className="text-foreground">Base</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">●</span>
              <span className="text-foreground">BSC</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
