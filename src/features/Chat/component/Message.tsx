import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface IMessageProps {
    content: string,
    image: string,
    status: string,
    name: string,
    direction?: "start" | "end",
};

export const Message: React.FC<IMessageProps> = ({
    content,
    image,
    status,
    name,
    direction = "start",
}: IMessageProps) => {
    const isEnd = direction === "end";
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isEnd ? 'flex-end' : 'flex-start',
            mb: 1.5,
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                {!isEnd && <Avatar src={image} alt={name} sx={{ width: 40, height: 40 }} />}
                <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        {name} <Typography component="span" variant="caption" color="text.disabled">12:45</Typography>
                    </Typography>
                </Box>
                {isEnd && <Avatar src={image} alt={name} sx={{ width: 40, height: 40 }} />}
            </Box>
            <Paper
                elevation={2}
                sx={{
                    px: 2,
                    py: 1,
                    bgcolor: isEnd ? 'primary.main' : 'grey.100',
                    color: isEnd ? 'primary.contrastText' : 'text.primary',
                    borderRadius: 2,
                    maxWidth: 320,
                    alignSelf: isEnd ? 'flex-end' : 'flex-start',
                }}
            >
                <Typography variant="body1">{content}</Typography>
            </Paper>
            <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, alignSelf: isEnd ? 'flex-end' : 'flex-start' }}>
                {status}
            </Typography>
        </Box>
    );
}
