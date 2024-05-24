import { css } from "@emotion/css";
import React, { InputHTMLAttributes } from "react";

const inputStyles = () => css`
  display: flex;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 0.375rem;
  border-width: 1px;
  width: 100%;
  height: 2.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ type, ...props }) => (
  <input type={type} className={inputStyles()} {...props} />
);

export default Input;
