import { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import ProductDetails from "./components/ProductDetails";
import Products from "./pages/Products";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" name="Home" element={<Home />} />
        <Route
          exact
          path="/product/:id"
          name="Product"
          element={<ProductDetails />}
        />
        <Route
          exact
          path="/products"
          name="Products"
          element={<Products />}
        />
        <Route exact path="/sad" name="Loader" element={<Loader />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
