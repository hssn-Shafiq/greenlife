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

const Login = () => {
  const [loading, setLoading] = useState(false);
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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("User signed in:", user);

      // Check if the signed-in user is the admin
      if (formData.email === "admin@gmail.com") {
        toast.success("Welcome Admin!");
        setTimeout(() => {
          navigate("/admin-dashboard"); // Navigate to admin dashboard
        }, 1000);
      } else {
        toast.success("Welcome back!");
        setTimeout(() => {
          navigate("/Welcome"); // Navigate to regular welcome page
        }, 1000);
      }
    } catch (error) {
      console.log("Failed to login:", error);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignup = async () => {
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
        toast.success("welcome back..");

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
      <div className="bg-img">
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
              <input type="submit" defaultValue="Login" />
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
                <img src="/images/icons/google.png" alt="Facebook" />
              </Link>
              {/* <a href="#" className="facebook">
                <img src="/images/icons/facebook.png" alt="Facebook" />
              </a> */}
            </div>
            <div className="signup">
              Don't have account?
              <Link to="/Signup"> SignUp</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
