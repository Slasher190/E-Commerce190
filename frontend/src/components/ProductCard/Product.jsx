import { Link } from "react-router-dom";
import ReactStar from "react-rating-stars-component";
import "./Product.css";

export default function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product?.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <Link className="productCard" to={`/product/${product?._id}`}>
      <img src={product?.images[0].url} alt={product?.name} />
      <p>{product?.name}</p>
      <div>
        <ReactStar {...options} />
        <span>({product?.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product?.price}`}</span>
    </Link>
  );
}
