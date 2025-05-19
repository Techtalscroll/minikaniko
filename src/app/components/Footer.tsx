import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-center py-4 text-sm text-gray-600">
      <p className="mb-2">&copy; {new Date().getFullYear()} Minikaniko. All rights reserved.</p>
      <Link href="/about">
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
          About Us
        </button>
      </Link>
    </footer>
  );
}
