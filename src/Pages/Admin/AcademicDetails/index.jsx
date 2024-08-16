import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner, Button, Modal, Form } from 'react-bootstrap'; // Ensure you have react-bootstrap installed
import AdminHeader from '../../../Components/AdminHeader';

const db = getFirestore(); // Initialize Firestore

const AcademicDetails = () => {
    const [academicData, setAcademicData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        course: '',
        level: '',
        userId: ''
    });

    useEffect(() => {
        const fetchAcademicData = async () => {
            setLoading(true);
            try {
                const academicCollection = collection(db, 'academic_qualifications');
                const academicSnapshot = await getDocs(academicCollection);
                const academicList = academicSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAcademicData(academicList);
            } catch (error) {
                toast.error('Failed to fetch academic details');
            } finally {
                setLoading(false);
            }
        };

        fetchAcademicData();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'academic_qualifications', id));
            setAcademicData(academicData.filter(item => item.id !== id));
            toast.success('Deleted successfully');
        } catch (error) {
            toast.error('Failed to delete academic details');
        } finally {
            setDeletingId(null);
            setLoading(false);
        }
    };

    const handleEditClick = (item) => {
        setCurrentItem(item);
        setFormData({
            course: item.course,
            level: item.level,
            userId: item.userId
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
                const itemRef = doc(db, 'academic_qualifications', currentItem.id);
                await updateDoc(itemRef, {
                    ...formData,
                    updatedAt: Timestamp.fromDate(new Date()) // Update the date
                });
                setAcademicData(academicData.map(item => item.id === currentItem.id ? { ...item, ...formData, updatedAt: new Date() } : item));
                toast.success('Updated successfully');
                setShowModal(false);
                setCurrentItem(null);
            } catch (error) {
                toast.error('Failed to update academic details');
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
                            All Registered Academic Details
                        </h2>
                        {loading ? (
                            <div className="text-center mt-4">
                                <Spinner animation="border" variant="light" />
                            </div>
                        ) : (
                            <div className="table-responsive mt-4">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Course</th>
                                            <th>Level</th>
                                            {/* <th>User ID</th> */}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {academicData.length > 0 ? (
                                            academicData.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.course}</td>
                                                    <td>{item.level}</td>
                                                    {/* <td>{item.userId}</td> */}
                                                    <td>
                                                        <Button
                                                            variant="warning"
                                                            onClick={() => handleEditClick(item)}
                                                            disabled={loading}
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
                                                <td colSpan="4" className="text-center">
                                                    No academic details found
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
                    <Modal.Title>Edit Academic Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCourse">
                            <Form.Label>Course</Form.Label>
                            <Form.Control
                                type="text"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLevel">
                            <Form.Label>Level</Form.Label>
                            <Form.Control
                                type="text"
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="formUserId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group> */}
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

export default AcademicDetails;
