import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const isAdmin = user && user.role === "ADMIN";

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">BookStore</Link>
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/cart">Cart</Link>

        {isAdmin && <Link to="/admin">Admin</Link>}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm">Hi, {user.name}</span>
            <button
              className="bg-red-500 px-2 py-1 rounded text-sm"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
