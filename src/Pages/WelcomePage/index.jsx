import React from "react";
import "./welcome.css"
import Header from "../../Components/Header";
import { Link } from "react-router-dom";
const WelcomePage = () => {
  return (
    <>
    <div className="main">
    <div className="welcome_overlay" />
        <div className="container-fluid welcome">
          <div className="row align-items-center flex-wrap gap-md-0 gap-5 justify-content-center justify-content-md-start">
            <div className="col-md-6 col-12">
              <div className="welcome-container">
                <h1>Welcome to Bureti Constituency</h1>
                <p>Your journey to tranquility begins here</p>
                <Link to="/home"><button className="welcome-button">Fix Things</button></Link>
              </div>
              <div className="leaf-animation" />
            </div>
            <div className="col-md-6 col-12">
              <div className="automation"></div>
            </div>
          </div>
        </div>
    </div>
        

    </>
  );
};

export default WelcomePage;
