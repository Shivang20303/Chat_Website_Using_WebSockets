import React, { useEffect, useRef } from 'react';
import './MessageWindow.css';

const Message = ({ text, username, self }) => (
    <div className={'message' + (self ? ' message-self' : '')}>
        <div className='message-username'>{username}</div>
        <div className='message-text'>{text}</div>
    </div>
);

const MessageWindow = ({ messages = [], username }) => {
    const messageWindowRef = useRef(null);

    useEffect(() => {
        const messageWindow = messageWindowRef.current;
        messageWindow.scrollTop = messageWindow.scrollHeight - messageWindow.clientHeight;
    }, [messages]);

    return (
        <div className='message-window' ref={messageWindowRef}>
            {messages.map((msg, i) => (
                <Message key={i} text={msg.text} username={msg.username} self={username === msg.username} />
            ))}
        </div>
    );
};

export default MessageWindow;
