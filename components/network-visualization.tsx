"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface NetworkVisualizationProps {
  stage: "entry" | "connected" | "scaling"
}

export function NetworkVisualization({ stage }: NetworkVisualizationProps) {
  const [animated, setAnimated] = useState(false)
  const [showLabels, setShowLabels] = useState(false)

  useEffect(() => {
    setAnimated(false)
    setShowLabels(false)
    const timer = setTimeout(() => setAnimated(true), 100)
    const labelTimer = setTimeout(() => setShowLabels(true), 800)
    return () => {
      clearTimeout(timer)
      clearTimeout(labelTimer)
    }
  }, [stage])

  const nodes = stage === "scaling" ? 8 : 5

  return (
    <div className="relative w-full max-w-[500px] h-[400px] mx-auto flex items-center justify-center px-4">
      <div className="relative w-full h-full max-w-[450px] max-h-[450px]">
        {/* Central network ring */}
        <div
          className={cn(
            "absolute inset-[25%] rounded-full border-4 border-primary/30 transition-all duration-1000",
            animated && "border-primary scale-110",
          )}
        >
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-500 delay-700",
              showLabels ? "opacity-100 scale-100" : "opacity-0 scale-50",
            )}
          >
            <div className="text-center px-2">
              <p className="text-xs md:text-sm font-bold text-primary">Canton Network</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Blockchain</p>
            </div>
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
                "absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center transition-all duration-700 shadow-lg",
                animated && "scale-100 opacity-100",
                !animated && "scale-0 opacity-0",
              )}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary animate-pulse" />
            </div>
          )
        })}

        {/* User/Organization icon */}
        {stage === "entry" && (
          <div
            className={cn(
              "absolute left-[8%] top-1/2 -translate-y-1/2 transition-all duration-1000",
              animated && "translate-x-0 opacity-100",
              !animated && "-translate-x-20 opacity-0",
            )}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-accent border-2 border-accent-foreground flex items-center justify-center relative shadow-lg">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-accent-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <div className="absolute inset-0 rounded-lg border-2 border-accent-foreground animate-ping opacity-20" />
              </div>
              <p className="text-[10px] md:text-xs text-center text-muted-foreground font-semibold whitespace-nowrap">
                Organization
              </p>
            </div>
            {showLabels && (
              <div className="absolute left-full ml-3 top-0 animate-in slide-in-from-left duration-700 delay-500">
                <div className="bg-amber-500/20 border border-amber-500 rounded-full px-2 py-1 whitespace-nowrap shadow-md">
                  <p className="text-[10px] md:text-xs text-amber-500 font-semibold">Needs ID</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Connection lines */}
        {stage === "connected" && animated && (
          <>
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
            {showLabels && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-top duration-700 delay-1000">
                <div className="bg-green-500/20 border border-green-500 rounded-full px-3 py-1.5 shadow-md">
                  <p className="text-xs md:text-sm text-green-500 font-semibold whitespace-nowrap">✓ Connected</p>
                </div>
              </div>
            )}
          </>
        )}

        {stage === "scaling" && showLabels && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom duration-700 delay-1000">
            <div className="bg-primary/20 border border-primary rounded-full px-3 py-1.5 shadow-md">
              <p className="text-xs md:text-sm text-primary font-semibold whitespace-nowrap">{nodes} Nodes Active</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
