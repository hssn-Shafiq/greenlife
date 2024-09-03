import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  const [birth, setBirth] = useState('');
  const [area, setArea] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You need to be logged in to submit the form.");
      return;
    }

    try {
      await addDoc(collection(db, 'user-details'), {
        birth,
        area,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });
      toast.success('thanks for submitting.!');
      setBirth('');
      setArea('');
    } catch (error) {
      toast.error('Error saving curriculum: ' + error.message);
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="curriculums-form skill_form">
        <div className="mb-3">
          <label htmlFor="birth" className="form-label">Village of Birth? <span>*</span></label>
          <input
            type="text"
            className="form-control"
            id="birth"
            value={birth}
            placeholder="place of birth"
            onChange={(e) => setBirth(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">Current Area of residence? <span>*</span></label>
          <input
            type="text"
            className="form-control"
            id="area"
            placeholder="where do you live?"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <a href="https://www.crazygames.com/game/hexa-sort" target='_blank'><button type='button' className='btn btn-dark float-end have-fun-btn'>Have Some Fun 😊</button>
        </a>
      </form>
    </>
  );
};

export default UserDetails;
