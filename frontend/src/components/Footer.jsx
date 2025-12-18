import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">📚 BookStore</h3>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for amazing books at great prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-white transition-colors cursor-pointer">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors cursor-pointer">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/login" className="hover:text-white transition-colors cursor-pointer">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-400">
              Email: support@bookstore.com
              <br />
              Phone: +91 123-456-7890
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Book Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
