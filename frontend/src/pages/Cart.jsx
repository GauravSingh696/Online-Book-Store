import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import api from "../services/API";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    address: "",
  });

  const { user } = useAuth();
  const { items, clearCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const openPayment = () => {
    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    setShowPayment(true);
  };

  const handleConfirmPayment = () => {
    // In a real app, you would send paymentMethod and paymentInfo to backend or payment gateway.
    // For now, we only use them on the frontend and still call the existing /orders API.
    if (paymentMethod === "CARD") {
      const digitsOnlyCard = paymentInfo.cardNumber.replace(/\s+/g, "");
      if (digitsOnlyCard.length !== 16) {
        alert("Card number must be 16 digits.");
        return;
      }
      if (!paymentInfo.expiryDate || !/^(0[1-9]|1[0-2])\/\d{4}$/.test(paymentInfo.expiryDate)) {
        alert("Please enter a valid expiry date in MM/YYYY format.");
        return;
      }
      if (paymentInfo.cvv.length !== 3) {
        alert("CVV must be 3 digits.");
        return;
      }
    }

    const payload = {
      userId: user.id,
      items: items.map((it) => ({
        bookId: it.id,
        quantity: it.quantity,
      })),
    };

    api
      .post("/orders", payload)
      .then(() => {
        alert("Payment successful and order placed! 🎉");
        clearCart();
        setShowPayment(false);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data || "Error placing order. Please try again.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Your Cart 🛒</h2>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/books")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {items.map((it) => (
                  <div key={it.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {it.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">by {it.author}</p>
                        <p className="text-gray-700 font-medium">₹{it.price} each</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            className="px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => updateQuantity(it.id, -1)}
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-semibold">{it.quantity}</span>
                          <button
                            className="px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => updateQuantity(it.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="text-lg font-bold text-gray-800">
                            ₹{it.price * it.quantity}
                          </p>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 px-3 py-1 transition-colors cursor-pointer"
                          onClick={() => removeFromCart(it.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 cursor-pointer mb-3"
                onClick={openPayment}
              >
                Place Order
              </button>
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Payment Details</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="CARD">Credit / Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="COD">Cash on Delivery</option>
              </select>
            </div>

            {paymentMethod === "CARD" && (
              <>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      setPaymentInfo((prev) => ({
                        ...prev,
                        cardNumber: e.target.value.replace(/\D/g, "").slice(0, 16),
                      }))
                    }
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="mb-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date (MM/YYYY)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={paymentInfo.expiryDate}
                      onChange={(e) =>
                        setPaymentInfo((prev) => ({
                          ...prev,
                          expiryDate: e.target.value.slice(0, 7),
                        }))
                      }
                      placeholder="08/2030"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={paymentInfo.cvv}
                      onChange={(e) =>
                        setPaymentInfo((prev) => ({
                          ...prev,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                        }))
                      }
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentInfo.nameOnCard}
                    onChange={(e) =>
                      setPaymentInfo((prev) => ({ ...prev, nameOnCard: e.target.value }))
                    }
                    placeholder="John Doe"
                  />
                </div>
              </>
            )}

            {paymentMethod === "UPI" && (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={paymentInfo.upiId}
                  onChange={(e) =>
                    setPaymentInfo((prev) => ({ ...prev, upiId: e.target.value }))
                  }
                  placeholder="example@upi"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={paymentInfo.address}
                onChange={(e) =>
                  setPaymentInfo((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="House no., Street, City, Pincode"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowPayment(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer"
                onClick={handleConfirmPayment}
              >
                Pay ₹{total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
