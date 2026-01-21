"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Frontend-only simulation
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  const contactInfo = [
    { icon: MapPin, title: "Location", info: "123 Fitness Street, Gym City, ST 12345" },
    { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
    { icon: Mail, title: "Email", info: "info@armstrong.gym" },
    { icon: Clock, title: "Hours", info: "Mon-Fri: 5AM-11PM | Sat-Sun: 7AM-9PM" },
  ]

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-balance px-2 sm:px-0">
            Ready to start your fitness journey? Contact us today for a free consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-border hover:border-primary transition-colors">
              <CardContent className="p-4 sm:p-6 md:p-8">
                {showSuccess ? (
                  <div className="py-8 sm:py-10 md:py-12 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your fitness goals..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-background resize-none text-sm sm:text-base"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base py-3 sm:py-4"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {contactInfo.map((item, index) => (
                <Card key={index} className="border-border hover:border-primary transition-colors">
                  <CardContent className="p-4 sm:p-6">
                    <div className="bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">{item.info}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map */}
            <Card className="border-2 border-border overflow-hidden">
              <div className="h-48 sm:h-56 md:h-64 bg-muted relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e1e1c01%3A0x278cfb7b56c25e76!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gym Location"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
