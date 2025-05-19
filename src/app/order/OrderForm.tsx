'use client';
import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderForm() {
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send address to your API
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        {submitted ? (
          <div className="text-green-600 font-bold">Address submitted! Thank you.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-gray-100 p-6 rounded shadow">
            <label className="font-semibold">
              Delivery Address:
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="mt-2 p-2 border rounded w-full text-black"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}