import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Book Store 📚
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover Your Next Great Read at Amazing Prices
          </p>
          <Link
            to="/books"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Browse Books →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices on all books</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Thousands of books across all genres</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Start Reading?</h2>
          <p className="text-gray-600 mb-8">Explore our collection of amazing books</p>
          <Link
            to="/books"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
export default Home;
