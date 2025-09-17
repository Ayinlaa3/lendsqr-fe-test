import { jsx as _jsx } from "react/jsx-runtime";
// src/components/ui/Table.tsx
import * as React from "react";
import classNames from "classnames";
import "./Table.scss";
export const Table = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { className: "table__wrapper", children: _jsx("table", { ref: ref, className: classNames("table", className), ...props }) })));
Table.displayName = "Table";
export const TableHeader = React.forwardRef(({ className, ...props }, ref) => _jsx("thead", { ref: ref, className: classNames("table__header", className), ...props }));
TableHeader.displayName = "TableHeader";
export const TableBody = React.forwardRef(({ className, ...props }, ref) => _jsx("tbody", { ref: ref, className: classNames("table__body", className), ...props }));
TableBody.displayName = "TableBody";
export const TableRow = React.forwardRef(({ className, ...props }, ref) => _jsx("tr", { ref: ref, className: classNames("table__row", className), ...props }));
TableRow.displayName = "TableRow";
export const TableHead = React.forwardRef(({ className, ...props }, ref) => _jsx("th", { ref: ref, className: classNames("table__head", className), ...props }));
TableHead.displayName = "TableHead";
export const TableCell = React.forwardRef(({ className, ...props }, ref) => _jsx("td", { ref: ref, className: classNames("table__cell", className), ...props }));
TableCell.displayName = "TableCell";
export const TableCaption = React.forwardRef(({ className, ...props }, ref) => (_jsx("caption", { ref: ref, className: classNames("table__caption", className), ...props })));
TableCaption.displayName = "TableCaption";
