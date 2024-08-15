import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Curriculums = () => {
  const [skill, setSkill] = useState('');
  const [interest, setInterest] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'curriculums'), {
        skill, interest
      });
      toast.success('Curriculum saved successfully!');
      setSkill('');
      setInterest('');
    } catch (error) {
      console.error('Error saving curriculum: ', error);
      toast.error('failed to save records: ');
    } finally{
      window.location.reload();
    }
  };

  return (
    <>
    <ToastContainer/>
    <form onSubmit={handleSubmit} className="curriculums-form skill_form">
      <div className="mb-3">
        <label htmlFor="skill" className="form-label">What can you do best? <span>*</span></label>
        <input
          type="text"
          className="form-control"
          id="skill"
          value={skill}
          placeholder='eg. running, reading'
          onChange={(e) => setSkill(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="interest" className="form-label">Your Interest? <span>*</span></label>
        <input
          type="text"
          className="form-control"
          id="interest"
          value={interest}
          placeholder='I am interested in ..'
          onChange={(e) => setInterest(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
    </>
    
  );
};

export default Curriculums;
