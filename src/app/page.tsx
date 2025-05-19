import Link from "next/link";

export default function Home() {
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
          <Link href="/profile">
            <button className="bg-white text-black font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition">
              ORDER NOW
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
