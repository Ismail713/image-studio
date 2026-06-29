"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode, type RefObject } from "react"
import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

interface TimelineContentProps {
  children: ReactNode
  animationNum: number
  timelineRef: RefObject<HTMLDivElement | null>
  customVariants?: Variants
  className?: string
  as?: ElementType
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  as: Tag = "div",
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = timelineRef?.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [timelineRef])

  const MotionTag = motion.create(Tag as "div")

  return (
    <MotionTag
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={customVariants}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
