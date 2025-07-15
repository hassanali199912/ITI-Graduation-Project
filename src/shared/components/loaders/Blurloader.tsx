import { CircularProgress, Backdrop } from '@mui/material';

export default function BlurLoader() {
    return (
        <Backdrop
            open={true}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: 'blur(6px)',
                backgroundColor: 'rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
