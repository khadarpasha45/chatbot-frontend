import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Chatbot.css';

const Chatbot = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSend = () => {
        if (inputValue.trim()) {
            const newMessages = [
                ...messages,
                { type: 'user', text: inputValue },
                { type: 'bot', text: `Response to: ${inputValue}` }
            ];

            setMessages(newMessages);
            setChatHistory([...chatHistory, inputValue]);
            setInputValue('');
        }
    };

    const handleLogout = () => {
        // You can add logic to clear session or token here if necessary
        navigate('/login'); // Navigate to the login page when logged out
    };

    return (
        <div className="chatbot-container">
            {/* Sidebar */}
            <div
                className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
                onMouseEnter={() => setIsSidebarOpen(true)}
                onMouseLeave={() => setIsSidebarOpen(false)}
            >
                <div className="sidebar-header">
                    <h2>Chat History</h2>
                    <div className="sidebar-buttons">
                        <button
                            onClick={() => {
                                setMessages([]);
                                setInputValue('');
                            }}
                            title="Start New Chat"
                        >
                            ➕
                        </button>
                    </div>
                </div>
                <div className="chat-history">
                    {chatHistory.map((item, index) => (
                        <div key={index} className="history-item">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`chat-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                {/* User Dropdown */}
                <div className="user-area">
                    <div
                        className="user-icon"
                        onMouseEnter={() => setIsUserDropdownOpen(true)}
                        onMouseLeave={() => setIsUserDropdownOpen(false)}
                    >
                        👤
                        {isUserDropdownOpen && (
                            <div className="user-dropdown">
                                <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.type}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="input-area">
                    <div className="search-wrapper">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onInput={(e) => {
                                e.target.style.height = "50px"; // Reset height
                                e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault(); // Prevent newline creation
                                    handleSend(); // Call send function
                                }
                            }}
                            placeholder="Type your message..."
                        />
                        <button
                            className="send-button"
                            onClick={handleSend}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
