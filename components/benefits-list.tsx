"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Shield, Zap, Lock, TrendingUp, Award } from "lucide-react"

const benefits = [
  { id: 1, name: "Privacy", icon: Lock },
  { id: 2, name: "Consistency", icon: Zap },
  { id: 3, name: "Security", icon: Shield },
  { id: 4, name: "Efficiency", icon: TrendingUp },
  { id: 5, name: "Institutional Trust", icon: Award },
]

export function BenefitsList() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(false)
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4">
      {/* Central logo area */}
      <div
        className={cn(
          "text-center mb-8 transition-all duration-700",
          animated && "scale-100 opacity-100",
          !animated && "scale-0 opacity-0",
        )}
      >
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/20 border-2 border-primary shadow-lg">
          <span className="text-2xl font-bold text-primary">7Trust</span>
          <span className="text-2xl text-muted-foreground">×</span>
          <span className="text-2xl font-bold text-primary">Canton</span>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <div
              key={benefit.id}
              className={cn(
                "group relative p-6 rounded-xl bg-card border-2 border-primary/30 hover:border-primary transition-all duration-700 delay-[var(--delay)] cursor-pointer shadow-md hover:shadow-lg",
                animated && "translate-y-0 opacity-100",
                !animated && "translate-y-8 opacity-0",
              )}
              style={
                {
                  "--delay": `${index * 150}ms`,
                } as React.CSSProperties
              }
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{benefit.name}</h3>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          )
        })}
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div
          className={cn(
            "absolute inset-0 bg-primary/5 rounded-full blur-3xl transition-all duration-1000",
            animated && "scale-100 opacity-100",
            !animated && "scale-0 opacity-0",
          )}
        />
      </div>
    </div>
  )
}
