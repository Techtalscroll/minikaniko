import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Other components and content of your page */}

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        {/* Left side: About Us button */}
        <div>
          <Link href="/about">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
              About Us
            </button>
          </Link>
        </div>

        {/* Middle: Group Members */}
        <div>
          <p className="font-semibold">Group Project by</p>
          <p>Exzur Lat</p>
          <p>Jan Renan Leovido</p>
          <p>Kurt Jerven Panaligan</p>
          <p>Gabriel La Rosa</p>
        </div>

        {/* Right side: Copyright */}
        <div className="text-sm">
          <p>
            Copyright &copy; {new Date().getFullYear()} – All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
