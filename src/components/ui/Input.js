import { jsx as _jsx } from "react/jsx-runtime";
// src/components/ui/Input.tsx
import * as React from "react";
import classNames from "classnames";
import "./Input.scss";
export const Input = React.forwardRef(({ className, ...props }, ref) => {
    return _jsx("input", { ref: ref, className: classNames("input", className), ...props });
});
Input.displayName = "Input";
