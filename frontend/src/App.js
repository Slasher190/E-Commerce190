import { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { HashRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" name="Home" element={<Home />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
