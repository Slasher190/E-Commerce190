import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import { useLocation } from "react-router-dom";
import { Pagination, Slider } from "@mui/material";
import Typography from "@material-ui/core/Typography";

const temp = new Set();
const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    // error,
    productsCount,
    productsPerPage,
    filteredProductCount,
    // totalPages,
    // currentPage,
  } = useSelector((state) => state.products);
  const [currentPage_, setCurrentPage] = useState(1);
  const [numberOfProducts, setNumberOfProducts] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(5);
  const [price, setPrice] = useState([0, 25000]);
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  products?.map((item) => {
    temp.add(item.category);
  });
  const categories = Array.from(temp);
  useEffect(() => {
    if (filteredProductCount) {
      setCount(filteredProductCount);
    }
    if (productsPerPage) {
      setResultPerPage(parseInt(productsPerPage));
    }
    if (productsCount) {
      setNumberOfProducts(productsCount);
    }
  }, [productsPerPage, productsCount, count]);
  const handlePageChange = (e, v) => {
    setCurrentPage(v);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const queryParams = new URLSearchParams(location.search);
  const paramsObject = Object.fromEntries(queryParams.entries());
  const updatedParamsObject = {
    ...paramsObject,
    page: currentPage_,
    perPage: resultPerPage,
    price: price.join("-"),
    filter: category,
  };
  // {
  //   (search = ""), (filter = ""), (page = 1), (perPage = 5);
  // }
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentPage(1); // Reset the current page to 1 when a category is selected
    setSelectedCategory(selectedCategory);
  };
  useEffect(() => {
    dispatch(getProduct(updatedParamsObject));
  }, [
    dispatch,
    currentPage_,
    resultPerPage,
    numberOfProducts,
    currentPage_,
    price,
    count,
    category,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
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
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography> Categories </Typography>
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
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                count={Math.ceil(numberOfProducts / resultPerPage)}
                page={parseInt(currentPage_)}
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
