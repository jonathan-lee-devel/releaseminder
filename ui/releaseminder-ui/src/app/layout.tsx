import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "@/app/components/ThemeProvider";
import {Toaster} from "@/components/ui/toaster"
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ReleaseMinder",
  description: "Software Development - Project planning and release tracking software",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main>
        <Navbar/>
          {children}
        <Footer/>
      </main>
      <Toaster/>
    </ThemeProvider>
    </body>
    </html>
  );
}
