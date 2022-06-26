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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { useSelector } from 'react-redux';
import WorkLogsTable from '../WorkLogsTable';
import workLogsApi from '~/api/WorkLogs/workLogsApi';
import { SUCCESS, ERROR } from '~/components/CustomAlert/constants';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function WorkLogsDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [works, setWorks] = React.useState([]);
    const [work, setWork] = React.useState('');
    const [logs, setLogs] = React.useState([]);

    // const userId = useSelector((state) => state.user.current.id);

    const handleChange = (event) => {
        setWork(event.target.value);
    };

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                const req = {
                    //sử dụng id cứng
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

    React.useEffect(() => {
        async function getLogsApi() {
            try {
                const req = {
                    ID: work,
                };
                const res = await workLogsApi.getByIdWork(req);
                res.data.forEach((element, index) => {
                    element.STT = index + 1;
                    element.BEGIN_DATE_AT = new Date(element.BEGIN_DATE_AT);
                    element.END_DATE_AT = new Date(element.END_DATE_AT);
                    element.CREATED_AT = new Date(element.CREATED_AT);
                    element.UPDATED_AT = new Date(element.UPDATED_AT);
                });
                setLogs(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        if (work) {
            getLogsApi();
        } else {
            setLogs([]);
        }
    }, [work]);

    const handleAddRows = () => {
        setLogs((oldRows) => [
            ...oldRows,
            {
                STT: oldRows.length + 1,
                ID: null,
                WORK_RECEIVE_ID: work,
                BEGIN_DATE_AT: new Date(),
                END_DATE_AT: new Date(),
                TIME_WORK_LOGS: 0,
                TIME_CHECK: 0,
                CONTENT: '',
                TITLE: '',
                CREATED_AT: new Date(),
                UPDATED_AT: new Date(),
            },
        ]);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setWork('');
        setOpen(false);
    };

    const handleSave = async () => {
        // console.log(logs);
        const res = await workLogsApi.addLogs(logs);
        // console.log(res);
        if (res.status === 200) {
            props.setNotify({
                open: true,
                type: SUCCESS,
                msg: 'Thêm thành công',
            });
        } else {
            props.setNotify({
                open: true,
                type: ERROR,
                msg: 'Lỗi: không thêm được dữ liệu',
            });
        }

        handleClose();
    };

    return (
        <div style={{ marginLeft: '5px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Button
                    variant="outlined"
                    sx={{ height: '40px' }}
                    onClick={handleClickOpen}
                    // startIcon={<AddCircleIcon />}
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
                                        {/* <MenuItem value="">
                                            <em>Chọn công việc</em>
                                        </MenuItem> */}
                                        {works.map((element, index) => (
                                            <MenuItem key={index} value={element.ID}>
                                                {element.NAME_WORKS}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={handleAddRows}>Thêm dòng mới</Button>
                                <Button>Chức năng 2</Button>
                            </Grid>
                            <Grid item xs={12} sx={{ height: '470px', minWidth: '100%' }}>
                                <WorkLogsTable
                                    data={{
                                        logs: logs,
                                    }}
                                    func={{
                                        setLogs,
                                    }}
                                />
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
