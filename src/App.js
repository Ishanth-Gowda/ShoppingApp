import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";

import Navbar from "./components/Navbar";
import GoTop from "./components/GoTop";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    // Add basename for GitHub Pages
    <Router basename="/ShoppingApp">
      <UserProvider>
        <CartProvider>
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <GoTop />
          <footer className="footer">
            <p>© {new Date().getFullYear()} The Shopping Store — All rights reserved</p>
          </footer>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}