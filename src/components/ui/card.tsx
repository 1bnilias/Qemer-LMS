import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "flex flex-col gap-6 rounded-2xl border-2 py-6 transition-all duration-300 bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:border-border/80",
        primary: "border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 hover:from-primary/10 hover:to-primary/15",
        success: "border-success/30 bg-gradient-to-br from-success/5 to-success/10 shadow-lg shadow-success/10 hover:shadow-xl hover:shadow-success/20 hover:border-success/50 hover:from-success/10 hover:to-success/15",
        warning: "border-warning/30 bg-gradient-to-br from-warning/5 to-warning/10 shadow-lg shadow-warning/10 hover:shadow-xl hover:shadow-warning/20 hover:border-warning/50 hover:from-warning/10 hover:to-warning/15",
        info: "border-info/30 bg-gradient-to-br from-info/5 to-info/10 shadow-lg shadow-info/10 hover:shadow-xl hover:shadow-info/20 hover:border-info/50 hover:from-info/10 hover:to-info/15",
        purple: "border-purple/30 bg-gradient-to-br from-purple/5 to-purple/10 shadow-lg shadow-purple/10 hover:shadow-xl hover:shadow-purple/20 hover:border-purple/50 hover:from-purple/10 hover:to-purple/15",
        pink: "border-pink/30 bg-gradient-to-br from-pink/5 to-pink/10 shadow-lg shadow-pink/10 hover:shadow-xl hover:shadow-pink/20 hover:border-pink/50 hover:from-pink/10 hover:to-pink/15",
        indigo: "border-indigo/30 bg-gradient-to-br from-indigo/5 to-indigo/10 shadow-lg shadow-indigo/10 hover:shadow-xl hover:shadow-indigo/20 hover:border-indigo/50 hover:from-indigo/10 hover:to-indigo/15",
        teal: "border-teal/30 bg-gradient-to-br from-teal/5 to-teal/10 shadow-lg shadow-teal/10 hover:shadow-xl hover:shadow-teal/20 hover:border-teal/50 hover:from-teal/10 hover:to-teal/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

const cardTitleVariants = cva(
  "leading-none font-semibold",
  {
    variants: {
      variant: {
        default: "text-card-foreground",
        primary: "text-primary",
        success: "text-success",
        warning: "text-warning",
        info: "text-info",
        purple: "text-purple",
        pink: "text-pink",
        indigo: "text-indigo",
        teal: "text-teal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function CardTitle({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardTitleVariants>) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
  cardTitleVariants,
}
