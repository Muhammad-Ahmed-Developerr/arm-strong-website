"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ClassBookingModalProps {
  isOpen: boolean
  onClose: () => void
  classData?: {
    name: string
    day: string
    time: string
    trainer: string
  }
}

export function ClassBookingModal({ isOpen, onClose, classData }: ClassBookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Fake delay to simulate booking
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        setFormData({ name: "", email: "", phone: "" })
      }, 2500)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Book Your Spot</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Reserve your spot for {classData?.name} on {classData?.day}
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-6 sm:py-8 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Spot Reserved!</h3>
            <p className="text-muted-foreground text-sm sm:text-base">See you at the class!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
            <div className="bg-muted p-3 sm:p-4 rounded-lg space-y-1.5 sm:space-y-2">
              <p className="text-xs sm:text-sm">
                <span className="font-medium">Class:</span> {classData?.name}
              </p>
              <p className="text-xs sm:text-sm">
                <span className="font-medium">Time:</span> {classData?.day} at {classData?.time}
              </p>
              <p className="text-xs sm:text-sm">
                <span className="font-medium">Trainer:</span> {classData?.trainer}
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="class-name" className="text-sm sm:text-base">Full Name</Label>
              <Input
                id="class-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-sm sm:text-base"
                required
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="class-email" className="text-sm sm:text-base">Email</Label>
              <Input
                id="class-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-sm sm:text-base"
                required
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="class-phone" className="text-sm sm:text-base">Phone Number</Label>
              <Input
                id="class-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="text-sm sm:text-base"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base py-3 sm:py-4" disabled={isLoading}>
              {isLoading ? "Booking..." : "Book Spot"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
