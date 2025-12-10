"use client"

import React, { useState, useEffect } from "react"

export function TimeDisplay() {
  const [time, setTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, '0')
    return `${hoursStr}:${minutes}:${seconds} ${ampm}`
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }
    return date.toLocaleDateString('en-US', options)
  }

  if (!mounted || !time) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm border border-border/50 rounded-lg px-2 py-1 shadow-lg">
        <div className="flex flex-col items-end gap-0.5">
          <div className="text-xs md:text-lg font-mono font-semibold text-foreground tabular-nums">
            --:--:--
          </div>
          <div className="text-xs text-muted-foreground font-medium hidden md:block">
            Loading...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm border border-border/50 rounded-lg px-2 py-1 shadow-lg">
      <div className="flex flex-col items-end gap-0.5">
        <div className="text-xs md:text-lg font-mono font-semibold text-foreground tabular-nums">
          {formatTime(time)}
        </div>
        <div className="text-xs text-muted-foreground font-medium hidden md:block">
          {formatDate(time)}
        </div>
      </div>
    </div>
  )
}
