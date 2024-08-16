import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { Modal, Button, Form } from 'react-bootstrap'; // Ensure you have react-bootstrap installed
import AdminHeader from '../../../Components/AdminHeader';
import { ToastContainer, toast } from 'react-toastify';

const db = getFirestore(); // Initialize Firestore

const RegisteredUsers = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        rfrCode: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const userCollection = collection(db, 'users');
            const userSnapshot = await getDocs(userCollection);
            const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
        };
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setCurrentUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            number: user.number,
            rfrCode: user.rfrCode
        });
        setShowModal(true);
    };

    const handleDeleteClick = async (id) => {

        try {
            await deleteDoc(doc(db, 'users', id));
            setUsers(users.filter(user => user.id !== id));
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error("failed to delete");
        }
       
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {

        try {
            setLoading(true);
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.id);
                await updateDoc(userRef, {
                    ...formData,
                    updatedAt: Timestamp.fromDate(new Date()) // Update the date
                });
                setUsers(users.map(user => user.id === currentUser.id ? { ...user, ...formData, updatedAt: new Date() } : user));
                setShowModal(false);
                setCurrentUser(null);
                toast.success("user updated successfully")
            }
        } catch (error) {
            toast.error("failed to update");
        } finally{
            setLoading(false);
        }
       
    };

    return (
        <>
        <ToastContainer/>
        <AdminHeader/>
        <div className="main">
        <div className="container">
            <div className="row mt-5">
                <h2 className='text-center fw-bold text-light fs-1'>All Registered Users</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>RFR Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.number}</td>
                            <td>{user.rfrCode}</td>
                            <td>
                                <Button className='me-1' variant="warning" onClick={() => handleEditClick(user)}> <i className='fa-solid fa-edit'></i> </Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(user.id)}><i className='fa-solid fa-trash'></i> </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
       

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNumber">
                            <Form.Label>Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRfrCode">
                            <Form.Label>RFR Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="rfrCode"
                                value={formData.rfrCode}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave} disabled={loading} >{loading ? "saving.." : "Save Changes"}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RegisteredUsers;
