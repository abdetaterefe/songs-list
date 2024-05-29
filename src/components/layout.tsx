import { css } from "@emotion/css";
import { ReactNode } from "react";
import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <Navbar />
      {children}
    </div>
  );
}
