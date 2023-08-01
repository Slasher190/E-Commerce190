import React, { Fragment, useEffect, useRef } from "react";
import { CgMouse } from "@react-icons/all-files/cg/CgMouse";
import "./Home.css";
import Product from "../../components/ProductCard";
import MetaData from "../../components/MetaData/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../actions/productAction";

const Home = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const alert = useAlert();
  const {
    loading,
    products,
    // productsCount,
    // filteredProductCount,
    // currentPage,
    // productsPerPage,
    // totalPages
    error,
  } = useSelector((state) => state.products);
  useEffect(() => {
    // const query = { search, filter, page, perPage };
    // /products?filter=electronics
    // page = 1,2,3,
    // search mob...
    // perPage = 10,8 ...products
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  const handleScroll = () => {
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {loading ? (
        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        <Fragment>
          <MetaData title="E-Commerce" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <button onClick={handleScroll}>
              Scroll <CgMouse />
            </button>
          </div>
          <h2 className="homeHeading">Featured Product</h2>
          <div className="container" id="container" ref={containerRef}>
            {products &&
              products.map((product) => (
                <Product product={product} key={product?._id} />
              ))}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;
