import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn/ui Badge: бейдж доказательности (Сильная / Средняя / Слабая).
const badgeVariants = cva("badge", {
  variants: {
    variant: {
      strong: "ev-strong",
      mid: "ev-mid",
      weak: "ev-weak",
    },
  },
  defaultVariants: { variant: "mid" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
