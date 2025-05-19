import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        {/* Group Members */}
        <div>
          <p className="font-semibold">Group Project by</p>
          <p>Exzur Lat</p>
          <p>Jan Renan Leovido</p>
          <p>Kurt Jerven Panaligan</p>
          <p>Gabriel La Rosa</p>
        </div>

        {/* Bottom Row: Minikaniko and About Us */}
        <div className="flex justify-between items-center text-sm pt-4">
          <span className="text-white">Minikaniko</span>

          <Link href="/about">
            <a className="text-white hover:underline transition duration-200">
              About Us
            </a>
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs pt-2">
          Copyright &copy; {new Date().getFullYear()} – All rights reserved
        </p>
      </div>
    </footer>
  );
}
