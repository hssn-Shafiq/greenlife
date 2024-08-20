import React, { useState } from 'react';
import ChatSupportModal from '../ChatSupport';


const ChatIcon = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div style={styles.chatIcon} onClick={handleOpen}>
        💬
      </div>
      {open && <ChatSupportModal onClose={handleClose} />}
    </>
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
