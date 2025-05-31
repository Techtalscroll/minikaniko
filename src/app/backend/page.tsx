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

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  user_id: string;
  user_name: string;
  items: OrderItem[];
  total_price: number;
  address: string;
  order_type: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState<"menu" | "orders">("menu");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
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

  // Fetch menu items and orders from Supabase
  useEffect(() => {
    if (activePage === "menu") {
      supabase
        .from("menu")
        .select("*")
        .then(({ data }: { data: MenuItem[] | null }) => setMenuItems(data || []));
    }
    if (activePage === "orders") {
      supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }: { data: Order[] | null }) => setOrders(data || []));
    }
  }, [activePage]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("menu-images")
      .upload(`public/${Date.now()}_${file.name}`, file);

    if (error) {
      alert("Image upload failed!");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("menu-images")
      .getPublicUrl(data.path);

    setForm({ ...form, image: urlData.publicUrl });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (Number(form.price) < 0) {
      alert("Price cannot be negative!");
      return;
    }
    if (form.id) {
      await supabase.from("menu").update({
        image: form.image,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        description: form.description,
      }).eq("id", form.id);
    } else {
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

  async function handleDelete(id: number | undefined) {
    if (!id) return;
    await supabase.from("menu").delete().eq("id", id);

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
      id: item.id,
    });
  }

  async function handleConfirmComplete(orderId: number) {
    const { error } = await supabase
      .from("orders")
      .update({ status: "complete" })
      .eq("id", orderId);

    if (error) {
      alert("Failed to update order: " + error.message);
      return;
    }

    // Refresh orders
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
  }

  return (
    <main className="min-h-screen flex bg-gray-100">
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
            activePage === "orders"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActivePage("orders")}
        >
          Admin Order Dashboard
        </button>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 text-black">
        {activePage === "menu" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Menu Management System</h2>
            <form onSubmit={handleSubmit} className="mb-8 bg-white rounded p-4 shadow flex flex-col gap-4 max-w-lg">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border rounded px-3 py-2"
                required={!form.image}
              />
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
        {activePage === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Admin Order Dashboard</h2>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Order ID</th>
                      <th className="px-4 py-2 border">User</th>
                      <th className="px-4 py-2 border">Type</th>
                      <th className="px-4 py-2 border">Address</th>
                      <th className="px-4 py-2 border">Items</th>
                      <th className="px-4 py-2 border">Total Price</th>
                      <th className="px-4 py-2 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="px-4 py-2 border">{order.id}</td>
                        <td className="px-4 py-2 border">{order.user_name}</td>
                        <td className="px-4 py-2 border">{order.order_type}</td>
                        <td className="px-4 py-2 border">{order.address}</td>
                        <td className="px-4 py-2 border">
                          <ul>
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} x{item.quantity} (₱{item.price})
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-4 py-2 border">₱{order.total_price}</td>
                        <td className="px-4 py-2 border">
                          {new Date(order.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
