import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-4 px-6 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2">
        <p>&copy; {new Date().getFullYear()} Minikaniko. All rights reserved.</p>
        <Link href="/about" className="text-gray-600 hover:underline hover:text-black transition">
          About Us
        </Link>
      </div>
    </footer>
  );
}
