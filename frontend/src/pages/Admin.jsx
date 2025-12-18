import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/API";

function Admin() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white rounded-lg shadow-lg">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Admin Area</h2>
          <p className="text-gray-600">You are not authorized to view this page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const book = {
      title,
      author,
      price: parseFloat(price),
      category,
      stock: parseInt(stock || "0", 10),
    };

    api
      .post("/books", book)
      .then(() => {
        setMessage("Book added successfully! 🎉");
        setTitle("");
        setAuthor("");
        setPrice("");
        setCategory("");
        setStock("");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h2>
            <p className="text-gray-600">Add a new book to the store</p>
          </div>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Fiction, Non-Fiction, Science"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
