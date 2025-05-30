'use client';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [warning, setWarning] = useState("");

  function handleOrderNow() {
    if (!isLoaded) return;
    if (user) {
      router.push("/menu");
    } else {
      setWarning("You must be logged in to access the menu.");
    }
  }

  return (
    <main
      className="h-screen w-full bg-cover bg-center bg-no-repeat px-12 sm:px-60"
      style={{ backgroundImage: "url('/assets/LandingPageWallpaper.jpg')" }}
    >
      <div className="flex items-center h-full">
        <div className="text-white max-w-md">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            SUPER <br /> DELICIOUS <br /> BURGER
          </h1>
          <button
            className="bg-white text-black font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition"
            onClick={handleOrderNow}
          >
            ORDER NOW
          </button>
          {warning && (
            <div className="mt-4 bg-yellow-200 text-yellow-900 px-4 py-2 rounded">
              {warning}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
