import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
// TODO: Update Message component to use MUI
import { Message } from "./Message";

interface MessageType {
    id: number;
    content: string;
    image: string;
    status: string;
    name: string;
    direction: "start" | "end";
}

interface ChatMessagesProps {
    className?: string;
    messages: MessageType[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ className, messages }) => {
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Box
            ref={messagesContainerRef}
            sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                background: 'linear-gradient(135deg, #1e3a8a22 0%, #fff 100%)',
            }}
            className={className}
        >
            {messages.map((message) => (
                <Message
                    key={message.id}
                    content={message.content}
                    image={message.image}
                    status={message.status}
                    name={message.name}
                    direction={message.direction}
                />
            ))}
        </Box>
    );
};

export default ChatMessages; 