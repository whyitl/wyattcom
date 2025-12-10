"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { MatrixTerminal } from "./matrix-terminal"
import { BlockGame } from "./block-game"

export interface Window {
  id: string
  title: string
  content: string
  fileName: string
  x: number
  y: number
  zIndex: number
  isClosing?: boolean
}

interface FloatingWindowProps {
  window: Window
  onClose: (id: string) => void
  onFocus: (id: string) => void
  onPositionChange?: (id: string, x: number, y: number) => void
}

const getFileContent = (fileName: string, fileType: string): string => {
  const contentMap: Record<string, string> = {
    "about.md": `# About Me

I'm a finance student and founder of TUCN Media in Calgary, leveraging a blend of data-driven strategy and technical expertise to drive growth through web development, branding, and advertising.`,
    "instagram.txt": `Instagram


https://www.instagram.com/wya.ttt`,
    "linkedin.txt": `LinkedIn

Professional Profile

Connect with me on LinkedIn to stay updated on 
my professional journey and industry insights.

https://www.linkedin.com/in/wyattlain/`,
    "email-me.txt": `Email Me

Let's Connect

I'm always interested in interesting projects 
and collaborations. Feel free to reach out!

Email: contact@wyattlain.com
Response time: Usually within 48 hours`,
    "tucn-media.txt": `TUCN Media

Digital Solutions

TUCN Media is a digital agency specializing in web development, design, and digital strategy.

Website: https://tucnmedia.com
Services: Development, Design, Strategy`,
    "corrupted.dat": "", // Special handling for corrupted file
  }

  // Random 404 messages for files without content
  const error404Messages = [
    "404: This page has been erased by the Death Note",
    "404: Press F to pay respects to this missing file",
    "404: Stack Overflow couldn't solve this one either",
    "404: ROI on this page: -100%. Divest immediately"
  ];
  
  const randomMessage = error404Messages[Math.floor(Math.random() * error404Messages.length)];

  return contentMap[fileName] || `// ${fileName}\n\n${randomMessage}`
}

const isCorruptedFile = (fileName: string): boolean => {
  return fileName === "corrupted.dat"
}

const isBlockGameFile = (fileName: string): boolean => {
  return fileName === "block-game.game"
}

export function FloatingWindow({ window, onClose, onFocus, onPositionChange }: FloatingWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: window.x, y: window.y })
  const windowRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const content = getFileContent(window.fileName, "")

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      setPosition({ x: newX, y: newY })
      onPositionChange?.(window.id, newX, newY)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragOffset, window.id, onPositionChange])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!headerRef.current?.contains(e.currentTarget)) return
    
    onFocus(window.id)
    setIsDragging(true)
    
    const rect = windowRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const isCorrupted = isCorruptedFile(window.fileName)
  const isBlockGame = isBlockGameFile(window.fileName)

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "absolute bg-white border border-border rounded-lg shadow-2xl overflow-hidden",
        isBlockGame ? "w-auto max-w-full" : "w-[calc(100vw-2rem)] sm:w-96 max-w-96"
      )}
      style={{
        zIndex: window.zIndex,
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(0, 0)",
      }}
      onClick={() => onFocus(window.id)}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 border-b border-border cursor-move hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100 transition-all select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">{window.title}</span>
          {window.fileName && (
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-gray-200 rounded">
              {window.fileName}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose(window.id)
          }}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-gray-200 rounded"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="2" y1="2" x2="14" y2="14" />
            <line x1="14" y1="2" x2="2" y2="14" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className={cn(
        isBlockGame ? "p-0" : "h-64 sm:h-96 overflow-auto",
        isCorrupted || isBlockGame ? "p-0" : "p-4 bg-gray-50"
      )}>
        {isCorrupted ? (
          <MatrixTerminal />
        ) : isBlockGame ? (
          <BlockGame />
        ) : (
          <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-words">
            {content.split('\n').map((line, idx) => {
              const urlRegex = /(https?:\/\/[^\s]+)/g
              const parts = line.split(urlRegex)
              return (
                <div key={idx}>
                  {parts.map((part, i) => 
                    urlRegex.test(part) ? (
                      <a 
                        key={i}
                        href={part} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {part}
                      </a>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
              )
            })}
          </pre>
        )}
      </div>
    </motion.div>
  )
}

