"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Heart, Zap, Apple, Users, Award } from "lucide-react"
import { ServiceModal } from "@/components/modals/service-modal"
import { BookSessionModal } from "@/components/modals/book-session-modal"

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showBookModal, setShowBookModal] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  const services = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description: "Build muscle and increase power with our comprehensive strength training programs and equipment.",
      image: "/strength-training-gym.jpg",
      features: [
        "Free weights and resistance machines",
        "Progressive overload programming",
        "Form coaching and technique refinement",
        "Custom workout plans",
        "Monthly strength assessments",
      ],
    },
    {
      icon: Heart,
      title: "Cardio Fitness",
      description: "Improve endurance and heart health with state-of-the-art cardio equipment and HIIT classes.",
      image: "/cardio-fitness-running.jpg",
      features: [
        "Treadmills, bikes, and rowing machines",
        "HIIT and interval training classes",
        "Heart rate zone optimization",
        "Endurance building programs",
        "Cardio fitness tracking",
      ],
    },
    {
      icon: Zap,
      title: "CrossFit",
      description: "High-intensity functional movements that will push your limits and deliver incredible results.",
      image: "/crossfit-training-workout.jpg",
      features: [
        "Certified CrossFit coaches",
        "Daily WODs (Workout of the Day)",
        "Olympic lifting instruction",
        "Gymnastics skill development",
        "Competition prep training",
      ],
    },
    {
      icon: Users,
      title: "Group Classes",
      description: "Join energetic group sessions from yoga to spinning, led by certified instructors.",
      image: "/group-fitness-class.jpg",
      features: [
        "Yoga, Pilates, and stretching",
        "Spin and cycling classes",
        "Dance fitness and Zumba",
        "Boot camp style workouts",
        "Mind-body wellness sessions",
      ],
    },
    {
      icon: Apple,
      title: "Nutrition Coaching",
      description: "Personalized meal plans and nutrition guidance to fuel your fitness journey effectively.",
      image: "/healthy-food-collage.jpg",
      features: [
        "Personalized meal planning",
        "Macro and calorie tracking",
        "Supplement guidance",
        "Recipe ideas and cooking tips",
        "Regular check-ins and adjustments",
      ],
    },
    {
      icon: Award,
      title: "Personal Training",
      description: "One-on-one sessions with expert trainers tailored to your specific goals and fitness level.",
      image: "/personal-trainer-coaching.jpg",
      features: [
        "Certified personal trainers",
        "Customized workout programs",
        "Goal setting and progress tracking",
        "Flexible scheduling options",
        "Accountability and motivation",
      ],
    },
  ]

  const handleLearnMore = (service: any) => {
    setSelectedService(service)
    setShowServiceModal(true)
  }

  return (
    <>
      <section id="services" ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-balance px-2 sm:px-0">
              Comprehensive fitness solutions designed to help you reach your goals, whatever they may be.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:border-primary transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl hover:shadow-primary/20 overflow-hidden">
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                    <img
                      src={`${service.image}?query=${encodeURIComponent(service.title + " fitness")}`}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-primary p-2 sm:p-3 rounded-lg">
                      <service.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <CardDescription className="text-sm sm:text-base">{service.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 sm:p-6 pt-0">
                    <Button
                      variant="ghost"
                      className="w-full text-primary hover:bg-primary hover:text-primary-foreground text-sm sm:text-base"
                      onClick={() => handleLearnMore(service)}
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        service={selectedService}
        onBookSession={() => setShowBookModal(true)}
      />
      <BookSessionModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        sessionType={selectedService?.title || ""}
      />
    </>
  )
}
