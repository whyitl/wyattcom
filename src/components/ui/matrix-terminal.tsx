"use client"

import React, { useState, useEffect, useRef } from "react"

interface MatrixTerminalProps {
  className?: string
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`"
const TERMINAL_LINES = [
  "SYSTEM ERROR: Memory corruption detected...",
  "WARNING: Unexpected data stream...",
  "Attempting to reconstruct file...",
  "ERROR: Invalid pointer at 0x7F3A8C2D",
  "CRITICAL: Stack overflow imminent",
  "Segmentation fault (core dumped)",
  "FATAL: Unable to allocate memory",
  "Kernel panic - not syncing: VFS",
  "ERROR: File system integrity compromised",
  "WARNING: Anomalous pattern detected",
  "CRITICAL: Security breach detected",
  "ERROR: Access violation at address",
  "SYSTEM: Initiating emergency shutdown",
  "WARNING: Temperature exceeding limits",
  "ERROR: Hardware failure detected",
]

export function MatrixTerminal({ className }: MatrixTerminalProps) {
  const [terminalText, setTerminalText] = useState<string[]>([])
  const [matrixColumns, setMatrixColumns] = useState<Array<{ char: string; y: number; speed: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lineIndexRef = useRef(0)

  // Terminal text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalText(prev => {
        if (prev.length >= 12) {
          return [...prev.slice(1), TERMINAL_LINES[lineIndexRef.current % TERMINAL_LINES.length]]
        }
        const newLine = TERMINAL_LINES[lineIndexRef.current % TERMINAL_LINES.length]
        lineIndexRef.current++
        return [...prev, newLine]
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // Matrix rain animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const columns = Math.floor(canvas.width / 20)
    const drops: Array<{ y: number; speed: number }> = []

    for (let i = 0; i < columns; i++) {
      drops.push({ y: Math.random() * canvas.height, speed: 1 + Math.random() * 2 })
    }

    let animationId: number

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0F0"
      ctx.font = "15px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        ctx.fillText(text, i * 20, drops[i].y)

        if (drops[i].y > canvas.height && Math.random() > 0.975) {
          drops[i].y = 0
        }

        drops[i].y += drops[i].speed
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      {/* Matrix rain background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Terminal text overlay */}
      <div className="relative z-10 p-4 h-full overflow-auto font-mono text-xs">
        <div className="space-y-1">
          <div className="text-red-500 font-bold mb-2 text-sm animate-pulse">
            ⚠️ CORRUPTED FILE DETECTED ⚠️
          </div>
          {terminalText.map((line, idx) => (
            <div
              key={idx}
              className="text-green-400 opacity-90"
              style={{
                animation: `glitch 0.3s infinite ${idx * 0.1}s`,
              }}
            >
              <span className="text-gray-500">[{new Date().toISOString().split('T')[1].split('.')[0]}]</span>{" "}
              {line}
            </div>
          ))}
          <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  )
}


