"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
  type: string
  color: string
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const { theme } = useTheme()

  const symbols = ["₿", "Ξ", "◊", "$", "€", "¥", "♦", "●", "▲", "■", "🪙", "💰", "👑", "💎"]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 12000))

      // Define colors based on theme
      const colors =
        theme === "light"
          ? [
              "hsl(45, 100%, 35%)", // Dark gold
              "hsl(45, 100%, 25%)", // Darker gold
              "hsl(0, 0%, 20%)", // Dark gray
              "hsl(0, 0%, 30%)", // Medium gray
              "hsl(45, 100%, 40%)", // Gold
              "hsl(0, 0%, 15%)", // Very dark gray
            ]
          : [
              "hsl(45, 100%, 45%)", // Gold
              "hsl(45, 100%, 55%)", // Light gold
              "hsl(0, 0%, 80%)", // Light gray
              "hsl(0, 0%, 70%)", // Medium gray
              "hsl(45, 100%, 35%)", // Dark gold
              "hsl(0, 0%, 90%)", // Very light gray
            ]

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 25 + 15,
          opacity: Math.random() * 0.4 + 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          type: symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }

      particlesRef.current = particles
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        // Add subtle floating effect
        particle.y += Math.sin(Date.now() * 0.001 + index) * 0.2

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50

        // Draw particle with glow effect
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)

        // Add glow effect
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 15
        ctx.globalAlpha = particle.opacity

        // Draw the symbol
        ctx.fillStyle = particle.color
        ctx.font = `${particle.size}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(particle.type, 0, 0)

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme]) // Re-run when theme changes

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />
}
