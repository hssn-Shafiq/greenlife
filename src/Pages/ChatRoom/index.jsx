import React from "react";
import "./chat.css"
const ChatRoom = () => {
  return (
    <>
    
    <div className="main-chat">
        
    <div className="--dark-theme" id="chat">
        <div className="chat__conversation-board">
          <div className="chat__conversation-board__message-container">
            <div className="chat__conversation-board__message__person">
              <div className="chat__conversation-board__message__person__avatar">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Monika Figi"
                />
              </div>
              <span className="chat__conversation-board__message__person__nickname">
                Monika Figi
              </span>
            </div>
            <div className="chat__conversation-board__message__context">
              <div className="chat__conversation-board__message__bubble d-flex flex-column">
                {" "}
                <span className="user_name">Kevin - Kisiara </span>
                <span>
                  Somewhere stored deep, deep in my memory banks is the phrase
                  "It really whips the llama's ass".
                </span>
              </div>
            </div>
            <div className="chat__conversation-board__message__options">
              <button className="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
                <svg
                  className="feather feather-smile sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={10} />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1={9} y1={9} x2="9.01" y2={9} />
                  <line x1={15} y1={9} x2="15.01" y2={9} />
                </svg>
              </button>
              <button className="btn-icon chat__conversation-board__message__option-button option-item more-button">
                <svg
                  className="feather feather-more-horizontal sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                  <circle cx={5} cy={12} r={1} />
                </svg>
              </button>
            </div>
          </div>
          <div className="chat__conversation-board__message-container">
            <div className="chat__conversation-board__message__person">
              <div className="chat__conversation-board__message__person__avatar">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Thomas Rogh"
                />
              </div>
              <span className="chat__conversation-board__message__person__nickname">
                Thomas Rogh
              </span>
            </div>
            <div className="chat__conversation-board__message__context">
              <div className="chat__conversation-board__message__bubble d-flex flex-column">
                {" "}
                <span className="user_name">Bright - Chemosot</span>
                <span>Think the guy that did the voice has a Twitter?</span>
              </div>
            </div>
            <div className="chat__conversation-board__message__options">
              <button className="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
                <svg
                  className="feather feather-smile sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={10} />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1={9} y1={9} x2="9.01" y2={9} />
                  <line x1={15} y1={9} x2="15.01" y2={9} />
                </svg>
              </button>
              <button className="btn-icon chat__conversation-board__message__option-button option-item more-button">
                <svg
                  className="feather feather-more-horizontal sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                  <circle cx={5} cy={12} r={1} />
                </svg>
              </button>
            </div>
          </div>
          <div className="chat__conversation-board__message-container">
            <div className="chat__conversation-board__message__person">
              <div className="chat__conversation-board__message__person__avatar">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Monika Figi"
                />
              </div>
              <span className="chat__conversation-board__message__person__nickname">
                Monika Figi
              </span>
            </div>
            <div className="chat__conversation-board__message__context">
              <div className="chat__conversation-board__message__bubble d-flex flex-column">
                {" "}
                <span className="user_name">Kevin - Kisiara </span>

                <span>WE MUST FIND HIM!!</span>
              </div>
              <div className="chat__conversation-board__message__bubble">
                {" "}
                <span>Wait ...</span>
              </div>
            </div>
            <div className="chat__conversation-board__message__options">
              <button className="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
                <svg
                  className="feather feather-smile sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={10} />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1={9} y1={9} x2="9.01" y2={9} />
                  <line x1={15} y1={9} x2="15.01" y2={9} />
                </svg>
              </button>
              <button className="btn-icon chat__conversation-board__message__option-button option-item more-button">
                <svg
                  className="feather feather-more-horizontal sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                  <circle cx={5} cy={12} r={1} />
                </svg>
              </button>
            </div>
          </div>
          <div className="chat__conversation-board__message-container reversed">
            <div className="chat__conversation-board__message__person">
              <div className="chat__conversation-board__message__person__avatar">
                <img
                  src="https://randomuser.me/api/portraits/men/9.jpg"
                  alt="Dennis Mikle"
                />
              </div>
              <span className="chat__conversation-board__message__person__nickname">
                Dennis Mikle
              </span>
            </div>
            <div className="chat__conversation-board__message__context">
              <div className="chat__conversation-board__message__bubble d-flex flex-column">
                {" "}
                <span className="user_name m-0 text-left">Admin</span>
                <span>Winamp's still an essential.</span>
              </div>
            </div>
            <div className="chat__conversation-board__message__options">
              <button className="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
                <svg
                  className="feather feather-smile sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={10} />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1={9} y1={9} x2="9.01" y2={9} />
                  <line x1={15} y1={9} x2="15.01" y2={9} />
                </svg>
              </button>
              <button className="btn-icon chat__conversation-board__message__option-button option-item more-button">
                <svg
                  className="feather feather-more-horizontal sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                  <circle cx={5} cy={12} r={1} />
                </svg>
              </button>
            </div>
          </div>
          <div className="chat__conversation-board__message-container">
            <div className="chat__conversation-board__message__person">
              <div className="chat__conversation-board__message__person__avatar">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Monika Figi"
                />
              </div>
              <span className="chat__conversation-board__message__person__nickname">
                Monika Figi
              </span>
            </div>
            <div className="chat__conversation-board__message__context">
              <div className="chat__conversation-board__message__bubble d-flex flex-column">
                {" "}
                <span className="user_name">Monika Figi - Ward Name</span>

                <span>WE MUST FIND HIM!!</span>
              </div>
              <div className="chat__conversation-board__message__bubble">
                {" "}
                <span>Wait ...</span>
              </div>
            </div>
            <div className="chat__conversation-board__message__options">
              <button className="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
                <svg
                  className="feather feather-smile sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={10} />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1={9} y1={9} x2="9.01" y2={9} />
                  <line x1={15} y1={9} x2="15.01" y2={9} />
                </svg>
              </button>
              <button className="btn-icon chat__conversation-board__message__option-button option-item more-button">
                <svg
                  className="feather feather-more-horizontal sc-dnqmqq jxshSx"
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
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                  <circle cx={5} cy={12} r={1} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="chat__conversation-panel">
          <div className="chat__conversation-panel__container">
            <button className="chat__conversation-panel__button panel-item btn-icon add-file-button">
              <svg
                className="feather feather-plus sc-dnqmqq jxshSx"
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
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
            </button>
            <button className="chat__conversation-panel__button panel-item btn-icon emoji-button">
              <svg
                className="feather feather-smile sc-dnqmqq jxshSx"
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
                <circle cx={12} cy={12} r={10} />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1={9} y1={9} x2="9.01" y2={9} />
                <line x1={15} y1={9} x2="15.01" y2={9} />
              </svg>
            </button>
            <input
              className="chat__conversation-panel__input panel-item"
              placeholder="Type a message..."
            />
            <button className="chat__conversation-panel__button panel-item btn-icon send-message-button">
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
                data-reactid={1036}
              >
                <line x1={22} y1={2} x2={11} y2={13} />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default ChatRoom;
