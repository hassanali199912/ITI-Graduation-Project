import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface ChatHeaderProps {
  avatar: string;
  name: string;
  status?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ avatar, name, status = "online" }) => (
  <>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
      <Avatar src={avatar} alt={name} sx={{ width: 40, height: 40, mr: 2 }} />
      <Box>
        <Typography variant="subtitle1" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {status}
        </Typography>
      </Box>
    </Box>
    <Divider />
  </>
);

export default ChatHeader; 