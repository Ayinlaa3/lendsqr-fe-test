import { jsx as _jsx } from "react/jsx-runtime";
// src/components/ui/Card.tsx
import * as React from "react";
import classNames from "classnames";
import "./Card.scss";
export const Card = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: classNames("card", className), ...props })));
Card.displayName = "Card";
export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: classNames("card__header", className), ...props })));
CardHeader.displayName = "CardHeader";
export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h3", { ref: ref, className: classNames("card__title", className), ...props })));
CardTitle.displayName = "CardTitle";
export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: classNames("card__description", className), ...props })));
CardDescription.displayName = "CardDescription";
export const CardContent = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: classNames("card__content", className), ...props })));
CardContent.displayName = "CardContent";
export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: classNames("card__footer", className), ...props })));
CardFooter.displayName = "CardFooter";
