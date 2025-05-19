// components/Header.tsx
'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
      <Link href="/">
        <h1 className="text-xl font-bold">Minikaniko</h1>
      </Link>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
