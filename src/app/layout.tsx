import './globals.css';
import Header from './components/Header';
import type { Metadata } from 'next';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Minikaniko',
  description: 'bla bla bla',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}