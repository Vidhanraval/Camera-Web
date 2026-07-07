import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
        secondary:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
        destructive:
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
        success:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        warning:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        outline:
          "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300",
        premium:
          "bg-gradient-to-r from-amber-600 to-orange-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
