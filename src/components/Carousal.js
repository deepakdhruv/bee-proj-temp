import React, { useState } from "react";
import burgerimg from "./burger.png";
import momosimg from "./momos.jpg";
import pizzaimg from "./pizza.jpg";
import './Carousal.css'; 

function Carousal() {
  const [search, setSearch] = useState(""); 

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide custom-carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={burgerimg} className="d-block w-100 custom-carousel-img" alt="Burger" />
          
        </div>

        <div className="carousel-item">
          <img src={momosimg} className="d-block w-100 custom-carousel-img" alt="Momos" />
         
        </div>

        <div className="carousel-item">
          <img src={pizzaimg} className="d-block w-100 custom-carousel-img" alt="Pizza" />
          
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousal;