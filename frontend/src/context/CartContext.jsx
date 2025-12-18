import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (book) => {
    setItems((prev) => {
      const exist = prev.find((it) => it.id === book.id);
      if (exist) {
        return prev.map((it) =>
          it.id === book.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setItems((prev) => prev.filter((it) => it.id !== bookId));
  };

  const updateQuantity = (bookId, change) => {
    setItems((prev) => {
      return prev
        .map((it) => {
          if (it.id === bookId) {
            const newQuantity = it.quantity + change;
            return newQuantity > 0 ? { ...it, quantity: newQuantity } : null;
          }
          return it;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
