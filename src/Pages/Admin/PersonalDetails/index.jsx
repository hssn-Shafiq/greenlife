import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner, Button, Modal, Form } from "react-bootstrap"; // Ensure you have react-bootstrap installed
import AdminHeader from "../../../Components/AdminHeader";

const db = getFirestore(); // Initialize Firestore

const PersonalDetails = () => {
  const [personalData, setPersonalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    area: "",
    birth: "",
  });

  useEffect(() => {
    const fetchPersonalData = async () => {
      setLoading(true);
      try {
        const personalCollection = collection(db, "user-details");
        const personalSnapshot = await getDocs(personalCollection);
        const personalList = personalSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPersonalData(personalList);
      } catch (error) {
        toast.error("Failed to fetch personal details");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalData();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    setLoading(true);
    try {
      await deleteDoc(doc(db, "user-details", id));
      setPersonalData(personalData.filter((item) => item.id !== id));
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete personal details");
    } finally {
      setDeletingId(null);
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setFormData({
      area: item.area,
      birth: item.birth,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    if (currentItem) {
      setLoading(true);
      try {
        const itemRef = doc(db, "user-details", currentItem.id);
        await updateDoc(itemRef, {
          ...formData,
          updatedAt: Timestamp.fromDate(new Date()), // Update the date
        });
        setPersonalData(
          personalData.map((item) =>
            item.id === currentItem.id
              ? { ...item, ...formData, updatedAt: new Date() }
              : item
          )
        );
        toast.success("Updated successfully");
        setShowModal(false);
        setCurrentItem(null);
      } catch (error) {
        toast.error("Failed to update personal details");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminHeader />
      <div className="main">
        <div className="container">
          <div className="row mt-5">
            <h2 className="text-center fw-bold text-light fs-1">
              All Personal Details
            </h2>
            {loading ? (
              <div className="text-center mt-4">
                <Spinner animation="border" variant="light" />
              </div>
            ) : (
              <div className="table-responsive mt-4">
                <table className="table table-striped">
                  <thead>
                    <tr className="text-center">
                      <th>Interest</th>
                      <th>Skill</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personalData.length > 0 ? (
                      personalData.map((item) => (
                        <tr key={item.id} className="text-center">
                          <td>{item.area}</td>
                          <td>{item.birth}</td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleEditClick(item)}
                              disabled={loading}
                              className="me-1"
                            >
                              {loading && currentItem?.id === item.id
                                ? "Updating..."
                                : "Update"}
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id || loading}
                            >
                              {deletingId === item.id
                                ? "Deleting..."
                                : "Delete"}
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No Personal details found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Personal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formInterest">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSkill">
              <Form.Label>Birth</Form.Label>
              <Form.Control
                type="text"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PersonalDetails;