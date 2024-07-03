import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <ul className="container m-auto">
        <li>
          <Link to="/">
            <i className="fa-solid fa-images"></i>
          </Link>
        </li>
        <li className="pe-0">
          <ul className="d-flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
