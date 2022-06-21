import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSelector } from 'react-redux';
import WorkLogsTable from '../WorkLogsTable';
import workLogsApi from '~/api/WorkLogs/workLogsApi';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function WorkLogsDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [works, setWorks] = React.useState([]);
    const [work, setWork] = React.useState('');

    // const userId = useSelector((state) => state.user.current.id);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setWork(event.target.value);
    };

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                const req = {
                    ID: 4,
                };
                const res = await workLogsApi.getByIdUser(req);
                setWorks(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchMyAPI();
    }, []);

    const handleClickOpen = async () => {
        setOpen(true);
    };

    const clearInput = () => {};

    const handleClose = () => {
        clearInput();
        setOpen(false);
    };

    const handleSave = async () => {};

    return (
        <div style={{ marginLeft: '5px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Button
                    variant="outlined"
                    sx={{ height: '40px' }}
                    onClick={handleClickOpen}
                    startIcon={<AddCircleIcon />}
                >
                    Demo Logs
                </Button>

                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Nhập log
                            </Typography>
                            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2, width: '90%' },
                            p: 2,
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl sx={{ mt: 2, mb: 2, minWidth: '100%' }} size="small">
                                    <InputLabel id="select-works">Công việc</InputLabel>
                                    <Select
                                        labelId="select-works"
                                        id="select-works"
                                        value={work}
                                        label="Công việc"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>Chọn công việc</em>
                                        </MenuItem>
                                        {works.map((element, index) => (
                                            <MenuItem key={index} value={element.ID}>
                                                {element.NAME_WORKS}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button>Chức năng 1</Button>
                                <Button>Chức năng 2</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <WorkLogsTable />
                            </Grid>

                            <Grid item xs={12} sx={{ m: '0 2' }}>
                                <Fab
                                    sx={{
                                        position: 'absolute',
                                        bottom: 16,
                                        right: 16,
                                    }}
                                    aria-label="Lưu"
                                    color="primary"
                                    size="medium"
                                    variant="extended"
                                    onClick={handleSave}
                                >
                                    <SaveIcon sx={{ mr: 1 }} /> Lưu
                                </Fab>
                            </Grid>
                        </Grid>
                    </Box>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
}

export default WorkLogsDialog;
