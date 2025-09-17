import { jsx as _jsx } from "react/jsx-runtime";
// src/components/ui/Button.tsx
import * as React from "react";
import classNames from "classnames";
const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
    const buttonClass = classNames("btn", `btn--${variant}`, `btn--${size}`, className);
    return _jsx("button", { ref: ref, className: buttonClass, ...props });
});
Button.displayName = "Button";
export { Button };
