import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure the path is correct
import AdminHeader from "../../../Components/AdminHeader";

const AdminChatDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch users from Firestore
  // Debugging fetchUsers
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "chats");
        const q = query(usersRef);

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No users found");
        } else {
          const userList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Users fetched:", userList);
          setUsers(userList);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Debugging onSnapshot
  useEffect(() => {
    if (selectedUserId) {
      const messagesRef = collection(db, "chats", selectedUserId, "messages");
      const q = query(messagesRef, orderBy("timestamp"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            console.log("No messages found for user:", selectedUserId);
          } else {
            const userMessages = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Messages fetched:", userMessages);
            setMessages(userMessages);
          }
        },
        (error) => {
          console.error("Error fetching messages:", error);
        }
      );

      return () => unsubscribe();
    }
  }, [selectedUserId]);

  const handleSendMessage = async () => {
    if (message.trim() && selectedUserId) {
      try {
        const messagesRef = collection(db, "chats", selectedUserId, "messages");
        await addDoc(messagesRef, {
          text: message,
          user: "admin", // Mark this as admin's message
          timestamp: new Date(),
        });
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error); // Debugging line
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="mt-5" style={{ marginTop: "5rem" }}>
        <div style={styles.container}>
          <div style={styles.userList}>
            <h3>Users</h3>
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  style={{
                    ...styles.userItem,
                    backgroundColor:
                      user.id === selectedUserId ? "#ddd" : "#fff",
                  }}
                >
                  {user.id}
                </div>
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>

          <div style={styles.chatBox}>
            <h3>Chat</h3>
            {selectedUserId ? (
              <>
                <div style={styles.chatWindow}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={
                        msg.user === "user"
                          ? styles.userMessage
                          : styles.adminMessage
                      }
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div style={styles.inputBox}>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button onClick={handleSendMessage}>Send</button>
                </div>
              </>
            ) : (
              <p>Select a user to view and respond to their messages</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    marginTop: "5rem",
    height: "95vh",
  },
  userList: {
    width: "30%",
    borderRight: "1px solid #ddd",
    padding: "10px",
    overflowY: "scroll",
  },
  userItem: {
    padding: "10px",
    cursor: "pointer",
  },
  chatBox: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  chatWindow: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    overflowY: "scroll",
  },
  inputBox: {
    display: "flex",
  },
  userMessage: {
    textAlign: "right",
    margin: "5px 0",
  },
  adminMessage: {
    textAlign: "left",
    margin: "5px 0",
  },
};

export default AdminChatDashboard;
