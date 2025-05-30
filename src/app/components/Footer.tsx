import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <div>
          <p className="font-semibold">Group Project by</p>
          <p>Exzur Lat</p>
          <p>Jan Renan Leovido</p>
          <p>Kurt Jerven Panaligan</p>
          <p>Gabriel La Rosa</p>
        </div>

        <div className="flex justify-between items-center text-base pt-4 flex-wrap gap-y-2">
          <span className="text-white">Minikaniko</span>
          <span className="text-white text-center w-full md:w-auto order-last md:order-none">
            © {new Date().getFullYear()} – All rights reserved
          </span>
          <Link
            href="/about"
            className="text-white hover:underline transition duration-200"
          >
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
