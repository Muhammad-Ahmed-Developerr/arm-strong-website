"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Upload, X, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

interface JoinModalProps {
  isOpen: boolean
  onClose: () => void
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [step, setStep] = useState<"form" | "verification" | "success">("form")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [profileImagePreview, setProfileImagePreview] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setProfileImagePreview(URL.createObjectURL(file))
  }

  const removeProfileImage = () => {
    setProfileImagePreview("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("verification")
    }, 1000)
  }

  const handleVerification = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
      setTimeout(() => {
        setStep("form")
        setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" })
        setVerificationCode(["", "", "", "", "", ""])
        removeProfileImage()
        onClose()
      }, 2500)
    }, 1000)
  }

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl">Join Arm Strong</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">Start your fitness transformation today!</DialogDescription>
            </DialogHeader>

            <Button
              type="button"
              variant="outline"
              className="w-full border-border hover:bg-muted h-10 sm:h-12 mb-3 sm:mb-4 text-sm sm:text-base"
            >
              <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Continue with Google
            </Button>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Profile Image */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="profileImage" className="text-sm sm:text-base">Profile Image (Optional)</Label>
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  {profileImagePreview ? (
                    <div className="relative">
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-primary"
                      />
                      <button
                        type="button"
                        onClick={removeProfileImage}
                        className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-muted/50">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                    id="profileImage"
                  />
                  <Button type="button" variant="outline" className="text-sm sm:text-base" onClick={() => fileInputRef.current?.click()}>
                    {profileImagePreview ? "Change Image" : "Upload Image"}
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="join-name" className="text-sm sm:text-base required">Full Name</Label>
                <Input
                  id="join-name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="join-email" className="text-sm sm:text-base required">Email</Label>
                <Input
                  id="join-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="join-phone" className="text-sm sm:text-base required">Phone Number</Label>
                <Input
                  id="join-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="join-password" className="text-sm sm:text-base required">Password</Label>
                <div className="relative">
                  <Input
                    id="join-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="text-sm sm:text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="join-confirm-password" className="text-sm sm:text-base required">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="join-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="text-sm sm:text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-10 sm:h-12">
                {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" /> : "Create Account"}
              </Button>
            </form>
          </>
        )}

        {step === "verification" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl">Verify Your Email</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Enter the 6-digit code sent to <span className="font-medium text-primary">{formData.email}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-1.5 sm:gap-2 justify-center mb-3 sm:mb-4">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-bold"
                />
              ))}
            </div>

            <Button
              onClick={handleVerification}
              className="w-full bg-primary hover:bg-primary/90 h-10 sm:h-12"
            >
              {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" /> : "Verify Email"}
            </Button>

            <Button
              type="button"
              variant="link"
              className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground w-full text-center"
              onClick={() => setStep("form")}
            >
              ← Back to registration
            </Button>
          </>
        )}

        {step === "success" && (
          <div className="py-6 sm:py-8 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Account Created!</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Your account has been successfully created. Welcome to Arm Strong!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
