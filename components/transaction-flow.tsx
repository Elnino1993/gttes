"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { FileText, ArrowRight, Coins } from "lucide-react"

interface TransactionFlowProps {
  stage: "interaction" | "contract" | "payment"
}

export function TransactionFlow({ stage }: TransactionFlowProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(false)
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [stage])

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4">
      <div className="flex items-center justify-between gap-6 md:gap-12">
        {/* Organization 1 */}
        <div
          className={cn(
            "flex flex-col items-center gap-3 transition-all duration-700 flex-shrink-0",
            animated && "translate-x-0 opacity-100",
            !animated && "-translate-x-20 opacity-0",
          )}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-card border-2 border-primary flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 text-primary"
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
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Organization A</p>
            <p className="text-xs text-muted-foreground">7Trust ID</p>
          </div>
        </div>

        {/* Transaction visualization */}
        <div className="flex-1 flex flex-col items-center gap-4 min-w-0">
          {/* Flow line */}
          <div className="relative w-full h-1 bg-border rounded-full overflow-hidden">
            <div
              className={cn(
                "absolute inset-y-0 left-0 bg-primary transition-all duration-1000 delay-500",
                animated && "w-full",
                !animated && "w-0",
              )}
            />
          </div>

          {/* Transaction icon */}
          <div
            className={cn(
              "relative transition-all duration-700 delay-700",
              animated && "scale-100 opacity-100",
              !animated && "scale-0 opacity-0",
            )}
          >
            {stage === "contract" && (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-accent border-2 border-accent-foreground flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 md:w-10 md:h-10 text-accent-foreground" />
              </div>
            )}
            {stage === "payment" && (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-accent border-2 border-accent-foreground flex items-center justify-center shadow-lg">
                <Coins className="w-8 h-8 md:w-10 md:h-10 text-accent-foreground" />
              </div>
            )}
            {stage === "interaction" && (
              <div className="flex items-center gap-2">
                <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              </div>
            )}
          </div>

          {/* Verification badge */}
          <div
            className={cn(
              "px-4 py-2 rounded-full bg-primary/10 border border-primary/20 transition-all duration-700 delay-1000 whitespace-nowrap",
              animated && "opacity-100 translate-y-0",
              !animated && "opacity-0 translate-y-4",
            )}
          >
            <p className="text-xs font-mono text-primary">
              {stage === "contract" && "Smart Contract Verified"}
              {stage === "payment" && "Payment Authorized"}
              {stage === "interaction" && "Secure Connection"}
            </p>
          </div>
        </div>

        {/* Organization 2 */}
        <div
          className={cn(
            "flex flex-col items-center gap-3 transition-all duration-700 flex-shrink-0",
            animated && "translate-x-0 opacity-100",
            !animated && "translate-x-20 opacity-0",
          )}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-card border-2 border-primary flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 text-primary"
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
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Organization B</p>
            <p className="text-xs text-muted-foreground">7Trust ID</p>
          </div>
        </div>
      </div>
    </div>
  )
}
