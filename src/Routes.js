import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import WelcomePage from "./Pages/WelcomePage";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import RegisteredUsers from "./Pages/Admin/RegisteredUsers";
import AcademicDetails from "./Pages/Admin/AcademicDetails";
import CurriculumDetails from "./Pages/Admin/CurriculumDetails";
import PersonalDetails from "./Pages/Admin/PersonalDetails";
import LoadingSimulation from "./Components/LoadingSimulation"; // Your loader component

const WebRoutes = () => {
  const location = useLocation(); // Hook to get the current location
  const [loading, setLoading] = useState(false); // State to manage loader visibility

  // Show loader when route changes
  useEffect(() => {
    setLoading(true); // Start loading when route changes
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a short delay
    }, 1000);

    return () => clearTimeout(timer); // Clear timer on cleanup
  }, [location]); // Effect runs on location change

  return (
    <>
      {loading && <LoadingSimulation />} {/* Show loader when loading is true */}
      {/* Render the routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Welcome" element={<WelcomePage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="admin-dashboard" element={<Dashboard />} />
        <Route path="admin-user-details" element={<RegisteredUsers />} />
        <Route path="admin-academic-details" element={<AcademicDetails />} />
        <Route path="admin-curriculum-details" element={<CurriculumDetails />} />
        <Route path="admin-personal-details" element={<PersonalDetails />} />
      </Routes>
    </>
  );
};

export default WebRoutes;
