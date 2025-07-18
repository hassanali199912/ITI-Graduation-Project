export default interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    messageText: string;
    sentAt: string;
    isRead: boolean;
    readAt: string | null;
  }
  