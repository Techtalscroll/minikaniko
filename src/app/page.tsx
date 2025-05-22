'use client';
import { useState } from "react";
import AddressForm from "./order/Order";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

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
            onClick={() => setShowForm(true)}
          >
            ORDER NOW
          </button>
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded shadow-lg max-w-md w-full relative">
                <button
                  className="absolute top-2 right-2 text-black text-xl"
                  onClick={() => setShowForm(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <AddressForm />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}