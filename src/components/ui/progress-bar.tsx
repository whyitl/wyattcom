"use client"

import React from "react"

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <span className="text-sm font-medium text-muted-foreground">
        Exploration Progress: <span className="font-mono font-semibold text-foreground">{current}/{total}</span>
      </span>
    </div>
  )
}


