"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { useState } from "react"
import { JoinModal } from "@/components/modals/join-modal"
import { BookSessionModal } from "@/components/modals/book-session-modal"

export function HeroSection() {
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showBookModal, setShowBookModal] = useState(false)

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />
          <img 
            src="/gym-workout-athletes-training.jpg" 
            alt="Gym workout" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-3 sm:px-4 z-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-balance">
                Level Up Your <span className="text-primary">Strength</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 text-balance px-2 sm:px-0"
            >
              Transform your body, transform your life. Join Arm Strong and unlock your full potential with world-class
              facilities and expert trainers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 group w-full sm:w-auto"
                onClick={() => setShowJoinModal(true)}
              >
                Join Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 group bg-transparent w-full sm:w-auto"
                onClick={() => setShowBookModal(true)}
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                Book a Session
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-4 md:gap-8 mt-12 sm:mt-16 md:mt-20 px-2 sm:px-0"
            >
              {[
                { number: "5000+", label: "Active Members" },
                { number: "50+", label: "Expert Trainers" },
                { number: "100+", label: "Classes Weekly" },
                { number: "15+", label: "Years Experience" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <JoinModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />
      <BookSessionModal isOpen={showBookModal} onClose={() => setShowBookModal(false)} />
    </>
  )
}
