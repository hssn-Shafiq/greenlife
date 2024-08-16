import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, []);

  const getUsername = (email) => {
    return email ? email.split("@")[0] : "";
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav id="navbar">
        <div className="nav-wrapper d-flex align-items-center justify-content-between h-100">
          <div className="logo">
            <a href="/home">
              <i className="fas fa-chess-knight" /> Logo
            </a>
          </div>
          <ul id="menu" className={menuOpen ? "show" : ""}>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle bg-dark p-2 text-light"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  
                    <i className="fa-solid fa-user"></i> {getUsername(user.email)}
        
                </a>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li><Link to="/">Login</Link></li>
            )}
          </ul>
        </div>
      </nav>

      <div className={`menuIcon ${menuOpen ? "toggle" : ""}`} onClick={toggleMenu}>
        <span className="icon icon-bars" />
        <span className="icon icon-bars overlay" />
      </div>

      <div className={`overlay-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </>
  );
};

export default Header;
