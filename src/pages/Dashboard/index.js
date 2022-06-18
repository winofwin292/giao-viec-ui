import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TaskTable from './components/TaskTable';

function Dashboard() {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
                <TaskTable />
            </Container>
        </Box>
    );
}

export default Dashboard;
