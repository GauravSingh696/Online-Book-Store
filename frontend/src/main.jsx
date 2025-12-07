import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";   // <---
import { CartProvider } from "./context/CartContext";   // <---

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>              {/* Provider MUST wrap App */}
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);
