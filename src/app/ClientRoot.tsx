'use client';
import ClerkProviderWrapper from './components/ClerkProviderWrapper';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return <ClerkProviderWrapper>{children}</ClerkProviderWrapper>;
}