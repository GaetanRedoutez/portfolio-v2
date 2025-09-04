import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  // Base commune
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "bg-accent-8 text-common-1 hover:bg-accent-7 hover:scale-[1.03] hover:shadow-lg focus-visible:ring-accent-6",
        destructive:
          "bg-red-600 text-common-1 hover:bg-red-700 hover:scale-[1.03] hover:shadow-md focus-visible:ring-red-500",
        outline:
          "border border-neutral-4 bg-common-1 text-neutral-7 hover:bg-neutral-2 hover:scale-[1.02] hover:shadow-sm focus-visible:ring-accent-4",
        secondary:
          "bg-neutral-7 text-common-1 hover:bg-neutral-6 hover:scale-[1.03] hover:shadow-lg focus-visible:ring-neutral-5",
        ghost:
          "bg-transparent hover:bg-neutral-2 text-neutral-7 hover:scale-[1.03] focus-visible:ring-accent-4",
        link: "text-accent-6 underline-offset-4 hover:underline hover:translate-x-[2px]",
        tintAccent:
          "bg-accent-1 text-accent-9 hover:bg-accent-2 hover:scale-[1.03] hover:shadow focus-visible:ring-accent-3",
        tintSand:
          "bg-sand-1 text-sand-9 hover:bg-sand-2 hover:scale-[1.03] hover:shadow focus-visible:ring-sand-3",
        tintPeach:
          "bg-peach-1 text-peach-9 hover:bg-peach-2 hover:scale-[1.03] hover:shadow focus-visible:ring-peach-3",
        tintMint:
          "bg-mint-1 text-mint-9 hover:bg-mint-2 hover:scale-[1.03] hover:shadow focus-visible:ring-mint-3",
        decorated:
          "border-2 border-accent-6 bg-accent-1 text-accent-8 hover:bg-accent-2 hover:scale-[1.03] hover:shadow-md focus-visible:ring-accent-4",
      },
      size: {
        default: "h-9 px-4 text-md",
        sm: "h-8 px-3 text-sm",
        lg: "h-11 px-6 text-l",
        xl: "h-14 px-8 text-xl",
        icon: "size-9 p-0 flex items-center justify-center",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
      weight: "medium",
    },
  }
);

function Button({
  className,
  variant,
  size,
  rounded,
  weight,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={clsx(
        buttonVariants({ variant, size, rounded, weight, className })
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
