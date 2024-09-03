import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AcademicQualifications = () => {
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // If not logged in, redirect to the login page
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
      await addDoc(collection(db, 'academic_qualifications'), {
        course,
        level,
        userId: user.uid, // Pass the current user ID
        createdAt: new Date().toISOString()
      });
      toast.success('Academic qualifications saved successfully!');
      setCourse('');
      setLevel('');
    } catch (error) {
      toast.error('Error saving academic qualifications: ' + error.message);
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="academic-form skill_form">
        <div className="mb-3">
          <label htmlFor="course" className="form-label">Course <span>*</span></label>
          <input
            type="text"
            className="form-control"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder='Enter your course'
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">Level <span>*</span></label>
          <input
            type="text"
            className="form-control"
            id="level"
            placeholder='Enter your level'
            value={level}
            onChange={(e) => setLevel(e.target.value)}
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

export default AcademicQualifications;
