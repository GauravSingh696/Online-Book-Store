import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const location = useLocation();
  const isAdmin = user && user.role === "ADMIN";
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors cursor-pointer">
          📚 BookStore
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md transition-all cursor-pointer hover:bg-blue-500 ${
              isActive("/") ? "bg-blue-500 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={`px-3 py-2 rounded-md transition-all cursor-pointer hover:bg-blue-500 ${
              isActive("/books") ? "bg-blue-500 font-semibold" : ""
            }`}
          >
            Books
          </Link>
          <Link
            to="/cart"
            className={`px-3 py-2 rounded-md transition-all cursor-pointer hover:bg-blue-500 relative ${
              isActive("/cart") ? "bg-blue-500 font-semibold" : ""
            }`}
          >
            Cart 🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-md transition-all cursor-pointer hover:bg-blue-500 ${
                isActive("/admin") ? "bg-blue-500 font-semibold" : ""
              }`}
            >
              Admin
            </Link>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md transition-all cursor-pointer hover:bg-blue-500"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-blue-600 rounded-md transition-all cursor-pointer hover:bg-blue-50 font-semibold"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm">Hi, {user.name}</span>
              <button
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm transition-all cursor-pointer font-semibold"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl cursor-pointer" id="mobile-menu-btn">
          ☰
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
