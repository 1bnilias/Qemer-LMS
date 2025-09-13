import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-sm hover:shadow-md active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/40",
        destructive:
          "bg-red-600 text-white shadow-red-500/25 hover:bg-red-700 hover:shadow-red-500/40 focus-visible:ring-red-500/20",
        outline:
          "border-2 border-blue-200 bg-white text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 hover:shadow-blue-200/50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800 dark:hover:border-blue-600",
        secondary:
          "bg-gray-100 text-gray-900 shadow-gray-200/25 hover:bg-gray-200 hover:shadow-gray-200/40 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:shadow-gray-900/25 dark:hover:shadow-gray-900/40",
        ghost:
          "text-black hover:bg-gray-100 hover:text-black hover:shadow-gray-200/20 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:hover:shadow-gray-900/20",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-800",
        success:
          "bg-green-600 text-white shadow-green-500/25 hover:bg-green-700 hover:shadow-green-500/40",
        warning:
          "bg-orange-600 text-white shadow-orange-500/25 hover:bg-orange-700 hover:shadow-orange-500/40",
        info:
          "bg-cyan-600 text-white shadow-cyan-500/25 hover:bg-cyan-700 hover:shadow-cyan-500/40",
        purple:
          "bg-purple-600 text-white shadow-purple-500/25 hover:bg-purple-700 hover:shadow-purple-500/40",
        pink:
          "bg-pink-600 text-white shadow-pink-500/25 hover:bg-pink-700 hover:shadow-pink-500/40",
        indigo:
          "bg-indigo-600 text-white shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/40",
        teal:
          "bg-teal-600 text-white shadow-teal-500/25 hover:bg-teal-700 hover:shadow-teal-500/40",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base",
        icon: "size-10 rounded-xl",
        xl: "h-14 rounded-2xl px-10 has-[>svg]:px-8 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
