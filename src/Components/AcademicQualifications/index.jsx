import React, { useState } from 'react';
// import { db } from '../firebase';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AcademicQualifications = () => {
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'academic_qualifications'), {
        course,
        level
      });
      toast.success('Academic qualifications saved successfully!');
      setCourse('');
      setLevel('');
    } catch (error) {
      toast.error('Error saving academic qualifications: ');
    } finally{
      window.location.reload();
    }
  };

  return (
    <>
    <ToastContainer/>
    
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
    </form>
    </>
  );
};

export default AcademicQualifications;
