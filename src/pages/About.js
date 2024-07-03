import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container d-flex flex-column align-items-center my-5">
        <h4 className="fw-bolder">圖片來源</h4>
        <div className="mt-3">
          使用
          <Link
            to="https://www.pexels.com/zh-tw/"
            target="_blank"
            className="px-2"
          >
            Pexels
          </Link>
          提供的圖片
        </div>
      </div>
    </div>
  );
};

export default About;
