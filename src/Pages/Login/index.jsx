// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSimulation from "../../Components/LoadingSimulation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loadingSimulation, setLoadingSimulation] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if(loadingSimulation){
    return <LoadingSimulation/>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("User signed in:", user);

      setShowSuccess(true);
      setLoadingSimulation(true);
      setTimeout(() => {
        if (formData.email === "admin@gmail.com") {
          toast.success("Welcome Admin!");
          navigate("/admin-dashboard");
        } else {
          toast.success("Welcome back!");
          navigate("/Welcome");
        }
      }, 3000);

    } catch (error) {
      console.log("Failed to login:", error);
      toast.error("Invalid credentials");
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      if (user) {
        await addDoc(collection(db, "googleUsers"), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: new Date().toISOString(),
        });

        console.log("Google sign-up successful:", user);
        toast.success("Welcome back!");

        navigate("/Welcome");
      }
    } catch (error) {
      console.log("Failed to sign up with Google:", error.message);
      toast.error("Failed to sign up");
    }
  };

  return (
    <>
      <ToastContainer />
      <div id="backgroundCarousel" className="carousel slide bg-img" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/bg2.jpg" className="d-block w-100" alt="Background 1" />
          </div>
          <div className="carousel-item">
            <img src="/images/bg3.jpg" className="d-block w-100" alt="Background 2" />
          </div>
          <div className="carousel-item">
            <img src="/images/bg.jpg" className="d-block w-100" alt="Background 3" />
          </div>
        </div>
      </div>
      <div className="content">
        <h2>Kericho,</h2>
        <p>Glad to see you!</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              required
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <input
              type="password"
              className="password"
              required
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="field field-btn">
            <button type="submit" className={loading ? "loading" : "btn btn-light w-100"}>
              {showSuccess ? (
                <>
                  <span className="success-tick text-success">✔</span>
                </>
              ) : (
                loading ? (
                  <>
                    <img
                      src="/images/icons/factory.png"
                      alt="Factory"
                      className="factory-img"
                    />
                  </>
                ) : (
                  "Login"
                )
              )}
            </button>
          </div>

          <div className="pass">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="login-with">
            <span />
            Or login with
            <span />
          </div>
          <div className="link">
            <Link onClick={handleGoogleSignup} className="google">
              <img src="/images/icons/google.png" alt="Google" />
            </Link>
          </div>
          <div className="signup">
            Don't have account?
            <a href="/Signup"> SignUp</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
