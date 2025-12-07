import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import api from "../services/API";
import { useCart } from "../context/CartContext";

function Books() {
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onAddToCart={addToCart} />
      ))}
    </div>
  );
}
export default Books;
