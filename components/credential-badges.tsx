"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Award, CheckCircle2, Lock, Eye, EyeOff } from "lucide-react"

interface CredentialBadgesProps {
  stage: "adding" | "privacy"
}

const credentials = [
  { id: 1, name: "License", icon: Award, color: "text-chart-1" },
  { id: 2, name: "KYC Status", icon: CheckCircle2, color: "text-chart-2" },
  { id: 3, name: "Investor Qualification", icon: Award, color: "text-chart-3" },
]

export function CredentialBadges({ stage }: CredentialBadgesProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(false)
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [stage])

  return (
    <div className="relative w-full max-w-md mx-auto flex items-center justify-center min-h-[400px]">
      {/* Central ID Card */}
      <div className="relative bg-card border-2 border-primary rounded-2xl p-6 md:p-8 shadow-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">7Trust ID</h3>
          {stage === "privacy" && (
            <Lock
              className={cn(
                "w-6 h-6 text-primary transition-all duration-500",
                animated && "scale-100 opacity-100",
                !animated && "scale-0 opacity-0",
              )}
            />
          )}
        </div>

        {/* Credentials */}
        <div className="space-y-3">
          {credentials.map((cred, index) => {
            const Icon = cred.icon
            const isPrivate = stage === "privacy" && index === 2

            return (
              <div
                key={cred.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-700",
                  animated && "translate-x-0 opacity-100 scale-100",
                  !animated && "-translate-x-20 opacity-0 scale-90",
                  isPrivate ? "border-muted bg-muted/20" : "border-primary/30 bg-primary/5",
                )}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    isPrivate ? "bg-muted" : "bg-primary/20",
                  )}
                >
                  {isPrivate ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Icon className={cn("w-5 h-5", cred.color)} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-semibold text-sm", isPrivate ? "text-muted-foreground" : "text-foreground")}>
                    {cred.name}
                  </p>
                  {!isPrivate && <p className="text-xs text-muted-foreground">Verified</p>}
                </div>
                <div className="flex-shrink-0">
                  {!isPrivate && stage === "adding" && (
                    <div
                      className={cn(
                        "transition-all duration-500",
                        animated && "scale-100 opacity-100",
                        !animated && "scale-0 opacity-0",
                      )}
                      style={{
                        transitionDelay: `${(index + 1) * 200 + 300}ms`,
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  {stage === "privacy" && !isPrivate && <Eye className="w-5 h-5 text-primary" />}
                </div>
              </div>
            )
          })}
        </div>

        {stage === "privacy" && (
          <div
            className={cn(
              "mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 transition-all duration-700 delay-700",
              animated && "opacity-100 translate-y-0",
              !animated && "opacity-0 translate-y-4",
            )}
          >
            <p className="text-xs text-muted-foreground text-center">Organization controls data visibility</p>
          </div>
        )}
      </div>
    </div>
  )
}
