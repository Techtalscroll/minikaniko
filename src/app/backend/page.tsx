'use client';

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type MenuItem = {
  id?: number;
  image: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState<
    "menu" | "orders1" | "orders2" | "orders3" | "orders4"
  >("menu");

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState({
    image: "",
    name: "",
    category: "",
    price: "",
    description: "",
  });

  // Fetch menu items from Supabase
  useEffect(() => {
    if (activePage === "menu") {
      supabase
        .from("menu")
        .select("*")
        .then(({ data }: { data: MenuItem[] | null }) => setMenuItems(data || []));
    }
  }, [activePage]);

  // Handle form input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from("menu").insert([
      {
        ...form,
        price: Number(form.price),
      },
    ]);
    setForm({ image: "", name: "", category: "", price: "", description: "" });
    // Refresh menu items
    const { data } = await supabase.from("menu").select("*");
    setMenuItems(data || []);
  }

  return (
    <main className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col p-6 gap-4">
        <button
          className={`text-left px-4 py-2 rounded font-semibold transition ${
            activePage === "menu"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActivePage("menu")}
        >
          Menu Management System
        </button>
        <button
          className={`text-left px-4 py-2 rounded font-semibold transition ${
            activePage === "orders1"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActivePage("orders1")}
        >
          Lucena Order Dashboard
        </button>
        <button
          className={`text-left px-4 py-2 rounded font-semibold transition ${
            activePage === "orders2"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActivePage("orders2")}
        >
          Mauban Order Dashboard
        </button>
        <button
          className={`text-left px-4 py-2 rounded font-semibold transition ${
            activePage === "orders3"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActivePage("orders3")}
        >
          Pagbilao Order Dashboard
        </button>
        <button
          className={`text-left px-4 py-2 rounded font-semibold transition ${
            activePage === "orders4"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActivePage("orders4")}
        >
          San Pablo Order Dashboard
        </button>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 text-black">
        {activePage === "menu" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Menu Management System</h2>
            <form onSubmit={handleSubmit} className="mb-8 bg-white rounded p-4 shadow flex flex-col gap-4 max-w-lg">
              <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="price"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Add Menu Item
              </button>
            </form>
            <div>
              <h3 className="font-bold mb-2">Current Menu Items:</h3>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.id} className="mb-2 border-b pb-2">
                    <span className="font-semibold">{item.name}</span> — {item.category} — ₱{item.price}
                    <br />
                    <span className="text-sm">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activePage === "orders1" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Lucena Order Dashboard</h2>
            <p>View and manage orders here.</p>
          </div>
        )}
        {activePage === "orders2" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mauban Order Dashboard</h2>
            <p>View and manage orders here.</p>
          </div>
        )}
        {activePage === "orders3" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Pagbilao Order Dashboard</h2>
            <p>View and manage orders here.</p>
          </div>
        )}
        {activePage === "orders4" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">San Pablo Order Dashboard</h2>
            <p>View and manage orders here.</p>
          </div>
        )}
      </section>
    </main>
  );
}
