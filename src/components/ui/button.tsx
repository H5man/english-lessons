import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn/ui Button: варианты привязаны к палитре сайта (см. .btn* в index.css).
const buttonVariants = cva("btn disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "",
      main: "btn-main",
      ok: "btn-ok",
      warn: "btn-warn",
      seg: "segbtn",
    },
    size: {
      default: "",
      restart: "btn-restart",
      next: "btn-next",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
