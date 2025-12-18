import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/API";
import { useCart } from "../context/CartContext";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setError("");
      })
      .catch(() => {
        setError("Unable to load book details. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading book details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-red-600 mb-4">{error || "Book not found."}</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
          onClick={() => navigate("/books")}
        >
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <button
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden grid md:grid-cols-2 gap-0">
        <div className="bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-10">
          <div className="text-[120px] opacity-40">📖</div>
        </div>

        <div className="p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {book.title}
            </h1>
            <p className="text-lg text-gray-700 mb-2">by {book.author}</p>

            {book.category && (
              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                {book.category}
              </span>
            )}

            <p className="text-2xl font-bold text-green-600 mb-4">₹{book.price}</p>

            {book.stock !== undefined && (
              <p className={`font-semibold mb-4 ${book.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {book.stock > 0 ? `In Stock (${book.stock})` : "Out of Stock"}
              </p>
            )}

            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {book.description && book.description.trim().length > 0
                ? book.description
                : "No description available for this book."}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => addToCart(book)}
              disabled={book.stock !== undefined && book.stock === 0}
            >
              {book.stock !== undefined && book.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold cursor-pointer"
              onClick={() => navigate("/books")}
            >
              Browse More Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;


