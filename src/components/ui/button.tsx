import { css } from "@emotion/css";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "ghost";

type ButtonSize = "default" | "sm" | "lg" | "icon";

const buttonStyles = (variant: ButtonVariant, size: ButtonSize) => css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;
  ${variant === "default" &&
  `background-color: blue;
  `}
  ${variant === "secondary" &&
  `background-color: green;
  `}
  ${variant === "destructive" &&
  `background-color: red;
  `}
  ${size === "default" &&
  `padding-top: 0.5rem;
  padding-bottom: 0.5rem; 
  padding-left: 1rem;
  padding-right: 1rem; 
  height: 2.5rem;
  `}
  ${size === "sm" &&
  `padding-left: 0.75rem;
  padding-right: 0.75rem; 
  border-radius: 0.375rem; 
  `}
  ${size === "lg" &&
  `padding-left: 2rem;
  padding-right: 2rem; 
  border-radius: 0.375rem; 
  height: 2.75rem; 
  `}
  ${size === "icon" &&
  `width: 2.5rem; 
  height: 2.5rem; 
  `}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  children,
  ...props
}) => (
  <button className={buttonStyles(variant, size)} {...props}>
    {children}
  </button>
);

export default Button;
