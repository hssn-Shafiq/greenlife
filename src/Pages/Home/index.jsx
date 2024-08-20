import React, { useState } from "react";
import Header from "../../Components/Header";
import AcademicQualifications from "../../Components/AcademicQualifications";
import Curriculums from "../../Components/Curriculums";
import UserDetails from "../../Components/UserDetails";
import "./home.css"
import Footer from "../../Components/Footer";
import ChatSupport from "../../Components/ChatSupport";
import ChatIcon from "../../Components/ChatIcon";

const Home = () => {
  const [activeSection, setActiveSection] = useState("academic");

  const handleCollapse = (section) => {
    setActiveSection(section === activeSection ? "" : section);
  };

  return (
    <>
      <Header />
      <div className="main_home">
      <h2 className="text-center  fw-bold">Academic Qualifications</h2>
      <div className="container px-5 qualification_forms">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex bg-dark p-2 justify-content-center mb-4 position-relative button-group">
              <button
                className={`btn mx-2 ${
                  activeSection === "academic" ? "active-btn" : ""
                }`}
                onClick={() => handleCollapse("academic")}
                aria-expanded={activeSection === "academic"}
                aria-controls="academicCollapse"
              >
                Academic Qualifications
              </button>
              <button
                className={`btn mx-2 ${
                  activeSection === "curriculum" ? "active-btn" : ""
                }`}
                onClick={() => handleCollapse("curriculum")}
                aria-expanded={activeSection === "curriculum"}
                aria-controls="curriculumCollapse"
              >
                Curriculums
              </button>
              <button
                className={`btn mx-2 ${
                  activeSection === "userDetails" ? "active-btn" : ""
                }`}
                onClick={() => handleCollapse("userDetails")}
                aria-expanded={activeSection === "userDetails"}
                aria-controls="userDetailsCollapse"
              >
                User Details
              </button>
            </div>

            <div className="collapse-container">
              <div
                className={`collapse ${
                  activeSection === "academic" ? "show" : ""
                }`}
                id="academicCollapse"
              >
                <h2>Academic Qualifications</h2>
                <AcademicQualifications />
                <hr />
              </div>
              <div
                className={`collapse ${
                  activeSection === "curriculum" ? "show" : ""
                }`}
                id="curriculumCollapse"
              >
                <h2>Curriculums</h2>
                <Curriculums />
                <hr />
              </div>
              <div
                className={`collapse ${
                  activeSection === "userDetails" ? "show" : ""
                }`}
                id="userDetailsCollapse"
              >
                <h2>User Details</h2>
                <UserDetails />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
     {/* <ChatIcon/> */}
      <Footer/>
    </>
  );
};

export default Home;
