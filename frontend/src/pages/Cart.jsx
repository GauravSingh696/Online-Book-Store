import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import api from "../services/API";

function Cart() {
  const { user } = useAuth();
  const { items, clearCart } = useCart();

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const placeOrder = () => {
    if (!user) {
      alert("Please login first.");
      return;
    }
    if (items.length === 0) {
      alert("Cart is empty");
      return;
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
        alert("Order placed!");
        clearCart();
      })
      .catch(() => alert("Error placing order"));
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart 🛒</h2>

      {items.length === 0 && <p>No items added</p>}

      {items.length > 0 && (
        <>
          <table className="w-full border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id}>
                  <td className="border p-2">{it.title}</td>
                  <td className="border p-2 text-center">{it.quantity}</td>
                  <td className="border p-2 text-center">₹{it.price}</td>
                  <td className="border p-2 text-center">
                    ₹{it.price * it.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Total: ₹{total}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default Cart;
