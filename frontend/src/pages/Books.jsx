import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import api from "../services/API";
import { useCart } from "../context/CartContext";

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    api
      .get("/books")
      .then((res) => {
        setBooks(res.data);
        setFilteredBooks(res.data);
      })
      .catch((err) => console.error("Error fetching books:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...books];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((book) => book.category === categoryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, sortBy, categoryFilter]);

  const categories = ["all", ...new Set(books.map((b) => b.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Book Collection</h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4 md:flex md:space-y-0 md:gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories
            .filter((cat) => cat !== "all")
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>
        <select
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-gray-600 mb-6">
        Showing {filteredBooks.length} of {books.length} books
      </p>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-600">No books found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((b) => (
            <BookCard key={b.id} book={b} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Books;
