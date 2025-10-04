"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Shield, CheckCircle2, Sparkles } from "lucide-react"

interface IdCardProps {
  stage: "creation"
}

export function IdCard({ stage }: IdCardProps) {
  const [animated, setAnimated] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showVerification, setShowVerification] = useState(false)

  useEffect(() => {
    setAnimated(false)
    setShowCard(false)
    setShowDetails(false)
    setShowVerification(false)

    const timer1 = setTimeout(() => setAnimated(true), 100)
    const timer2 = setTimeout(() => setShowCard(true), 800)
    const timer3 = setTimeout(() => setShowDetails(true), 1400)
    const timer4 = setTimeout(() => setShowVerification(true), 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [stage])

  return (
    <div className="relative w-full max-w-md mx-auto flex items-center justify-center h-full">
      <div className="relative w-full px-4">
        {/* Floating assembly pieces */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-14 h-14 bg-primary/20 border border-primary rounded-lg transition-all duration-700 flex items-center justify-center",
                animated && "opacity-0 scale-0",
                !animated && "opacity-100 scale-100",
              )}
              style={{
                left: `${15 + (i % 3) * 35}%`,
                top: `${20 + Math.floor(i / 3) * 40}%`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span className="text-xs text-primary font-mono font-bold">
                {["ID", "KEY", "SIG", "ENC", "VER", "PKI"][i]}
              </span>
            </div>
          ))}
        </div>

        {/* Assembly status */}
        {!showCard && animated && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-pulse z-10">
            <div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 whitespace-nowrap">
              <Sparkles className="w-4 h-4" />
              <p className="text-sm font-semibold">Assembling Identity...</p>
            </div>
          </div>
        )}

        {/* ID Card */}
        <div
          className={cn(
            "relative bg-card border-2 border-primary rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-1000 delay-700",
            showCard && "opacity-100 scale-100 rotate-0",
            !showCard && "opacity-0 scale-50 rotate-12",
          )}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">7Trust ID</h3>
              <p className="text-sm text-muted-foreground">Digital Identity</p>
            </div>
            <Shield className="w-10 h-10 text-primary flex-shrink-0" />
          </div>

          <div className="space-y-4">
            <div
              className={cn(
                "flex items-center gap-3 transition-all duration-500",
                showDetails ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
              )}
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Organization</p>
                <p className="text-sm text-muted-foreground">Canton Network Member</p>
              </div>
            </div>

            <div
              className={cn(
                "pt-4 border-t border-border transition-all duration-500 delay-200",
                showVerification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Verified by 7Trust</span>
              </div>
              <div className="mt-2 font-mono text-xs text-muted-foreground">
                <p className="break-all">Signature: 0x7a9f...3e2d</p>
                <p className="text-green-500 mt-1">✓ Cryptographically Signed</p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
