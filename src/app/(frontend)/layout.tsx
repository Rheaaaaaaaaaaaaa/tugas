import "./styles.css";
import React, { ReactElement } from "react";

interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <html>
    <body className="bg-black text-white">
      {children}
    </body>
  </html>;
}