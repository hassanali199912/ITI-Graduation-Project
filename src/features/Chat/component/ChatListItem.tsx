import React from "react";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";

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

interface ChatListItemProps {
  chat: Chat;
  isSelected?: boolean;
  onClick?: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isSelected = false, onClick }) => (
  <ListItem disablePadding>
    <ListItemButton
      selected={isSelected}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1.5,
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'action.hover' },
        backgroundColor: isSelected ? 'action.selected' : 'inherit',
        transition: 'background-color 0.2s',
      }}
    >
      <Avatar src={chat.profilePictureUrl || undefined} alt={chat.receiverName} sx={{ width: 48, height: 48, mr: 2 }} />
      <Box>
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {chat.receiverName}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 140 }}>
          {chat.lastMessage}
        </Typography>
      </Box>
    </ListItemButton>
  </ListItem>
);

export default ChatListItem; 