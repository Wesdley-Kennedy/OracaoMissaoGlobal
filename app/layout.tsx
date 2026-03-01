// app/layout.tsx
"use client";

import "./globals.css";
import { customizeSystem } from "@/store/customizeSystem";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const { theme } = customizeSystem();
  return (
    <html lang="pt_br" className={theme ? "dark" : ""}>
      <head>
        <link rel="icon" type="image/jpg" href="/ico.jpg" />

        <title>Contagem de Oração</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
