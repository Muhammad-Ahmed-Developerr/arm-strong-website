"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Target, Users, Trophy, Heart } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About <span className="text-primary">Arm Strong</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-balance px-2 sm:px-0">
            More than just a gym - we're a community dedicated to helping you achieve your fitness goals through expert
            guidance, state-of-the-art facilities, and unwavering support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/modern-gym-facility-interior.jpg" alt="Gym Facility" className="rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl w-full h-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Your Journey to Greatness Starts Here</h3>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              Founded in 2010, Arm Strong has been the premier destination for fitness enthusiasts of all levels. Our
              world-class facilities feature cutting-edge equipment, innovative training programs, and a team of
              certified professionals committed to your success.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              Whether you're beginning your fitness journey or pushing for new personal records, we provide the tools,
              knowledge, and motivation you need to exceed your goals.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6">
              {[
                { icon: Target, label: "Goal Focused" },
                { icon: Users, label: "Community Driven" },
                { icon: Trophy, label: "Results Proven" },
                { icon: Heart, label: "Health First" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-lg">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <span className="font-semibold text-xs sm:text-sm md:text-base">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { end: 5000, label: "Members", suffix: "+" },
            { end: 50, label: "Trainers", suffix: "+" },
            { end: 100, label: "Classes", suffix: "+" },
            { end: 98, label: "Success Rate", suffix: "%" },
          ].map((stat, index) => (
            <CounterCard key={index} {...stat} delay={index * 0.1} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CounterCard({
  end,
  label,
  suffix,
  delay,
  isInView,
}: { end: number; label: string; suffix: string; delay: number; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end, isInView])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-background border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-primary transition-colors"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">{label}</div>
    </motion.div>
  )
}
