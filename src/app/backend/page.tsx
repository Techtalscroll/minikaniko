'use client';

import { useState } from "react";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState<
    "menu" | "orders1" | "orders2" | "orders3" | "orders4"
  >("menu");

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
            {/* Menu management content goes here */}
            <p>Manage your menu items here.</p>
          </div>
        )}
        {activePage === "orders1" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Lucena Order Dashboard</h2>
            {/* Order dashboard content goes here */}
            <p>View and manage orders here.</p>
          </div>
        )}
                {activePage === "orders2" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mauban Order Dashboard</h2>
            {/* Order dashboard content goes here */}
            <p>View and manage orders here.</p>
          </div>
        )}
                {activePage === "orders3" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Pagbilao Order Dashboard</h2>
            {/* Order dashboard content goes here */}
            <p>View and manage orders here.</p>
          </div>
        )}
                {activePage === "orders4" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">San Papblo Order Dashboard</h2>
            {/* Order dashboard content goes here */}
            <p>View and manage orders here.</p>
          </div>
        )}
      </section>
    </main>
  );
}