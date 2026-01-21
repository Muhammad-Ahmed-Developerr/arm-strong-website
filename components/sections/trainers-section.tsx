"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Instagram, Linkedin, Mail } from "lucide-react"

export function TrainersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTrainers, setVisibleTrainers] = useState(3)
  const [maxIndex, setMaxIndex] = useState(0)

  const trainers = [
    {
      name: "Alex Rodriguez",
      specialty: "Strength & Conditioning",
      image: "/fitness-trainer-male-athletic.jpg",
      bio: "Certified strength coach with 10+ years experience",
      certifications: ["CSCS", "NSCA-CPT", "Precision Nutrition L1"],
    },
    {
      name: "Sarah Mitchell",
      specialty: "Yoga & Flexibility",
      image: "/female-yoga-instructor.png",
      bio: "RYT-500 certified yoga instructor specializing in recovery",
      certifications: ["RYT-500", "Yin Yoga Certified", "Sports Massage"],
    },
    {
      name: "Marcus Johnson",
      specialty: "CrossFit & HIIT",
      image: "/crossfit-trainer-male.jpg",
      bio: "Former athlete turned CrossFit Level 3 trainer",
      certifications: ["CF-L3", "Olympic Lifting", "Mobility Specialist"],
    },
    {
      name: "Emily Chen",
      specialty: "Nutrition & Wellness",
      image: "/nutritionist-female-professional.jpg",
      bio: "Registered dietitian with focus on sports performance",
      certifications: ["RD", "CSSD", "Precision Nutrition L2"],
    },
    {
      name: "David Thompson",
      specialty: "Bodybuilding & Physique",
      image: "/bodybuilder-trainer-male.jpg",
      bio: "Professional bodybuilder and contest prep coach",
      certifications: ["IFBB Pro", "NASM-CPT", "Contest Prep Specialist"],
    },
    {
      name: "Jessica Williams",
      specialty: "Pilates & Core",
      image: "/pilates-instructor-female.jpg",
      bio: "Mat and reformer Pilates expert with rehab focus",
      certifications: ["PMA-CPT", "Reformer Certified", "Prenatal Specialist"],
    },
  ]

  useEffect(() => {
    const updateVisibleTrainers = () => {
      if (window.innerWidth < 768) {
        setVisibleTrainers(1)
      } else if (window.innerWidth < 1024) {
        setVisibleTrainers(2)
      } else {
        setVisibleTrainers(3)
      }
    }

    updateVisibleTrainers()
    window.addEventListener("resize", updateVisibleTrainers)
    
    return () => window.removeEventListener("resize", updateVisibleTrainers)
  }, [])

  useEffect(() => {
    setMaxIndex(Math.max(0, trainers.length - visibleTrainers))
  }, [visibleTrainers, trainers.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section id="trainers" ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Meet Our <span className="text-primary">Trainers</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-balance px-2 sm:px-0">
            World-class professionals dedicated to helping you achieve your fitness goals.
          </p>
        </motion.div>

        <div className="relative">
          {/* Slider */}
          <div className="overflow-hidden px-2 sm:px-0">
            <motion.div
              animate={{ x: `-${currentIndex * (100 / visibleTrainers)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex"
            >
              {trainers.map((trainer, index) => (
                <div key={index} className={`min-w-full ${visibleTrainers >= 2 ? "md:min-w-[50%]" : ""} ${visibleTrainers >= 3 ? "lg:min-w-[33.333%]" : ""} px-2 sm:px-4`}>
                  <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-300">
                    <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                      <img
                        src={trainer.image || "/placeholder.svg"}
                        alt={trainer.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Hover Bio */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-xs sm:text-sm text-foreground mb-2 sm:mb-3">{trainer.bio}</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                          {trainer.certifications.map((cert, i) => (
                            <span key={i} className="text-xs bg-primary/20 text-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                              {cert}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                          >
                            <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                          >
                            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                          >
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{trainer.name}</h3>
                      <p className="text-primary font-medium text-sm sm:text-base">{trainer.specialty}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons - Only show if there are multiple slides */}
          {maxIndex > 0 && (
            <>
              <Button
                size="icon"
                variant="outline"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary hover:bg-primary hover:text-primary-foreground z-10"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary hover:bg-primary hover:text-primary-foreground z-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: Math.min(maxIndex + 1, 6) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  currentIndex === index ? "bg-primary w-6 sm:w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
