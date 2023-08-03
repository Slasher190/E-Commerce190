import React, { Fragment, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../MetaData/MetaData";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");
  // const [page, setPage] = useState("");
  // const [perPage, setPerPage] = useState("");

  const searchSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      const queryParams = new URLSearchParams();

      if (keyword.trim()) {
        queryParams.set("search", keyword);
      }

      if (filter.trim()) {
        queryParams.set("filter", filter);
      }

      // if (page !== 1) {
      //   queryParams.set("page", page);
      // }

      // if (perPage !== 10) {
      //   queryParams.set("perPage", perPage);
      // }

      const queryString = queryParams.toString();
      const url = queryString ? `/products?${queryString}` : "/products";

      navigate(url);
    },
    [
      keyword,
      filter,
      //  page,
      //  perPage,
      navigate,
    ]
  );

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter ..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Page ..."
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Per Page ..."
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        /> */}
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
