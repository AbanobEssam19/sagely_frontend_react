import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const useChatbot = () => {
    const user = useSelector((state) => state.userData.data);
    const firstName = user ? user.name.split(" ")[0] : "";

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const textRef = useRef(null);
    const chat = useRef(null);

    async function sendMessage() {
        setMessages((prev) => [...prev, { message: message, bot: false }]);
        textRef.current.value = "";
        const res = await fetch("http://localhost:8075/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: message })
        })
        const data = await res.json();
        setMessages((prev) => [...prev, { message: data.answer, bot: true }]);
    }

    useEffect(() => {
        if (chat.current) {
            chat.current.scrollTop = chat.current.scrollHeight;
        }
    }, [messages]);


    return { firstName, messages, setMessage, textRef, chat, sendMessage };
} 