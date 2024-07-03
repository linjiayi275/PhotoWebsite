import React from "react";

//從Homepage.js那裡取用props search
const Search = ({ search, setInput }) => {
  const inputHandler = (e) => {
    // console.log(e.target.value);
    // 使用setInput將input的value存進input內，這樣一來，Homepage.js的input就會被改為此值，
    // 接下來，按下search btn後，就會執行Homepage.js內的search function
    setInput(e.target.value);
  };
  const keyPressHandler = (e) => {
    // 如果按下的key為Enter，就會執行Homepage.js內的search function
    if (e.key === "Enter") {
      search();
    }
  };
  return (
    <div className="container search d-flex align-items-center flex-column">
      <h4 className="mb-4">
        <i className="fa-solid fa-quote-left"></i>
        　pexels 精選相片集　
        <i className="fa-solid fa-quote-right"></i>
      </h4>
      <div className="d-flex justify-content-center align-items-center w-100">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={inputHandler} //當每次input的value被改變時，就執行inputHandler
          onKeyDown={keyPressHandler} //當keydown時，就執行keyPressHandler
        />
        <button className="btn" onClick={search}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
};

export default Search;
