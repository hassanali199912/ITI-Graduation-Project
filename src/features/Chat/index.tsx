import React, { useState, useEffect } from "react";
import ChatSidebar from "./component/ChatSidebar";
import ChatHeader from "./component/ChatHeader";
import ChatMessages from "./component/ChatMessages";
import ChatInput from "./component/ChatInput";
import ChatWelcome from "./component/ChatWelcome";
import { ChatSidebarSkeleton, ChatMainSkeleton } from "./component/ChatSkeleton";

interface Message {
    id: number;
    content: string;
    image: string;
    status: string;
    name: string;
    direction: "start" | "end";
}

interface ChatItem {
    id: number;
    name: string;
    lastMessage: string;
    avatar: string;
    messages: Message[];
}

const Chat: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [chatList, setChatList] = useState<ChatItem[]>([
        {
            id: 1,
            name: "Hassan Ali",
            lastMessage: "See you tomorrow!",
            avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Hello! How are you?",
                    image: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
                    status: "Delivered",
                    name: "Hassan Ali",
                    direction: "start"
                },
                {
                    id: 2,
                    content: "I'm good, thanks! And you?",
                    image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
                    status: "Seen",
                    name: "Eslam Al Emir",
                    direction: "end"
                }
            ]
        },
        {
            id: 2,
            name: "Eslam Al Emir",
            lastMessage: "Thanks!",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Hi there!",
                    image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
                    status: "Delivered",
                    name: "Eslam Al Emir",
                    direction: "start"
                },
                {
                    id: 2,
                    content: "How can I help you today?",
                    image: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
                    status: "Seen",
                    name: "Hassan Ali",
                    direction: "end"
                }
            ]
        },
        {
            id: 3,
            name: "John Doe",
            lastMessage: "Hello!",
            avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Hey John!",
                    image: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
                    status: "Delivered",
                    name: "John Doe",
                    direction: "start"
                }
            ]
        },
        {
            id: 4,
            name: "Jane Doe",
            lastMessage: "Hi!",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Hi Jane!",
                    image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
                    status: "Delivered",
                    name: "Jane Doe",
                    direction: "start"
                }
            ]
        },
        {
            id: 5,
            name: "Bob Smith",
            lastMessage: "What's up?",
            avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Not much, Bob!",
                    image: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
                    status: "Delivered",
                    name: "Bob Smith",
                    direction: "start"
                }
            ]
        },
        {
            id: 6,
            name: "Alice Johnson",
            lastMessage: "Not much!",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Same here!",
                    image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
                    status: "Delivered",
                    name: "Alice Johnson",
                    direction: "start"
                }
            ]
        },
        {
            id: 7,
            name: "Mike Brown",
            lastMessage: "How are you?",
            avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            messages: [
                {
                    id: 1,
                    content: "I'm doing well!",
                    image: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
                    status: "Delivered",
                    name: "Mike Brown",
                    direction: "start"
                }
            ]
        },
        {
            id: 8,
            name: "Emily Davis",
            lastMessage: "I'm good!",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Great to hear!",
                    image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
                    status: "Delivered",
                    name: "Emily Davis",
                    direction: "start"
                }
            ]
        },
        {
            id: 9,
            name: "Tom Harris",
            lastMessage: "That's great!",
            avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Thanks Tom!",
                    image: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
                    status: "Delivered",
                    name: "Tom Harris",
                    direction: "start"
                }
            ]
        },
        {
            id: 10,
            name: "Linda Martin",
            lastMessage: "Thanks!",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            messages: [
                {
                    id: 1,
                    content: "You're welcome!",
                    image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
                    status: "Delivered",
                    name: "Linda Martin",
                    direction: "start"
                }
            ]
        },
        {
            id: 11,
            name: "David Lee",
            lastMessage: "You're welcome!",
            avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            messages: [
                {
                    id: 1,
                    content: "Have a great day!",
                    image: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
                    status: "Delivered",
                    name: "David Lee",
                    direction: "start"
                }
            ]
        },
        {
            id: 12,
            name: "Sophia Kim",
            lastMessage: "Have a nice day!",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            messages: [
                {
                    id: 1,
                    content: "You too Sophia!",
                    image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
                    status: "Delivered",
                    name: "Sophia Kim",
                    direction: "start"
                }
            ]
        },
    ]);

    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const selectedChat = selectedChatId ? chatList.find(chat => chat.id === selectedChatId) : null;

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleSendMessage = (content: string) => {
        if (!selectedChat || !selectedChatId) return;

        const newMessage: Message = {
            id: Date.now(), // Simple ID generation
            content,
            image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp", // Current user's avatar
            status: "Sent",
            name: "You", // Current user's name
            direction: "end"
        };

        setChatList(prevChatList =>
            prevChatList.map(chat =>
                chat.id === selectedChatId
                    ? {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                        lastMessage: content
                    }
                    : chat
            )
        );
    };

    return (
        <section className="rounded-lg">
            <div className="container m-auto p-5">
                <div className="h-[80vh] flex bg-base-200">
                    {isLoading ? (
                        <>
                            <ChatSidebarSkeleton />
                            <ChatMainSkeleton />
                        </>
                    ) : (
                        <>
                            <ChatSidebar
                                chatList={chatList}
                                selectedChatId={selectedChatId || null}
                                onChatSelect={setSelectedChatId}
                            />
                            <main className="flex-1 flex flex-col">
                                {selectedChat ? (
                                    <>
                                        <ChatHeader
                                            avatar={selectedChat.avatar}
                                            name={selectedChat.name}
                                            status="online"
                                        />
                                        <ChatMessages messages={selectedChat.messages} />
                                        <ChatInput onSendMessage={handleSendMessage} />
                                    </>
                                ) : (
                                    <ChatWelcome />
                                )}
                            </main>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Chat;

