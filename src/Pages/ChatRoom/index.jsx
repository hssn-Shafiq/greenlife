import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../firebase"; // Import auth and db services from firebase.js
import { collection, query, where, getDocs, onSnapshot, addDoc, serverTimestamp, orderBy } from "firebase/firestore"; // Firestore methods
import { useNavigate } from "react-router-dom"; // For navigation
import "./chat.css";

const ChatRoom = () => {
  const [user, setUser] = useState(null); // Store authenticated user data
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(""); // Store current input message
  const [userName, setUserName] = useState(""); // Store user's name
  const [refCode, setRefCode] = useState(""); // Store user's referral code
  const [isAdmin, setIsAdmin] = useState(false); // Check if the user is an admin
  const [showScrollToBottom, setShowScrollToBottom] = useState(false); // Control visibility of scroll icon

  const chatRef = useRef(null); // Ref for chat container
  const navigate = useNavigate(); // Initialize history for navigation

  useEffect(() => {
    // Check for user authentication
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        navigate("/"); 
        return;
      }

      const userId = authUser.uid;
      setUser(authUser);
      console.log("User ID:", userId); // Debugging

      // Fetch user data from Firestore
      try {
        const userQuery = query(collection(db, "users"), where("uid", "==", userId));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          console.log("User Data:", userData); // Debugging

          setUserName(userData.name);
          setRefCode(userData.rfrCode);
          // Check if the user is an admin (assuming you have an "isAdmin" field in Firestore)
          if (userData.isAdmin) {
            setIsAdmin(true);
          }
        } else {
          console.error("No matching user found!"); // Debugging
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Debugging
      }
    });

    // Fetch chat messages in real-time
    const chatQuery = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubscribeChats = onSnapshot(chatQuery, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      scrollToBottom(); // Scroll to the bottom on new messages
    });

    // Cleanup subscriptions on component unmount
    return () => {
      unsubscribeAuth();
      unsubscribeChats();
    };
  }, [navigate]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (chatRef.current) {
      // Check if the user is near the bottom (small threshold for smoothness)
      const threshold = 50; // px from the bottom
      const isAtBottom =
        chatRef.current.scrollHeight - chatRef.current.scrollTop - chatRef.current.clientHeight <= threshold;
      setShowScrollToBottom(!isAtBottom); // Show/hide the button based on scroll position
    }
  };

  const sendMessage = async () => {
    if (input.trim()) {
      await addDoc(collection(db, "chats"), {
        userId: user.uid || "",
        name: userName || "",
        refcode: refCode || "",
        message: input,
        timestamp: serverTimestamp(),
        isAdmin: isAdmin, // Distinguish if the message is from admin
      });
      setInput(""); // Clear the input after sending the message
      scrollToBottom(); // Scroll to the bottom after sending a message
    }
  };

  // Handle key press for Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action of Enter key (e.g., form submission)
      sendMessage();
    }
  };

  // Helper function to generate avatar from the first letter of the username
  const getAvatar = (name) => {
    return name ? name.charAt(0).toUpperCase() : <i className="fa-solid fa-user" />;
  };

  return (
    <div className="main-chat">
      <div className="--dark-theme" id="chat">
        <h2 className="text-light  text-center fw-bold"><a href="/home" className="d-none d-md-block">
    <i className="fa-solid fa-arrow-left text-light float-start"></i>
        </a>Welcome to ChatRoom</h2>
        <div className="chat__conversation-board" ref={chatRef} onScroll={handleScroll}>
          {messages.map(({ id, data }) => (
            <div
              key={id}
              className={`chat__conversation-board__message-container ${data.isAdmin ? "reversed" : ""}`}
            >
              <div className="chat__conversation-board__message__person">
                <div className="chat__conversation-board__message__person__avatar">
                  <div className="avatar-circle bg-light fw-bold">{getAvatar(data.name)}</div>
                </div>
              </div>
              <div className="chat__conversation-board__message__context">
                <div className="chat__conversation-board__message__bubble d-flex flex-column">
                  <span className="user_name">
                    {data.name || ""} - {data.refcode}
                  </span>
                  <span>{data.message}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat__conversation-panel">
          <div className="chat__conversation-panel__container">
            <input
              className="chat__conversation-panel__input panel-item"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // Listen for Enter key press
            />
            <button
              className="chat__conversation-panel__button panel-item btn-icon send-message-button"
              onClick={sendMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1={22} y1={2} x2={11} y2={13} />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
        {showScrollToBottom && (
          <button
            className="scroll-to-bottom-btn"
            onClick={scrollToBottom}
            style={{
              position: "fixed",
              bottom: "80px",
              right: "40px",
              backgroundColor: "rgb(0 255 43 / 19%)",
              zIndex:"1000",
              color: "#fff",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
