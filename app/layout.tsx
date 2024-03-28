import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./global.css";

// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter ",
});
const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-SpaceGrotesk ",
});

export const metadata: Metadata = {
  title: "devFlow Next",
  description: "a community driven platform ",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignInUrl="/"
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500 ",
        },
      }}
    >
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <html className="dark" lang="en">
        <body className={`${inter.variable} ${SpaceGrotesk.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
