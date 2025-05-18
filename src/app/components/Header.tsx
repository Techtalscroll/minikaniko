'use client'; // Required for using router.push

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4">
      {/* Logo Button */}
      <button
        onClick={() => router.push('/')}
        className="text-xl font-bold text-gray-800 hover:opacity-80 transition"
      >
        Minikaniko
      </button>

      {/* Login Button */}
      <button
        onClick={() => router.push('/login')}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Login
      </button>
    </header>
  );
}
