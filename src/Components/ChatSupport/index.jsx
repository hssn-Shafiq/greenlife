import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure the path is correct
import { getAuth } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ChatSupportModal = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const messagesRef = collection(db, 'chats', userId, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleSendMessage = async () => {
    if (message.trim() && userId) {
      const messagesRef = collection(db, 'chats', userId, 'messages');
      await addDoc(messagesRef, {
        text: message,
        user: 'user',
        timestamp: new Date(),
      });
      console.log("message sends is ", message);
      setMessage('');
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={styles.modal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chat Support</h5>
            <FontAwesomeIcon icon={faTimes} onClick={onClose} style={{ cursor: 'pointer' }} />
          </div>
          <div className="modal-body" style={styles.chatWindow}>
            {messages.map((msg) => (
              <div key={msg.id} className={msg.user === 'user' ? 'text-end mb-2' : 'text-start mb-2'}>
                <div className={msg.user === 'user' ? 'bg-primary text-white p-2 rounded' : 'bg-light p-2 rounded'}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <input
              type="text"
              className="form-control me-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: 'fixed',
    bottom: '0',
    right: '20px',
    width: '350px',
    height: '400px',
    zIndex: 1000,
  },
  chatWindow: {
    maxHeight: '250px',
    overflowY: 'scroll',
  },
};

export default ChatSupportModal;
