'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AddressForm(props: any) {
  return (
    <>
      <Header />
      <main
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 md:px-0"
        style={{ backgroundImage: "url('/assets/LandingPageWallpaper.jpg')" }}
      >
        <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-80 rounded p-8 shadow-md">
          {/* Your form JSX goes here */}
          <div className="text-center text-lg text-gray-700">
            Address Form Placeholder
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}