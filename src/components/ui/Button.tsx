// src/components/ui/Button.tsx
import * as React from "react";
import classNames from "classnames";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const buttonClass = classNames(
      "btn",
      `btn--${variant}`,
      `btn--${size}`,
      className
    );

    return <button ref={ref} className={buttonClass} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
