import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const item = {
    product: "productID",
    price: 500,
    name: "Adidas",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1690705556114-539a7d57f2d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  };
  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        <div className="cartContainer">
          <CartItemCard item={item} />
          <div className="cartInput">
            <button>-</button>
            <input type="number" value={item.quantity} readOnly />
            <button>+</button>
          </div>
          <p className="cartSubtotal">{`$ ${item.price * item.quantity}`}</p>
        </div>
        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Table</p>
            <p>{`$600`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button>Check Out</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
