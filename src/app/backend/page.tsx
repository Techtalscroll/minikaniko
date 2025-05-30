'use client';

import { useState, useEffect, ChangeEvent } from "react";
import { supabase } from "../../../lib/supabaseClient";

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
  const [form, setForm] = useState<{
    id: number | undefined;
    image: string;
    name: string;
    category: string;
    price: string;
    description: string;
  }>({
    id: undefined,
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
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle file upload to Supabase Storage
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("menu-images")
      .upload(`public/${Date.now()}_${file.name}`, file);

    if (error) {
      alert("Image upload failed!");
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("menu-images")
      .getPublicUrl(data.path);

    setForm({ ...form, image: urlData.publicUrl });
  }

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (Number(form.price) < 0) {
      alert("Price cannot be negative!");
      return;
    }
    if (form.id) {
      // Update
      await supabase.from("menu").update({
        image: form.image,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        description: form.description,
      }).eq("id", form.id);
    } else {
      // Insert
      await supabase.from("menu").insert([
        {
          image: form.image,
          name: form.name,
          category: form.category,
          price: Number(form.price),
          description: form.description,
        },
      ]);
    }
    setForm({ id: undefined, image: "", name: "", category: "", price: "", description: "" });
    const { data } = await supabase.from("menu").select("*");
    setMenuItems(data || []);
  }

  // Handle delete
  async function handleDelete(id: number | undefined) {
    if (!id) return;
    await supabase.from("menu").delete().eq("id", id);
    // Refresh menu items
    const { data } = await supabase.from("menu").select("*");
    setMenuItems(data || []);
  }

  function handleEdit(item: MenuItem) {
    setForm({
      image: item.image,
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: item.description,
      id: item.id, // Add id to form for editing
    });
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
              {/* File picker for image */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border rounded px-3 py-2"
                required={!form.image}
              />
              {/* Show preview if image is uploaded */}
              {form.image && (
                <img src={form.image} alt="Preview" className="w-24 h-24 object-cover rounded" />
              )}
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                <option value="Burger">Burger</option>
                <option value="Drinks">Drinks</option>
                <option value="Sides">Sides</option>
                <option value="Other Options">Other Options</option>
              </select>
              <input
                name="price"
                placeholder="Price"
                type="number"
                min="0"
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
                {form.id ? "Update Menu Item" : "Add Menu Item"}
              </button>
            </form>
            <div>
              <h3 className="font-bold mb-2">Current Menu Items:</h3>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.id} className="mb-2 border-b pb-2 flex items-center gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <span className="font-semibold">{item.name}</span> — {item.category} — ₱{item.price}
                      <br />
                      <span className="text-sm">{item.description}</span>
                    </div>
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
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
