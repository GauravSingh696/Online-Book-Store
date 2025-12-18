import { useNavigate } from "react-router-dom";

function BookCard({ book, onAddToCart }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div
      className="border border-gray-200 p-5 shadow-md rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
          📖
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
      {book.category && (
        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
          {book.category}
        </span>
      )}
      <div className="flex items-center justify-between mt-4">
        <p className="text-green-600 font-bold text-xl">₹{book.price}</p>
        {book.stock !== undefined && (
          <p className={`text-xs ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {book.stock > 0 ? `In Stock (${book.stock})` : 'Out of Stock'}
          </p>
        )}
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-3 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(book);
        }}
        disabled={book.stock !== undefined && book.stock === 0}
      >
        {book.stock !== undefined && book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}
export default BookCard;
