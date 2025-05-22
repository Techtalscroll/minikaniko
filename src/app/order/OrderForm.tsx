'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderForm() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4 md:px-0">
        <div className="w-full max-w-2xl mx-auto">
          {/* Order form removed. Add your content here if needed. */}
          <div className="text-center text-lg text-gray-500 py-20">
            Order page placeholder
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}