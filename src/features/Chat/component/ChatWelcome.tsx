import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ChatWelcome: React.FC = () => {
    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3a8a22 0%, #fff 100%)' }}>
            <Box sx={{ textAlign: 'center', p: 4 }}>
                {/* Icon */}
                <Box sx={{ width: 96, height: 96, mx: 'auto', bgcolor: 'primary.light', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <svg
                        width={48}
                        height={48}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: '#1e40af' }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </Box>
                {/* Title */}
                <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                    Welcome to Chat
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Select a conversation to start messaging
                </Typography>
            </Box>
        </Box>
    );
};

export default ChatWelcome; 