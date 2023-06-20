import React, { useRef } from 'react';
import './TextBar.css';

const TextBar = ({ onSend }) => {
    const inputRef = useRef(null);

    const sendMessage = () => {
        if (onSend) {
            onSend(inputRef.current.value);
        }
        inputRef.current.value = '';
    };

    const sendMessageIfEnter = (e) => {
        if (e.keyCode === 13) {
            sendMessage();
        }
    };

    return (
        <div className='textbar'>
            <input className='textbar-input' type='text' ref={inputRef} onKeyDown={sendMessageIfEnter} />
            <button className='textbar-send' onClick={sendMessage}>
                Send
            </button>
        </div>
    );
};

export default TextBar;
