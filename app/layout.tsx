"use client";
import "./globals.css";
import React from "react";
import { ReduxProvider } from "@/app/providers/redux-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
