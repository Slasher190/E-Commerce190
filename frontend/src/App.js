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
import Search from "./components/Search";
// import LoginSignUp from "./pages/User/LoginSignUp/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/UserOptions";
import { useSelector } from "react-redux";
import LoginSignUp from "./pages/User/LoginSignUp";
import Profile from "./pages/User/Profile";
import UpdateProfile from "./pages/User/UpdateProfile";
import UpdatePassword from "./pages/User/UpdatePassword";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" name="Home" element={<Home />} />
        <Route
          exact
          path="/product/:id"
          name="Product"
          element={<ProductDetails />}
        />
        <Route exact path="/products" name="Products" element={<Products />} />
        <Route
          path="/products/:params/*"
          name="Products"
          element={<Products />}
        />
        <Route exact path="/search" name="Search" element={<Search />} />
        <Route exact path="/login" name="Login" element={<LoginSignUp />} />
        <Route exact path="/account" name="Account" element={<Profile />} />
        <Route exact path="/me/update" element={<UpdateProfile />} />
        <Route exact path="/password/update" element={<UpdatePassword />} />
        <Route exact path="/sad" name="Loader" element={<Loader />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
