"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface BookSessionModalProps {
  isOpen: boolean
  onClose: () => void
  sessionType?: string
}

export function BookSessionModal({ isOpen, onClose, sessionType = "" }: BookSessionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: sessionType,
    date: "",
    time: "",
    message: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Fake delay to simulate submission
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        setFormData({ name: "", email: "", phone: "", service: "", date: "", time: "", message: "" })
      }, 2500)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-[95vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Book a Session</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">Schedule your fitness session with our expert trainers</DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-6 sm:py-8 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Session Booked!</h3>
            <p className="text-muted-foreground text-sm sm:text-base">We'll contact you shortly to confirm your appointment.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="book-name" className="text-sm sm:text-base">Full Name</Label>
                <Input
                  id="book-name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="book-phone" className="text-sm sm:text-base">Phone</Label>
                <Input
                  id="book-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="text-sm sm:text-base"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="book-email" className="text-sm sm:text-base">Email</Label>
              <Input
                id="book-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-sm sm:text-base"
                required
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="book-service" className="text-sm sm:text-base">Service Type</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger id="book-service" className="text-sm sm:text-base">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal-training">Personal Training</SelectItem>
                  <SelectItem value="strength-training">Strength Training</SelectItem>
                  <SelectItem value="cardio">Cardio Fitness</SelectItem>
                  <SelectItem value="crossfit">CrossFit</SelectItem>
                  <SelectItem value="group-class">Group Classes</SelectItem>
                  <SelectItem value="nutrition">Nutrition Coaching</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="book-date" className="text-sm sm:text-base">Preferred Date</Label>
                <Input
                  id="book-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="book-time" className="text-sm sm:text-base">Preferred Time</Label>
                <Input
                  id="book-time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="text-sm sm:text-base"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="book-message" className="text-sm sm:text-base">Additional Notes (Optional)</Label>
              <Textarea
                id="book-message"
                placeholder="Tell us about your fitness goals..."
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="resize-none text-sm sm:text-base"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base py-3 sm:py-4" disabled={isLoading}>
              {isLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
