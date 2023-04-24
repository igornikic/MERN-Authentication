import React from "react";
import Header from "./layout/Header";
import homeImg from "../assets/home.jpg";

const Home = () => {
  return (
    <div>
      <Header />
      <br />
      <img src={homeImg} className="home-img" alt="Home Image" />
    </div>
  );
};

export default Home;
