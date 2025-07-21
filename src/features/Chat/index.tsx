import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import ChatSidebar from "./component/ChatSidebar";
import ChatHeader from "./component/ChatHeader";
import ChatMessages from "./component/ChatMessages";
import ChatInput from "./component/ChatInput";
import ChatWelcome from "./component/ChatWelcome";

import {
    startConnection,
    onReceiveMessage,
    sendMessage
} from "./services/chatSinglaR"
import { useGetAllChatQuery, useLazyGetMessagesForChatQuery, useSendMessageMutation } from "./apis/chat";
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
// Import your mentor fetching hook
import { useGetMentorByIdQuery } from "../Auth/api/mentorsApi"; // Adjust path as needed

interface Message {
    id: number;
    content: string;
    image: string;
    status: string;
    name: string;
    direction: "start" | "end";
}

interface ChatItem {
    senderId: string;
    receiverId: string;
    lastMessage: string;
    senderName: string;
    receiverName: string;
    sentAt: string;
    profilePictureUrl: string | null;
    messages: Message[];
}



const Chat: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [chatList, setChatList] = useState<ChatItem[]>([
    ]);

    const studetnId = localStorage.getItem("userId")
    const location = useLocation();
    const mentorId = location.state?.mentorId;
    const teacherId = location.state?.teacherId;
    const [open, setOpen] = useState(false);

    // Fetch mentor data if mentorId exists
    const { data: mentor, isLoading: MentorIsLoading } = useGetMentorByIdQuery(mentorId, {
        skip: !mentorId,
    });



    // Only allow chat after confirmation
    const [canChat, setCanChat] = useState(!mentorId);

    const handleConfirm = () => {
        setOpen(false);
        setCanChat(true);

        // Check if mentor already exists in chatList
        const mentorChatId = mentor?.data?.id;
        if (!mentorChatId) return;

        setChatList(prevChatList => {
            // If mentor already in chatList, don't add again
            if (prevChatList.some(chat => chat.receiverId === mentorChatId)) {
                return prevChatList;
            }
            // Add new chat for mentor (match ChatItem interface)
            return [
                ...prevChatList,
                {
                    senderId: studetnId || "",
                    receiverId: mentorChatId,
                    lastMessage: "",
                    senderName: "You",
                    receiverName: `${mentor.data.firstName} ${mentor.data.lastName}`,
                    sentAt: new Date().toISOString(),
                    profilePictureUrl: mentor.data.profilePictureUrl || "/default-avatar.png",
                    messages: []
                }
            ];
        });

        setSelectedChatId(mentorChatId);
    };

    const {
        data: AllChatData,
        isLoading: AllChatsLoading,
        isFetching: AllChatsFetching
    } = useGetAllChatQuery({
        currentUserId: studetnId
    }, {
        skip: !studetnId
    });

    const [AllChatForTrigger, {
        data: AllChatDataFor,
        isLoading: AllChatsForLoading,
        isFetching: AllChatsForFetching
    }] = useLazyGetMessagesForChatQuery();

    const [SendMassageTrigger] = useSendMessageMutation();


    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const selectedChat = selectedChatId ? chatList.find(chat => chat.receiverId === selectedChatId) : null;

    // Fetch messages when a chat is selected
    useEffect(() => {
        if (!selectedChatId || !studetnId) return;
        // Find the selected chat to get the other user's id
        const chat = chatList.find(c => c.receiverId === selectedChatId);
        if (!chat) return;
        console.log("this is ides", {
            currentUserId: studetnId,
            otherUserId: selectedChatId
        });

        AllChatForTrigger({
            currentUserId: studetnId,
            otherUserId: selectedChatId
        });
    }, [selectedChatId]);

    useEffect(() => {
        if (AllChatDataFor && !AllChatsForLoading && !AllChatsForFetching && selectedChatId) {
            // Map API response to local Message type
            const apiMessages = AllChatDataFor.data.value || [];
            const mappedMessages = apiMessages.map((msg: any) => ({
                id: msg.id,
                content: msg.messageText,
                image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp", // Placeholder, replace as needed
                status: msg.isRead ? "Read" : "Sent",
                name: msg.senderId === studetnId ? "You" : "Other", // Placeholder, replace with actual names if available
                direction: msg.senderId === studetnId ? "end" : "start"
            }));
            setChatList(prevChatList =>
                prevChatList.map(chat =>
                    chat.receiverId === selectedChatId
                        ? { ...chat, messages: mappedMessages }
                        : chat
                )
            );
        }
    }, [AllChatDataFor, AllChatsForLoading, AllChatsForFetching, selectedChatId]);

    useEffect(() => {
        // GetAllChatFor();
        startConnection()
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (AllChatData && !AllChatsFetching && !AllChatsLoading) {
            console.log("the messages", AllChatData?.data?.value);

            const allMessage = AllChatData?.data?.value.map((chat: any) => {
                return {
                    senderId: chat?.senderId,
                    receiverId: chat?.receiverId,
                    lastMessage: chat?.lastMessage,
                    senderName: chat?.senderName,
                    receiverName: chat?.receiverName,
                    sentAt: chat?.sentAt,
                    profilePictureUrl: chat?.profilePictureUrl || null,
                    messages: []
                }
            })
            setChatList(allMessage)
        }
    }, [AllChatData, AllChatsLoading, AllChatsFetching])

    const handleSendMessage = (chatId: string, content: string) => {
        // Send message to backend (API)
        if (studetnId && chatId) {
            SendMassageTrigger({
                currentUserId: studetnId,
                otherUserId: chatId,
                message: content
            });
            // // Send message via SignalR for real-time delivery
            // sendMessage(chatId, content);
        }

        // Use receiverId for chat identification
        const chat = chatList.find(c => c.receiverId === chatId);
        if (!chat) return;

        const newMessage: Message = {
            id: Date.now(),
            content,
            image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            status: "Sent",
            name: "You",
            direction: "end"
        };

        setChatList(prevChatList =>
            prevChatList.map(chat =>
                chat.receiverId === chatId
                    ? {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                        lastMessage: content
                    }
                    : chat
            )
        );
    };



    useEffect(() => {
        // Set up SignalR message receiving
        const handleReceiveMessage = (msg: any) => {

            console.log("this is resive", msg);

            // const mappedMessage: Message = {
            //     id: msg.id || Date.now(),
            //     content: msg.messageText,
            //     image: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp", // Placeholder
            //     status: msg.isRead ? "Read" : "Sent",
            //     name: msg.senderId === studetnId ? "You" : "Other",
            //     direction: msg.senderId === studetnId ? "end" : "start"
            // };
            // // Find the chat by sender/receiver
            // setChatList(prevChatList => prevChatList.map(chat => {
            //     if (
            //         (chat.receiverId === msg.senderId && chat.senderId === msg.receiverId) ||
            //         (chat.receiverId === msg.receiverId && chat.senderId === msg.senderId)
            //     ) {
            //         return {
            //             ...chat,
            //             messages: [...chat.messages, mappedMessage],
            //             lastMessage: msg.messageText
            //         };
            //     }
            //     return chat;
            // }));
        };
        onReceiveMessage(handleReceiveMessage);
        // No off/unsubscribe available in current SignalR wrapper, so no cleanup
    }, [onReceiveMessage]);


    return (
        <Box sx={{ borderRadius: 2 }}>
            <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3 }}>
                <Paper elevation={3} sx={{ height: '80vh', display: 'flex' }}>
                    {isLoading ? (
                        <>
                            {/* Sidebar Skeleton */}
                            <Box sx={{ width: 300, p: 2 }}>
                                <Skeleton variant="rectangular" width={260} height={40} sx={{ mb: 2 }} />
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} variant="rectangular" width={260} height={60} sx={{ mb: 1 }} />
                                ))}
                            </Box>
                            {/* Main Skeleton */}
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                                <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
                                <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 2 }} />
                                <Skeleton variant="rectangular" width="100%" height={60} />
                            </Box>
                        </>
                    ) : (
                        <>
                            <ChatSidebar
                                chatList={chatList}
                                selectedChatId={selectedChatId || null}
                                onChatSelect={setSelectedChatId}
                            />
                            <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                {selectedChat ? (
                                    <>
                                        <ChatHeader
                                            avatar={selectedChat.profilePictureUrl || ""}
                                            name={selectedChat.receiverName}
                                            status="online"
                                        />
                                        <ChatMessages messages={selectedChat.messages} />
                                        {/* Pass selectedChatId to ChatInput */}
                                        <ChatInput onSendMessage={(content) => handleSendMessage(selectedChatId!, content)} />
                                    </>
                                ) : (
                                    <ChatWelcome />
                                )}
                            </Box>
                        </>
                    )}
                </Paper>
            </Box>

            {/* Mentor Confirmation Modal */}
            <Dialog open={open} onClose={() => { }}>
                <DialogTitle>تأكيد بدء المحادثة</DialogTitle>
                <DialogContent style={{ textAlign: "center" }}>
                    {MentorIsLoading ? (
                        <>
                            <Skeleton variant="circular" width={80} height={80} style={{ margin: '0 auto' }} />
                            <Skeleton variant="text" width={120} height={32} style={{ margin: '16px auto' }} />
                            <Skeleton variant="rectangular" width={200} height={24} style={{ margin: '8px auto' }} />
                        </>
                    ) : mentor ? (
                        <>
                            <Avatar
                                src={mentor?.data?.profilePictureUrl || "/default-avatar.png"}
                                alt={mentor.name}
                                sx={{ width: 80, height: 80, margin: "0 auto" }}
                            />
                            <h3 style={{ margin: "16px 0" }}>
                                {mentor?.data?.firstName}
                                {" "}
                                {mentor?.data?.lastName}

                            </h3>
                            <div>هل تريد بدء المحادثة مع هذا المرشد؟</div>
                        </>
                    ) : (
                        <div>تعذر تحميل بيانات المرشد.</div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color="primary"
                        disabled={MentorIsLoading}
                    >
                        نعم، ابدأ المحادثة
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        color="error"
                    >
                        اغلاق
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Chat;
// TODO: Update all child components to use Material-UI instead of DaisyUI/Tailwind

