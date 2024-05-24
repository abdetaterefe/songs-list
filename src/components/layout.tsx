import { css } from "@emotion/css";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        height: 100vh;
      `}
    >
      <div
        className={css`
          flex: 1 1 0%;
        `}
      >
        {children}
      </div>
    </div>
  );
}
