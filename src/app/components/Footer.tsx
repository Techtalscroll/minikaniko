import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-4 px-6 text-sm text-center text-gray-600">
      <p>&copy; {new Date().getFullYear()} Minikaniko. All rights reserved.</p>
      <Link href="/about" className="block mt-1 text-gray-600 hover:underline hover:text-black transition">
        About Us
      </Link>
    </footer>
  );
}
