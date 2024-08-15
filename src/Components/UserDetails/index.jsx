import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Curriculums = () => {
  const [birth, setBirth] = useState('');
  const [area, setArea] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'curriculums'), {
        birth, area
      });
      toast.success('Curriculum saved successfully!');
      setBirth('');
      setArea('');
    } catch (error) {
      toast.error('Error saving curriculum: ');
    } finally{
      window.location.reload();
    }
  };

  return (
    <>
    <ToastContainer/>
    <form onSubmit={handleSubmit} className="curriculums-form skill_form">
      <div className="mb-3">
        <label htmlFor="skill" className="form-label">Village of Birth? <span>*</span></label>
        <input
          type="text"
          className="form-control"
          id="birth"
          value={birth}
          placeholder='place of birth'
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
          placeholder='where do you live?'
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
    </>
    
  );
};

export default Curriculums;
