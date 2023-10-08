'use client'

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from '@/styles/chat-module.css';

export default function Chat() {

    const [messages, setMessages] = useState([]);

    const [inputText, setInputText] = useState('');

    const [socket, setSocket] = useState(null);

    useEffect(() => {

        const socket = io('http://localhost:3000');
        setSocket(socket);


        socket.on('chat-message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data.msg]);
        });

    }, []);

    function enviarMSG() {
        socket.emit('chat-message', {
            msg: inputText
        })
        setInputText('')
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h1>Chat</h1>
            </div>
            <div className={styles.chatMessages}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={styles.userMessage}
                    >
                        {message}
                    </div>
                ))}
            </div>
            <div className={styles.chatInput}>
                <input
                    type="text"
                    placeholder="Digite uma mensagem..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={enviarMSG}>Enviar</button>
            </div>
        </div>
    );
}
