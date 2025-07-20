import React, { useEffect, useRef } from "react";
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
        <div
            ref={messagesContainerRef}
            className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-tl from-blue-800/15 to-white ${className || ''}`}
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
        </div>
    );
};

export default ChatMessages; 