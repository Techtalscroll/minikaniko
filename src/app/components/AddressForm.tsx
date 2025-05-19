// src/app/components/AddressForm.tsx
"use client";

import { useState } from "react";

export default function AddressForm() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    setLoading(false);
    setSuccess(res.ok);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Address"}
      </button>
      {success && <p className="text-green-600">Address saved!</p>}
    </form>
  );
}
