import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">{children}</div>
    </div>
  );
}
