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
  font-weight: medium;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px hsl(0, 0%, 80%);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  ${variant === "default" &&
  `background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;

  &:hover {
    background-color: hsl(var(--primary)/.9); 
  }
  `}
  ${variant === "secondary" &&
  `background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: none;

  &:hover {
    background-color: hsl(var(--secondary)/.8); 
  }
  `}
  ${variant === "destructive" &&
  `background-color: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
  border: none;

  &:hover {
    background-color: hsl(var(--destructive)/.9); 
  }
  `}
  ${variant === "outline" &&
  `background-color: hsl(var(--background));
  border-width: 1px; 
  border-color: #000000; 

  &:hover {
    background-color: hsl(var(--accent)); 
    color: hsl(var(--accent-foreground)); 
  }
  `}
  ${variant === "ghost" &&
  `background-color: hsl(var(--background));
  border: none;

  &:hover {
    background-color: hsl(var(--accent)); 
    color: hsl(var(--accent-foreground));
  }
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
