"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import { MembershipModal } from "@/components/modals/membership-modal"

export function MembershipSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [showMembershipModal, setShowMembershipModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string
    plan: string
    billingCycle: string
  } | null>(null)

  const plans = [
    {
      name: "Basic",
      plan: "basic",
      monthlyPrice: 49,
      yearlyPrice: 490,
      description: "Perfect for beginners starting their fitness journey",
      features: ["Access to gym floor", "Standard equipment use", "Locker room access", "Free fitness assessment"],
      popular: false,
    },
    {
      name: "Pro",
      plan: "pro",
      monthlyPrice: 89,
      yearlyPrice: 890,
      description: "Most popular choice for serious fitness enthusiasts",
      features: [
        "Everything in Basic",
        "Unlimited group classes",
        "2 personal training sessions/month",
        "Nutrition consultation",
        "Access to premium equipment",
        "Mobile app access",
      ],
      popular: true,
    },
    {
      name: "Elite",
      plan: "elite",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      description: "Ultimate package for those who demand the best",
      features: [
        "Everything in Pro",
        "Unlimited personal training",
        "Priority class booking",
        "Monthly body composition analysis",
        "Custom meal planning",
        "Exclusive member events",
        "Guest passes (2/month)",
        "24/7 gym access",
      ],
      popular: false,
    },
  ]

  const handleGetStarted = (planName: string, planType: string) => {
    setSelectedPlan({
      name: planName,
      plan: planType,
      billingCycle: billingCycle,
    })
    setShowMembershipModal(true)
  }

  return (
    <>
      <section id="membership" ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Membership <span className="text-primary">Plans</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 text-balance px-2 sm:px-0">
              Choose the plan that fits your goals and budget. All plans include access to our world-class facilities.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-1 sm:gap-2 md:gap-4 bg-background border border-border rounded-full p-1.5 sm:p-2">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm md:text-base ${
                  billingCycle === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm md:text-base ${
                  billingCycle === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly <span className="text-accent ml-1 hidden xs:inline">(Save 17%)</span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={plan.popular ? "md:-mt-4" : ""}
              >
                <Card
                  className={`h-full relative ${
                    plan.popular
                      ? "border-2 border-primary shadow-lg sm:shadow-xl shadow-primary/20"
                      : "border-border hover:border-primary/50"
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pt-6 sm:pt-8">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base">{plan.description}</CardDescription>
                    <div className="mt-4 sm:mt-6">
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                        ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                        per {billingCycle === "monthly" ? "month" : "year"}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 sm:space-y-3 md:space-y-4 p-4 sm:p-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 sm:gap-3">
                        <div className="bg-primary/10 p-1 rounded-full mt-0.5 shrink-0">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </div>
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter className="p-4 sm:p-6">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                      } text-sm sm:text-base py-3 sm:py-4`}
                      size="lg"
                      onClick={() => handleGetStarted(plan.name, plan.plan)}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
        planData={selectedPlan || undefined}
      />
    </>
  )
}
