import React from "react";
import { Link } from "react-router-dom";

//從Homepage.js那裡取用props data
const Picture = ({ data }) => {
  return (
    <div>
      <p className="photographer mb-0">{data.photographer}</p>
      <div className="imgContainer">
        <img src={data.src.large} alt={data.alt} />
      </div>
      <div className="zoom-in">
        <Link target="_blank" to={data.src.large}>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </Link>
      </div>
    </div>
  );
};

export default Picture;
