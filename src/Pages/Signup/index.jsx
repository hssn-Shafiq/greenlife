// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    number: "",
    rfrCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      if (user) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          number: formData.number,
          rfrCode: formData.rfrCode || null,
          createdAt: new Date().toISOString(),
        });

        console.log("User registered successfully:", user);
        setShowSuccess(true);
        toast.success("Please sign in to continue..");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log("Failed to sign up:", error.message);
      toast.error("Failed to sign up:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      if (user) {
        // Add user data to a separate Firestore collection
        await addDoc(collection(db, "googleUsers"), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: new Date().toISOString(),
        });

        console.log("Google sign-up successful:", user);
        toast.success("Welcome back..");
      }
    } catch (error) {
      console.log("Failed to login with Google:", error.message);
      toast.error("Failed to sign up");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        id="backgroundCarousel"
        className="carousel slide bg-img"
        data-bs-ride="carousel"  
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/slider1.jpg"
              className="d-block w-100"
              alt="Background 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/slider2.jpg"
              className="d-block w-100"
              alt="Background 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/slider3.jpg"
              className="d-block w-100"
              alt="Background 3"
            />
          </div>
        </div>
      </div>
      <div className="content">
        <h2>Bureti,</h2>
        <p>Glad to see you!</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Full Name"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <img src="/images/icons/kenya.png" alt="Kenya Flag" />
            <input
              type="text"
              placeholder={+254}
              required
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <input
              type="password"
              className="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="WARD (optional)"
              name="rfrCode"
              value={formData.rfrCode}
              onChange={handleChange}
            />
          </div>
          <div className="field field-btn">
            <button
              type="submit"
              className={loading ? "loading" : "btn btn-light w-100"}
            >
              {showSuccess ? (
                <>
                  <span className="success-tick text-success">✔</span>
                </>
              ) : loading ? (
                <>
                  <img
                    src="/images/icons/factory.png"
                    alt="Factory"
                    className="factory-img"
                  />
                </>
              ) : (
                "Signup"
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
            <Link
              className="google"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <img src="/images/icons/google.png" alt="Google" />
            </Link>
          </div>
          <div className="signup">
            Already have an account?
            <a href="/">Login</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
