// filepath: c:\Users\Exzur\minikaniko\src\app\layout.tsx
import './globals.css';
import Header from './components/Header';
import type { Metadata } from 'next';
import Footer from './components/Footer';
import ClerkProviderWrapper from './components/ClerkProviderWrapper';

export const metadata: Metadata = {
  title: 'Minikaniko',
  description: 'bla bla bla',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProviderWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}