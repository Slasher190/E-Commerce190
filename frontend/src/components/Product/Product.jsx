import React from "react";
import { Link } from "react-router-dom";
import ReactStar from "react-rating-stars-component";
import './Product.css'

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  value: 2.5,
  size: window.innerWidth < 600 ? 20 : 25,
  isHalf: true,
};
const Product = ({ product }) => {
  return (
    <Link className="productCard" to={product?._id}>
      <img src={product?.images[0].url} alt={product?.name} />
      <p>{product?.name}</p>
      <div>
        <ReactStar {...options} />
        <span>(256 Reviews)</span>
      </div>
      <span>{product?.price}</span>
    </Link>
  );
};
export default Product;