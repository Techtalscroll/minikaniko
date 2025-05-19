'use client';
import { useState } from "react";

export default function OrderForm() {
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send address to your API
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="text-green-600 font-bold">Address submitted! Thank you.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
  );
}