import React from "react";
import "./LoadingSimulation.css"; // Import the CSS file for styling
import ReactLoading from "react-loading";

const LoadingSimulation = () => {
  return (
    <div className="loader-container">
      {/* Placeholder for loading simulation graphic */}
      <div className="hand-arrow">
        <img src="/images/handicon.png" alt="Loading Simulation" />
        <div className="factory-icon">
          <img src="/images/green.png" alt="Loading Simulation" />
        </div>
      </div>
      <div className="instructions d-flex flex-wrap align-items-center gap-1">
      <span class="loader"></span>
        Setting things up.. 😊</div>
    </div>
  );
};

export default LoadingSimulation;
