import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! I am Parkezo AI. How can I help you today? (e.g., "Find parking in Mysore", "What is the user rating for UB City?")' }
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setInput('');

        // Simulate AI response logic
        setTimeout(() => {
            const lowerMsg = userMsg.toLowerCase();
            let botReply = "I'm not sure how to help with that. Try asking about parking locations, or spot ratings.";

            if (lowerMsg.includes('mysore')) {
                botReply = "Currently, I can see 3 available parking spots near the Mysore Palace area. They are priced between ₹20 and ₹40 per hour. Would you like to view them on the map?";
            } else if (lowerMsg.includes('rating') || lowerMsg.includes('review')) {
                botReply = "The 'Private Lot - UB City Baseline' is currently the highest-rated spot with a 4.9-star rating based on 150+ user reviews.";
            } else if (lowerMsg.includes('book') || lowerMsg.includes('reserve')) {
                botReply = "You can easily book a spot by selecting it on the dashboard map and clicking 'Book Spot'.";
            } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                botReply = "Hi there! How can I assist you with your parking needs today?";
            }

            setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
        }, 1000);
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            {isOpen ? (
                <div className="chatbot-window glass-card">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <Bot size={24} />
                            <h3>Parkezo AI</h3>
                        </div>
                        <button className="close-bot-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-bubble ${msg.type}`}>
                                {msg.type === 'bot' && <Bot size={16} className="msg-icon" />}
                                <div className="msg-content">{msg.text}</div>
                                {msg.type === 'user' && <User size={16} className="msg-icon" />}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input-form" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="send-btn" disabled={!input.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            ) : (
                <button className="chatbot-fab" onClick={() => setIsOpen(true)}>
                    <MessageSquare size={28} />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
