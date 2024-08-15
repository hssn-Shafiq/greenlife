import { BrowserRouter as Router,  Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import WelcomePage from "./Pages/WelcomePage";
import Home from "./Pages/Home";


function App() {
  return (
   <>
   <Router>
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Welcome" element={<WelcomePage/>} />
      <Route path="/Home" element={<Home/>} />

    </Routes>

   </Router>
   </>
  );
}

export default App;
