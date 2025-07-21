import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
// TODO: Update ChatListItem to use MUI components
import ChatListItem from "./ChatListItem";

interface Chat {
  senderId: string;
  receiverId: string;
  lastMessage: string;
  senderName: string;
  receiverName: string;
  sentAt: string;
  profilePictureUrl: string | null;
  messages: any[];
}

interface ChatSidebarProps {
  chatList: Chat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chatList, selectedChatId, onChatSelect }) => (
  <Box
    component="aside"
    sx={{
      width: { xs: '100%', sm: 320 },
      bgcolor: 'background.paper',
      borderRight: 1,
      borderColor: 'divider',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Search Bar */}
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search chats"
        variant="outlined"
      />
    </Box>
    {/* Chat List */}
    <List sx={{ flex: 1, overflowY: 'auto' }}>
      {chatList.map((chat) => (
        <ChatListItem
          key={chat.receiverId}
          chat={chat}
          isSelected={chat.receiverId === selectedChatId}
          onClick={() => onChatSelect(chat.receiverId)}
        />
      ))}
    </List>
  </Box>
);

export default ChatSidebar; 