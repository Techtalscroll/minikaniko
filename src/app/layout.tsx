// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Header from './components/Header';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import Footer from './components/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Website',
  description: 'With Clerk auth',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
