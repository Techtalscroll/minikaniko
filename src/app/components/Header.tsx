'use client';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { user } = useUser();

  // List of allowed admin user IDs
  const adminUserIds = ["user_2xI04m4SHvM9JyKPQ9BlV5V1DNT"];

  return (
    <header className="bg-black text-white px-10 py-2 flex items-center justify-between">
      <div className="flex items-center gap-6 w-full">
        <Link href="/">
          <Image
            src="/assets/Logo.jpg"
            alt="Minikaniko Logo"
            width={150}
            height={100}
            className="object-contain"
          />
        </Link>
        {/* Centered Backend button as plain text */}
        <div className="flex-1 flex justify-center">
          <SignedIn>
            {user && adminUserIds.includes(user.id) && (
              <Link href="/backend" className="text-white font-semibold hover:underline transition">
                ADMIN TOOLS
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200">
              Login
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2">
            <span className="font-semibold whitespace-nowrap">
              {user?.firstName} {user?.lastName}
            </span>
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
            
          </div>
        </SignedIn>
      </div>
    </header>
  );
}