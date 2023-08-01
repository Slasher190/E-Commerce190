import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import { useLocation } from "react-router-dom";
import { Pagination, Slider } from "@mui/material";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../../components/MetaData/MetaData";

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useAlert();

  const {
    products,
    loading,
    productsCount,
    productsPerPage,
    filteredProductCount,
    error,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfProducts, setNumberOfProducts] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(5);
  const [price, setPrice] = useState([0, 25000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = Array.from(
    new Set(products?.map((item) => item.category))
  );

  useEffect(() => {
    if (filteredProductCount) {
      setNumberOfProducts(filteredProductCount);
    }
    if (productsPerPage) {
      setResultPerPage(parseInt(productsPerPage));
    }
    if (productsCount) {
      setNumberOfProducts(productsCount);
    }
  }, [filteredProductCount, productsPerPage, productsCount]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handleCategoryClick = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    const queryParams = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(queryParams.entries());
    const updatedParamsObject = {
      ...paramsObject,
      page: currentPage,
      perPage: resultPerPage,
      price: price.join("-"),
      filter: selectedCategory,
      rating: rating,
    };

    dispatch(getProduct(updatedParamsObject));
  }, [
    dispatch,
    currentPage,
    resultPerPage,
    price,
    selectedCategory,
    location.search,
    rating,
    alert,
    error,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCT'S -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              <li
                className={`category-link ${
                  selectedCategory === "" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("")}
              >
                All
              </li>
              {categories.map((category) => (
                <li
                  className={`category-link ${
                    category === selectedCategory ? "active" : ""
                  }`}
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => setRating(newRating)}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {resultPerPage < numberOfProducts && (
            <div className="paginationBox">
              <Pagination
                count={Math.ceil(numberOfProducts / resultPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "tomato",
                    color: "white",
                  },
                }}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
