"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { JoinModal } from "./join-modal" 
import { ForgotPasswordModal } from "./forgot-password-modal"

// ------------------------
// Login Modal
// ------------------------
interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [showJoin, setShowJoin] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        setEmail("")
        setPassword("")
      }, 2000)
    }, 1000)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
          {showSuccess ? (
            <div className="py-6 sm:py-8 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Login Successful!</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Welcome back! Redirecting...</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl md:text-3xl">Welcome Back!</DialogTitle>
                <DialogDescription className="text-sm sm:text-base">Login to access your Arm Strong account</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="login-email" className="text-sm sm:text-base">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="login-password" className="text-sm sm:text-base">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => { setShowForgot(true); onClose() }}
                  >
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-10 sm:h-12" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" /> : "Login"}
                </Button>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => { setShowJoin(true); onClose() }}
                  >
                    Join Now
                  </button>
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal isOpen={showForgot} onClose={() => setShowForgot(false)} />

      {/* Join Modal */}
      <JoinModal isOpen={showJoin} onClose={() => setShowJoin(false)} />
    </>
  )
}
