import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guav",
  description: "Video Calling App",
  icons:{
    icon :'/icons/logo.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/yoom-logo.svg",
          socialButtonsVariant: "iconButton",
        },
        baseTheme: dark,
        variables: {
          colorPrimary: "#3377FF",
          colorBackground: "#1C1F2E",
          colorText: "#fff",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
          fontSize: "14px"
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
