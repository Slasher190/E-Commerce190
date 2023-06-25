import { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
