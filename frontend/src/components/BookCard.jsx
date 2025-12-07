function BookCard({ book, onAddToCart }) {
  return (
    <div className="border p-3 shadow-md rounded">
      <h3 className="font-bold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-700">{book.author}</p>
      <p className="text-green-600 font-semibold mt-2">₹{book.price}</p>
      <button
        className="bg-blue-500 text-white px-3 py-1 mt-3 rounded"
        onClick={() => onAddToCart(book)}
      >
        Add to Cart
      </button>
    </div>
  );
}
export default BookCard;
