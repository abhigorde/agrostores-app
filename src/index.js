import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./context/product-context";
import { CartProvider } from "./context/cart-context";
import { WishListProvider } from "./context/wishlist-context";
import { AuthProvider } from "./context/auth-context";
import { AddressProvider } from "./context/address-context";
import { OrdersProvider } from "./context/orders-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <WishListProvider>
          <CartProvider>
            <ProductProvider>
              <AddressProvider>
                <OrdersProvider>
                  <App />
                </OrdersProvider>
              </AddressProvider>
            </ProductProvider>
          </CartProvider>
        </WishListProvider>
      </AuthProvider>
    </Router>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
