'use client';
import { useState } from "react";
import Link from "next/link";

export default function AddressForm() {
  const [mode, setMode] = useState<'pickup' | 'deliver'>('pickup');
  const [branch, setBranch] = useState('Branch 1');

  return (
    <>
      <main
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 md:px-0"
        style={{ backgroundImage: "url('/assets/LandingPageWallpaper.jpg')" }}
      >
        <div className="w-full max-w-2xl bg-white bg-opacity-80 rounded p-8 shadow-md mx-auto">
          <div className="flex justify-center mb-8 gap-4">
            <button
              className={`px-6 py-2 rounded font-semibold transition ${
                mode === 'pickup'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
              onClick={() => setMode('pickup')}
            >
              Pick Up
            </button>
            <button
              className={`px-6 py-2 rounded font-semibold transition ${
                mode === 'deliver'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
              onClick={() => setMode('deliver')}
            >
              Deliver
            </button>
          </div>
          <div className="flex justify-center mb-8">
            <select
              value={branch}
              onChange={e => setBranch(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 text-black"
            >
              <option>Branch 1</option>
              <option>Branch 2</option>
              <option>Branch 3</option>
              <option>Branch 4</option>
            </select>
          </div>
          <div className="flex justify-center">
            <Link href="/menu">
              <button className="bg-black text-white px-6 py-2 rounded font-semibold shadow hover:bg-gray-800 transition">
                Go to Menu
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}