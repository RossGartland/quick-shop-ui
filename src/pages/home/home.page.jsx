import React from "react";
import "./home.style.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <hgroup>
          <h1>QUICK SHOP</h1>
          <h2>Shop Local | Shop Now</h2>
        </hgroup>
        <Link to="/search">
          <button className="btn btn-warning btn-lg" role="button">
            Discover local stores {">"}
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
