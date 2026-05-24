import type { Metadata } from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SentryProvider } from "@/components/sentry-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'VibeCode - AI-Native IDE',
  description: 'VibeCode is an AI-native IDE forked from VS Code, supercharging your development with AI-powered features.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className="min-h-screen bg-[#0a0a0f] text-[#e4e4e7] antialiased flex flex-col">
        <SentryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SentryProvider>
      </body>
    </html>
  );
}
