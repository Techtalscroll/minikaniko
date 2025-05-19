'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-black shadow-sm flex items-center justify-between px-6 py-4">
      {/* Logo Button */}
      <button
        onClick={() => window.location.href = '/'}
        className="text-xl font-bold text-white-800 hover:opacity-80 transition"
      >
        Minikaniko
      </button>

      {/* Auth Area */}
      <div>
        <SignedOut>
          <SignInButton mode="redirect" redirectUrl="/">
            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
