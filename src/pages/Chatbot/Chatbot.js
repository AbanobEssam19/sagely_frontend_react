import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const useChatbot = () => {
    const user = useSelector((state) => state.userData.data);
    const firstName = user ? user.name.split(" ")[0] : "";

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const textRef = useRef(null);
    const chat = useRef(null);

    function sendMessage() {
        setMessages((prev) => [...prev, { message: message, bot: false }]);
        textRef.current.value = "";
        //
        //
        setMessages((prev) => [...prev, { message: "Thanks for your message! I’ll get back to you on that.", bot: true }]);
    }

    useEffect(() => {
        if (chat.current) {
            chat.current.scrollTop = chat.current.scrollHeight;
        }
    }, [messages]);


    return { firstName, messages, setMessage, textRef, chat, sendMessage };
} 