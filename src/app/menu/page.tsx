'use client';

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useUser } from "@clerk/clerk-react"; // If using Clerk

type MenuItem = {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

type CartItem = {
  item: MenuItem;
  quantity: number;
};

const categories = ["Burger", "Drinks", "Sides", "Other Options"];

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Burger");
  // For demo, cart is just a count
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [addressList, setAddressList] = useState<string[]>([""]);
  const [address, setAddress] = useState("");
  const [pickupLocation, setPickupLocation] = useState('');
  const { user } = useUser();
  const userId = user?.id;

  const pickupLocations = [
    "WJVH+Q7W, Lucena City, 4301 Quezon",
    "XMCM+C87, J.P. Rizal, Pagbilao, 4302 Quezon",
    "Sabang, Mauban, 4330 Quezon",
    "Block 22 Lot 11, Welmanville II Subdivision, Lucena City, 4301 Quezon"
  ];

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase.from("menu").select("*");
      if (!error && data) setMenuItems(data as MenuItem[]);
    }
    fetchMenu();
  }, []);

  useEffect(() => {
    if (!userId) return;
    async function fetchAddresses() {
      const { data, error } = await supabase
        .from("user_addresses")
        .select("address")
        .eq("user_id", userId);
      if (!error && data) {
        setAddressList(data.map(row => row.address));
      }
    }
    fetchAddresses();
  }, [userId]);

  // Save address list to localStorage on change
  useEffect(() => {
    localStorage.setItem("addressList", JSON.stringify(addressList));
  }, [addressList]);

  // Filter menu items by selected category
  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  function handleAddToCart(item: MenuItem) {
    setCart((prev) => {
      const idx = prev.findIndex((ci) => ci.item.id === item.id);
      if (idx > -1) {
        // Item already in cart, increment quantity
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      }
      // New item
      return [...prev, { item, quantity: 1 }];
    });
  }

  function handleRemoveFromCart(idx: number) {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleQuantityChange(idx: number, value: number) {
    if (value === 0) {
      handleRemoveFromCart(idx);
    } else if (value > 0 && !isNaN(value)) {
      setCart((prev) => {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: value };
        return updated;
      });
    }
  }

  // Handler for adding a new address
  async function handleAddAddress() {
    const newAddress = prompt("Enter new delivery address:");
    if (newAddress && !addressList.includes(newAddress) && userId) {
      // Save to Supabase
      const { error } = await supabase
        .from("user_addresses")
        .insert([{ user_id: userId, address: newAddress }]);
      if (!error) {
        setAddressList(prev => [...prev, newAddress]);
        setAddress(newAddress);
      }
    }
  }

  async function handleCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (orderType === "delivery" && !address) {
      alert("Please select a delivery address.");
      return;
    }
    if (orderType === "pickup" && !pickupLocation) {
      alert("Please select a pickup location.");
      return;
    }

    // Get Clerk user info
    const userName = user?.fullName || user?.username || user?.emailAddresses?.[0]?.emailAddress || "Unknown";

    // Prepare order data
    const orderData = {
      user_id: userId,
      user_name: userName,
      order_type: orderType,
      address: orderType === "delivery" ? address : null,
      pickup_location: orderType === "pickup" ? pickupLocation : null,
      items: cart.map(ci => ({
        id: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
      })),
      branch: orderType === "pickup" ? pickupLocation : (pickupLocation || "N/A"),
    };

    // Save to Supabase
    const { error } = await supabase.from("orders").insert([orderData]);
    if (error) {
      alert("Failed to place order.\n" + JSON.stringify(error, null, 2));
      return;
    }
    alert("Order placed successfully!");
    setCart([]);
    setAddress("");
    setPickupLocation("");
  }

  return (
    <main
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/LandingPageWallpaper.jpg')" }}
    >
      {/* Mobile Categories Header */}
      <div className="md:hidden bg-black w-full flex overflow-x-auto gap-2 px-2 py-3 sticky top-0 z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-600"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex w-full min-h-screen bg-black/40">
        {/* Categories Sidebar (desktop only) */}
        <aside className="hidden md:flex w-0.5/5 bg-black/50 p-6 flex-col gap-2">
          <h2 className="font-bold mb-2 text-white">Categories</h2>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded font-semibold transition ${
                selectedCategory === cat
                  ? "bg-white text-black"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* Menu Items */}
        <section className="flex-1 p-4 md:p-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.length === 0 && (
              <div className="text-white col-span-2">No items in this category.</div>
            )}
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded mb-2"
                  />
                )}
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-600">₱{item.price}</div>
                <div className="text-xs text-gray-500 mb-2">{item.category}</div>
                <div className="text-sm text-gray-700 mb-2">{item.description}</div>
                <button
                  className="mt-2 bg-black text-white px-3 py-1 rounded"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Sidebar (desktop only) */}
        <aside className="hidden md:flex w-1/4 bg-black/50 p-6 flex-col gap-4">
          <h2 className="font-bold mb-2">Cart</h2>
          {cart.length === 0 && <div className="text-gray-500">Cart is empty.</div>}
          {cart.map((cartItem, idx) => (
            <div key={cartItem.item.id} className="flex justify-between items-center border-b pb-2 gap-2">
              <span>{cartItem.item.name}</span>
              <input
                type="number"
                min={1}
                className="w-12 text-center border rounded"
                value={cartItem.quantity}
                onChange={e => handleQuantityChange(idx, parseInt(e.target.value, 10))}
              />
              <span>₱{cartItem.item.price * cartItem.quantity}</span>
              <button
                className="text-red-600 hover:underline text-xs"
                onClick={() => handleRemoveFromCart(idx)}
              >
                Remove
              </button>
            </div>
          ))}
          {/* Cart total */}
          <div className="mt-auto font-bold">
            Total: ₱{cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0)}
          </div>
          {/* Order Type Buttons */}
          <div className="flex gap-2 mt-4 mb-2">
            <button
              type="button"
              className={`px-4 py-2 rounded font-semibold transition ${
                orderType === 'delivery'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-black border border-green-600'
              }`}
              onClick={() => setOrderType('delivery')}
            >
              Delivery
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded font-semibold transition ${
                orderType === 'pickup'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-black border border-green-600'
              }`}
              onClick={() => setOrderType('pickup')}
            >
              Pick-up
            </button>
          </div>
          {/* Conditional input for address or pickup location */}
          {orderType === 'delivery' ? (
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="bg-black text-white px-2 py-1 rounded text-lg"
                  onClick={handleAddAddress}
                  title="Add new address"
                >
                  +
                </button>
                <select
                  className="flex-1 border rounded px-3 py-2"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                >
                  <option value="">Select delivery address</option>
                  {addressList.filter(a => a).map(addr => (
                    <option key={addr} value={addr}>{addr}</option>
                  ))}
                </select>
              </div>
              <select
                className="w-full border rounded px-3 py-2 mt-2"
                value={pickupLocation}
                onChange={e => setPickupLocation(e.target.value)}
                required
              >
                <option value="">Select branch location</option>
                {pickupLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          ) : (
            <select
              className="w-full border rounded px-3 py-2 mb-2"
              value={pickupLocation}
              onChange={e => setPickupLocation(e.target.value)}
              required
            >
              <option value="">Select pickup location</option>
              {pickupLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          )}
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-2 w-full"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </aside>
      </div>

      {/* Mobile Cart Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t flex items-center justify-between px-4 py-3 z-20">
        <span className="font-semibold">
          {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
        </span>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowCart((v) => !v)}
        >
          View Cart
        </button>
      </div>

      {/* Simple Mobile Cart Modal */}
      {showCart && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30 flex flex-col">
          <div className="bg-black rounded-t-lg p-6 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Cart</h2>
              <button onClick={() => setShowCart(false)} className="text-xl font-bold">&times;</button>
            </div>
            {cart.length === 0 && <div className="text-gray-500">Cart is empty.</div>}
            {cart.map((cartItem, idx) => (
              <div key={cartItem.item.id} className="flex justify-between items-center border-b pb-2 gap-2">
                <span>{cartItem.item.name}</span>
                <input
                  type="number"
                  min={1}
                  className="w-12 text-center border rounded"
                  value={cartItem.quantity}
                  onChange={e => handleQuantityChange(idx, parseInt(e.target.value, 10))}
                />
                <span>₱{cartItem.item.price * cartItem.quantity}</span>
                <button
                  className="text-red-400 hover:underline text-xs"
                  onClick={() => handleRemoveFromCart(idx)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4 font-bold">
              Total: ₱{cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0)}
            </div>
            <div className="flex gap-2 mt-4 mb-2">
              <button
                type="button"
                className={`px-4 py-2 rounded font-semibold transition ${
                  orderType === 'delivery'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-black border border-green-600'
                }`}
                onClick={() => setOrderType('delivery')}
              >
                Delivery
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded font-semibold transition ${
                  orderType === 'pickup'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-black border border-green-600'
                }`}
                onClick={() => setOrderType('pickup')}
              >
                Pick-up
              </button>
            </div>
            {/* Conditional input for address or pickup location */}
            {orderType === 'delivery' ? (
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  className="bg-black text-white px-2 py-1 rounded text-lg"
                  onClick={handleAddAddress}
                  title="Add new address"
                >
                  +
                </button>
                <select
                  className="flex-1 border rounded px-3 py-2"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                >
                  <option value="">Select delivery address</option>
                  {addressList.filter(a => a).map(addr => (
                    <option key={addr} value={addr}>{addr}</option>
                  ))}
                </select>
              </div>
            ) : (
              <select
                className="w-full border rounded px-3 py-2 mb-2"
                value={pickupLocation}
                onChange={e => setPickupLocation(e.target.value)}
                required
              >
                <option value="">Select pickup location</option>
                {pickupLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            )}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}