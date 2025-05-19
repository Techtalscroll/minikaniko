'use client';
import ClerkProviderWrapper from './ClerkProviderWrapper';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <ClerkProviderWrapper>
      <header className="bg-black text-white px-10 py-2 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/Logo.jpg"
            alt="Minikaniko Logo"
            width={150}
            height={100}
            className="object-contain"
          />
        </Link>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: "40px",
                    height: "40px",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </header>
    </ClerkProviderWrapper>
  );
}