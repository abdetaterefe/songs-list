import { css } from "@emotion/css";
import React, { TextareaHTMLAttributes } from "react";

const textareStyles = () => css`
  display: flex;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 0.375rem;
  border-width: 1px;
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...props }, ref) => (
    <textarea className={textareStyles()} {...props} ref={ref} />
  )
);

export default Textarea;
