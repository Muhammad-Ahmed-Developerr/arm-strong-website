"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)

  const articles = [
    {
      title: "10 Essential Tips for Building Muscle Mass",
      excerpt: "Discover the scientifically-proven strategies for maximizing muscle growth and strength gains.",
      image: "/bodybuilding-muscle-growth.jpg",
      date: "Dec 15, 2024",
      category: "Training",
      content:
        "Building muscle mass requires a combination of progressive overload, proper nutrition, adequate recovery, and consistency. Learn the key principles that top athletes use to maximize their gains.",
    },
    {
      title: "Nutrition Guide: Fueling Your Fitness Journey",
      excerpt: "Learn how to optimize your diet for performance, recovery, and body composition goals.",
      image: "/healthy-nutrition-meal-prep.jpg",
      date: "Dec 12, 2024",
      category: "Nutrition",
      content:
        "Proper nutrition is the foundation of any successful fitness program. Discover how to balance macronutrients, time your meals, and fuel your workouts for optimal results.",
    },
    {
      title: "The Science of Recovery: Why Rest Days Matter",
      excerpt: "Understanding the importance of recovery for long-term fitness success and injury prevention.",
      image: "/athlete-recovery-rest.jpg",
      date: "Dec 10, 2024",
      category: "Recovery",
      content:
        "Recovery is when your body adapts and grows stronger. Learn why rest days are crucial for progress and how to optimize your recovery for better performance.",
    },
    {
      title: "HIIT vs Steady State: Which Cardio is Right for You?",
      excerpt: "Compare different cardio training methods and find the best approach for your goals.",
      image: "/hiit-cardio-training.jpg",
      date: "Dec 8, 2024",
      category: "Cardio",
      content:
        "Both HIIT and steady-state cardio have their place in a well-rounded fitness program. Discover which method aligns best with your fitness goals and lifestyle.",
    },
    {
      title: "Mental Strength: The Overlooked Key to Fitness",
      excerpt: "How developing mental toughness can transform your training and results.",
      image: "/mental-strength-motivation.jpg",
      date: "Dec 5, 2024",
      category: "Mindset",
      content:
        "Your mind is your most powerful tool in the gym. Learn techniques to develop mental toughness, stay motivated, and push through barriers to achieve your fitness goals.",
    },
    {
      title: "Beginner's Guide to Starting Your Fitness Journey",
      excerpt: "Everything you need to know to start working out safely and effectively.",
      image: "/beginner-fitness-workout.jpg",
      date: "Dec 1, 2024",
      category: "Beginner",
      content:
        "Starting your fitness journey can be overwhelming. This comprehensive guide covers everything from proper form to building sustainable habits for long-term success.",
    },
  ]

  const handleReadMore = (article: any) => {
    setSelectedArticle(article)
    setShowArticleModal(true)
  }

  return (
    <>
      <section id="blog" ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Fitness <span className="text-primary">Tips & Articles</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-balance px-2 sm:px-0">
              Expert advice, workout tips, and nutrition guides to help you succeed.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:border-primary transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl hover:shadow-primary/20 overflow-hidden flex flex-col">
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                    <img
                      src={`${article.image}?query=${encodeURIComponent(article.category + " fitness")}`}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <span className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {article.date}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 sm:p-6 pt-0">
                    <p className="text-sm sm:text-base text-muted-foreground">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 sm:p-6 pt-0">
                    <Button
                      variant="ghost"
                      className="w-full group/btn text-primary hover:bg-primary hover:text-primary-foreground text-sm sm:text-base"
                      onClick={() => handleReadMore(article)}
                    >
                      Read More
                      <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={showArticleModal} onOpenChange={setShowArticleModal}>
        <DialogContent className="sm:max-w-lg md:max-w-2xl max-h-[80vh] sm:max-h-[90vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="mb-3 sm:mb-4">
                  <span className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {selectedArticle.category}
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">{selectedArticle.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {selectedArticle.date}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-3 sm:mt-4">
                <img
                  src={`${selectedArticle.image}?query=${encodeURIComponent(selectedArticle.category + " fitness")}`}
                  alt={selectedArticle.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4 sm:mb-6"
                />
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">{selectedArticle.content}</p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  For personalized guidance on implementing these strategies, book a consultation with one of our expert
                  trainers. We're here to help you achieve your fitness goals!
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
