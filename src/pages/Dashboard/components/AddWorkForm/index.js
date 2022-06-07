import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function AddWorkForm() {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '45%' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField id="standard-basic" label="Outlined" variant="standard" />
                <TextField id="standard-basic" label="Outlined" variant="standard" />
            </div>
            <div>
                <TextField fullWidth label="Outlined" />
            </div>

            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    xs=6 md=8
                </Grid>
                <Grid item xs={6} md={4}>
                    xs=6 md=4
                </Grid>
                <Grid item xs={6} md={4}>
                    xs=6 md=4
                </Grid>
                <Grid item xs={6} md={8}>
                    xs=6 md=8
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddWorkForm;
