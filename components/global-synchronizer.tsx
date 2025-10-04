"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface GlobalSynchronizerProps {
  stage: "active" | "finale"
}

export function GlobalSynchronizer({ stage }: GlobalSynchronizerProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(false)
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [stage])

  const nodes = 6

  return (
    <div className="relative w-full max-w-[500px] h-full max-h-[500px] mx-auto flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Central Synchronizer */}
        <div
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000",
            animated && "scale-100 opacity-100",
            !animated && "scale-0 opacity-0",
          )}
        >
          <div className="relative">
            {/* Outer ring */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-primary animate-pulse" />

            {/* Middle ring */}
            <div
              className="absolute inset-3 rounded-full border-4 border-accent animate-pulse"
              style={{ animationDelay: "0.3s" }}
            />

            {/* Inner core */}
            <div
              className="absolute inset-6 rounded-full bg-primary flex items-center justify-center animate-pulse"
              style={{ animationDelay: "0.6s" }}
            >
              <svg
                className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>

            {stage === "finale" && (
              <>
                <div className="absolute -inset-6 rounded-full border-2 border-primary/30 animate-ping" />
                <div
                  className="absolute -inset-8 rounded-full border-2 border-accent/20 animate-ping"
                  style={{ animationDelay: "0.5s" }}
                />
              </>
            )}
          </div>
        </div>

        {/* Network nodes */}
        {Array.from({ length: nodes }).map((_, i) => {
          const angle = (i * 360) / nodes
          const radius = 42
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180)

          return (
            <div
              key={i}
              className={cn(
                "absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center transition-all duration-700 delay-[var(--delay)]",
                animated && "scale-100 opacity-100",
                !animated && "scale-0 opacity-0",
              )}
              style={
                {
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  "--delay": `${i * 100}ms`,
                } as React.CSSProperties
              }
            >
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary animate-pulse" />
            </div>
          )
        })}

        {/* Connection lines with pulse effect */}
        {animated && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {Array.from({ length: nodes }).map((_, i) => {
              const angle = (i * 360) / nodes
              const radius = 42
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180)

              return (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="oklch(0.65 0.15 195)"
                  strokeWidth="2"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${i * 150}ms`,
                  }}
                />
              )
            })}
          </svg>
        )}

        {stage === "finale" && (
          <div
            className={cn(
              "absolute -bottom-16 left-1/2 -translate-x-1/2 text-center transition-all duration-1000 delay-1000",
              animated && "opacity-100 translate-y-0",
              !animated && "opacity-0 translate-y-4",
            )}
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/20 border border-primary">
              <span className="text-xs md:text-sm font-semibold text-primary">7Trust × Canton Network</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
