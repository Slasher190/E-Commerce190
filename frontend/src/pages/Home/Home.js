import React, { Fragment, useRef } from "react";
import { CgMouse } from "@react-icons/all-files/cg/CgMouse";
import "./Home.css";
import Product from "../../components/Product";

const product = {
  name: "Blue Shirt",
  images: [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/4/46/Manu_and_Saptarishi.jpg",
    },
  ],
  price: "1000",
  _id: "skdfglig937r39rbfef245454",
};
const Home = () => {
  const containerRef = useRef(null);

  const handleScroll = () => {
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <button onClick={handleScroll}>
          Scroll <CgMouse />
        </button>
      </div>
      <h2 className="homeHeading">Featured Product</h2>
      <div className="container" id="container" ref={containerRef}>
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
