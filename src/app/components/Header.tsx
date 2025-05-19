// components/Header.tsx
'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-2 flex items-center justify-between">
      <Link href="/">
        <Image
          src="/assets/Logo.jpg"
          alt="Minikaniko Logo"
          width={180}
          height={40}
          className="object-contain"
        />
      </Link>
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-black px-7 py-3 rounded hover:bg-gray-200">
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
