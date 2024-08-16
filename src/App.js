import { BrowserRouter as Router,  Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import WelcomePage from "./Pages/WelcomePage";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import UserDetails from "./Components/UserDetails";
import RegisteredUsers from "./Pages/Admin/RegisteredUsers";
import AcademicDetails from "./Pages/Admin/AcademicDetails";
import CurriculumDetails from "./Pages/Admin/CurriculumDetails";
import PersonalDetails from "./Pages/Admin/PersonalDetails";


function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Welcome" element={<WelcomePage/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="admin-dashboard" element={<Dashboard/>} />
      <Route path="admin-user-details" element={<RegisteredUsers/>} />
      <Route path="admin-academic-details" element={<AcademicDetails/>} />
      <Route path="admin-curriculum-details" element={<CurriculumDetails/>} />
      <Route path="admin-personal-details" element={<PersonalDetails/>} />




    </Routes>

   </Router>
   </>
  );
}

export default App;
