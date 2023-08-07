import { useEffect, useState } from "react";
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
import ForgotPassword from "./pages/User/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword";
import Cart from "./components/Cart";
import ShippingInfo from "./components/Cart/ShippingInfo";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/Order/OrderSuccess";
import OrderDetails from "./components/Cart/Order/OrderDetails";
import MyOrders from "./components/Orders";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/Products/ProductList";
import NewProduct from "./pages/admin/Products/NewProduct";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {
    try {
      const { data } = await axios.get("/api/v1/stripapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {}
  };
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    getStripeApiKey();
    store.dispatch(loadUser());
  }, [stripeApiKey]);
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
        <Route
          exact
          path="/me/update"
          name="Update Profile"
          element={<UpdateProfile />}
        />
        <Route
          exact
          path="/password/update"
          name="Update Password"
          element={<UpdatePassword />}
        />
        <Route
          exact
          path="/password/forgot"
          name="Forgot Password"
          element={<ForgotPassword />}
        />
        <Route
          exact
          path="/password/reset/:token"
          name="Forgot Password Token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" name="Cart" element={<Cart />} />
        <Route
          exact
          path="/shipping"
          name="Shipping Info"
          element={<ShippingInfo />}
        />
        <Route
          exact
          path="/order/confirm"
          name="Confirm Order"
          element={<ConfirmOrder />}
        />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}
        <Route
          exact
          path="/success"
          name="Success"
          element={<OrderSuccess />}
        />
        <Route exact path="/orders" name="My Orders" element={<MyOrders />} />
        <Route
          exact
          path="/order/:id"
          name="Order Details"
          element={<OrderDetails />}
        />
        <Route exact path="/sad" name="Loader" element={<Loader />} />

        <Route
          exact
          path="/admin/dashboard"
          name="Admin Dashboard"
          element={<Dashboard />}
        />
        <Route
          exact
          path="/admin/products"
          name="All Products"
          element={<ProductList />}
        />
        <Route
          exact
          path="/admin/product"
          name="Create Product"
          element={<NewProduct />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
