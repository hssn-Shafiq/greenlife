import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatIcon = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/chat-room'); // Replace with your desired route
  };

  return (
    <div style={styles.chatIcon} onClick={handleNavigate}>
      💬
    </div>
  );
};

const styles = {
  chatIcon: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '24px',
    zIndex: 1000,
  },
};

export default ChatIcon;
