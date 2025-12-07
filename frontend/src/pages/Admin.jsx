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

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-2">Admin Area</h2>
        <p>You are not allowed to view this page.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

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
        setMessage("Book added successfully.");
        setTitle("");
        setAuthor("");
        setPrice("");
        setCategory("");
        setStock("");
      })
      .catch(() => setMessage("Something went wrong."));
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        className="w-full max-w-md border p-6 rounded shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin - Add Book</h2>

        {message && (
          <p className="text-sm mb-3 text-green-600 text-center">{message}</p>
        )}

        <label className="block mb-2 text-sm">
          Title
          <input
            className="border w-full p-2 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="block mb-2 text-sm">
          Author
          <input
            className="border w-full p-2 mt-1"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>

        <label className="block mb-2 text-sm">
          Price
          <input
            type="number"
            step="0.01"
            className="border w-full p-2 mt-1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label className="block mb-2 text-sm">
          Category
          <input
            className="border w-full p-2 mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label className="block mb-4 text-sm">
          Stock
          <input
            type="number"
            className="border w-full p-2 mt-1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </label>

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Save Book
        </button>
      </form>
    </div>
  );
}

export default Admin;
