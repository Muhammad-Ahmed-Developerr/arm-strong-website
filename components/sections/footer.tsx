"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dumbbell, Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react"
import { useState } from "react"
import { NewsletterModal } from "@/components/modals/newsletter-modal"

export function Footer() {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)

  return (
    <>
      <footer className="bg-background border-t border-border">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <div className="bg-primary p-1.5 sm:p-2 rounded-lg">
                  <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-bold">
                  Arm <span className="text-primary">Strong</span>
                </span>
              </Link>
              <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
                Transform your body, transform your life. Join us and unlock your full potential.
              </p>
              <div className="flex gap-2 sm:gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                  <Button
                    key={index}
                    size="icon"
                    variant="outline"
                    className="rounded-full border-primary hover:bg-primary hover:text-primary-foreground bg-transparent w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 md:mb-4">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                {["Home", "About", "Services", "Trainers", "Schedule", "Membership"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 md:mb-4">Services</h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                {[
                  "Strength Training",
                  "Cardio Fitness",
                  "CrossFit",
                  "Personal Training",
                  "Nutrition Coaching",
                  "Group Classes",
                ].map((item) => (
                  <li key={item}>
                    <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 md:mb-4">Newsletter</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">Subscribe for fitness tips, special offers, and gym updates.</p>
              <div className="flex gap-1.5 sm:gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-card text-xs sm:text-sm"
                  onFocus={() => setShowNewsletterModal(true)}
                />
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 w-10 sm:w-12"
                  onClick={() => setShowNewsletterModal(true)}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-4 sm:pt-6 md:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-muted-foreground text-xs text-center sm:text-left">
              © 2026 Arm Strong. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <NewsletterModal isOpen={showNewsletterModal} onClose={() => setShowNewsletterModal(false)} />
    </>
  )
}
