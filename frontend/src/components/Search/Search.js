import React, { Fragment, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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

      if (page !== 1) {
        queryParams.set("page", page);
      }

      if (perPage !== 10) {
        queryParams.set("perPage", perPage);
      }

      const queryString = queryParams.toString();
      const url = queryString ? `/products?${queryString}` : "/products";
      console.log(url, "hello world Infinte Wrold");

      navigate(url);
    },
    [keyword, filter, page, perPage, navigate]
  );

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Filter ..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Page ..."
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
        />
        <input
          type="number"
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
