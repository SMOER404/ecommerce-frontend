import React from 'react';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/shared/components/theme-provider';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import './globals.css';
import { AuthProvider } from '@/shared/components/auth-provider';
import Script from 'next/script';
import { StoreProvider } from '@/shared/hooks/use-store';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#007AFF',
};

export const metadata: Metadata = {
  title: 'POIZON MARKET',
  description: 'Ваш надежный партнер в мире моды',
  manifest: '/manifest.json',
  icons: [
    {
      url: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      url: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <StoreProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
