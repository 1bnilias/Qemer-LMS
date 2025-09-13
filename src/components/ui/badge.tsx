import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-xl border px-3 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden shadow-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40",
        secondary:
          "border-transparent bg-gray-500 text-white shadow-gray-400/25 hover:shadow-gray-400/40",
        destructive:
          "border-transparent bg-red-600 text-white shadow-red-500/25 hover:shadow-red-500/40",
        outline:
          "text-blue-700 border-blue-300 bg-white hover:bg-blue-50 hover:shadow-blue-200/25",
        success:
          "border-transparent bg-green-600 text-white shadow-green-500/25 hover:shadow-green-500/40",
        warning:
          "border-transparent bg-orange-600 text-white shadow-orange-500/25 hover:shadow-orange-500/40",
        info:
          "border-transparent bg-cyan-600 text-white shadow-cyan-500/25 hover:shadow-cyan-500/40",
        purple:
          "border-transparent bg-purple-600 text-white shadow-purple-500/25 hover:shadow-purple-500/40",
        pink:
          "border-transparent bg-pink-600 text-white shadow-pink-500/25 hover:shadow-pink-500/40",
        indigo:
          "border-transparent bg-indigo-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40",
        teal:
          "border-transparent bg-teal-600 text-white shadow-teal-500/25 hover:shadow-teal-500/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
