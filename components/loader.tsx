"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Loader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">

        {/* Animated Rings */}
        <motion.div
          className="absolute inset-0 border-4 border-primary/20 rounded-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute inset-0.5 border-4 border-primary/40 rounded-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* LOGO */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="relative z-10"
        >
          <div className="bg-gradient-to-br from-primary to-primary/80 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 animate-pulse rounded-lg sm:rounded-xl overflow-hidden">
              <Image
                src="/gym-logo.png"
                alt="Arm Strong Gym Logo"
                fill
                className="object-contain rounded-lg sm:rounded-xl"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 sm:mt-6 text-center"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Arm <span className="text-primary">Strong</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-1 sm:mt-2">
            Loading your fitness journey...
          </p>
        </motion.div>
      </div>
    </div>
  )
}
