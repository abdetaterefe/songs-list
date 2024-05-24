import { css } from "@emotion/css";
import React, { LabelHTMLAttributes, ReactNode } from "react";

const labelStyles = () => css`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  line-height: 1;
`;

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, ...props }) => (
  <label className={labelStyles()} {...props}>
    {children}
  </label>
);

export default Label;
