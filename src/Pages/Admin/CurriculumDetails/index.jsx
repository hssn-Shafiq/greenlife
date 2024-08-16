import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner, Button, Modal, Form } from 'react-bootstrap'; // Ensure you have react-bootstrap installed
import AdminHeader from '../../../Components/AdminHeader';

const db = getFirestore(); // Initialize Firestore

const CurriculumDetails = () => {
    const [curriculumData, setCurriculumData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        interest: '',
        skill: ''
    });

    useEffect(() => {
        const fetchCurriculumData = async () => {
            setLoading(true);
            try {
                const curriculumCollection = collection(db, 'curriculums');
                const curriculumSnapshot = await getDocs(curriculumCollection);
                const curriculumList = curriculumSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCurriculumData(curriculumList);
            } catch (error) {
                toast.error('Failed to fetch curriculum details');
            } finally {
                setLoading(false);
            }
        };

        fetchCurriculumData();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'curriculums', id));
            setCurriculumData(curriculumData.filter(item => item.id !== id));
            toast.success('Deleted successfully');
        } catch (error) {
            toast.error('Failed to delete curriculum details');
        } finally {
            setDeletingId(null);
            setLoading(false);
        }
    };

    const handleEditClick = (item) => {
        setCurrentItem(item);
        setFormData({
            interest: item.interest,
            skill: item.skill
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        if (currentItem) {
            setLoading(true);
            try {
                const itemRef = doc(db, 'curriculums', currentItem.id);
                await updateDoc(itemRef, {
                    ...formData,
                    updatedAt: Timestamp.fromDate(new Date()) // Update the date
                });
                setCurriculumData(curriculumData.map(item => item.id === currentItem.id ? { ...item, ...formData, updatedAt: new Date() } : item));
                toast.success('Updated successfully');
                setShowModal(false);
                setCurrentItem(null);
            } catch (error) {
                toast.error('Failed to update curriculum details');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <AdminHeader/>
            <div className="main">
                <div className="container">
                    <div className="row mt-5">
                        <h2 className="text-center fw-bold text-light fs-1">
                            All Curriculum Details
                        </h2>
                        {loading ? (
                            <div className="text-center mt-4">
                                <Spinner animation="border" variant="light" />
                            </div>
                        ) : (
                            <div className="table-responsive mt-4">
                                <table className="table table-striped">
                                    <thead>
                                        <tr className='text-center'>
                                            <th>Interest</th>
                                            <th>Skill</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {curriculumData.length > 0 ? (
                                            curriculumData.map((item) => (
                                                <tr key={item.id} className='text-center'>
                                                    <td>{item.interest}</td>
                                                    <td>{item.skill}</td>
                                                    <td>
                                                        <Button
                                                            variant="warning"
                                                            onClick={() => handleEditClick(item)}
                                                            disabled={loading}
                                                            className='me-1'
                                                        >
                                                            {loading && currentItem?.id === item.id ? 'Updating...' : 'Update'}
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleDelete(item.id)}
                                                            disabled={deletingId === item.id || loading}
                                                        >
                                                            {deletingId === item.id ? 'Deleting...' : 'Delete'}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">
                                                    No curriculum details found
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
                    <Modal.Title>Edit Curriculum Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formInterest">
                            <Form.Label>Interest</Form.Label>
                            <Form.Control
                                type="text"
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSkill">
                            <Form.Label>Skill</Form.Label>
                            <Form.Control
                                type="text"
                                name="skill"
                                value={formData.skill}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate} disabled={loading}>
                        {loading ? 'Updating...' : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CurriculumDetails;
