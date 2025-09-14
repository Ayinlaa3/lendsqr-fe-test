// src/components/ui/Input.tsx
import * as React from "react";
import classNames from "classnames";
import "./Input.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={classNames("input", className)} {...props} />;
});
Input.displayName = "Input";
