import * as React from 'react';
import { AppBar, Box, Button, Dialog, Fab, Grid, IconButton, TextField } from '@mui/material';
import { Slide, Toolbar, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { useSelector } from 'react-redux';
import WorkLogsTable from '../WorkLogsTable';
import workLogsApi from '~/api/WorkLogs/workLogsApi';
import { SUCCESS, ERROR } from '~/components/CustomAlert/constants';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function WorkLogsDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [totalTime, setTotalTime] = React.useState(0);

    //variable lọc
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const [fromDate, setFromDate] = React.useState(firstDay);
    const [toDate, setToDate] = React.useState(lastDay);
    const [works, setWorks] = React.useState([]);
    const [work, setWork] = React.useState(-1);
    const [logs, setLogs] = React.useState([]);

    //user id gán cứng
    const userId = 4;
    // const userId = useSelector((state) => state.user.current.id);

    const handleChange = (event) => {
        setWork(event.target.value);
    };

    //Lấy danh sách công việc cho select
    React.useEffect(() => {
        async function getWorksAPI() {
            try {
                const req = {
                    ID: userId,
                };
                const res = await workLogsApi.getByIdUser(req);
                setWorks(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getWorksAPI();
    }, []);

    //Lấy tất cả log của user đang login
    React.useEffect(() => {
        async function getAllLogAPI() {
            try {
                const req = {
                    ID: userId,
                };
                const res = await workLogsApi.getAllLogByIdUser(req);
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
        getAllLogAPI();
    }, []);

    React.useEffect(() => {
        //lấy log theo id công việc
        let temp = [],
            total;

        if (work === -1) {
            temp = logs.filter((e) => new Date(e.BEGIN_DATE_AT) >= fromDate && new Date(e.END_DATE_AT) <= toDate);
        } else {
            temp = logs.filter(
                (e) =>
                    e.WORK_RECEIVE_ID === work &&
                    new Date(e.BEGIN_DATE_AT) >= fromDate &&
                    new Date(e.END_DATE_AT) <= toDate,
            );
        }

        //tính tổng giờ làm việc
        total = temp.reduce((partialTotal, e) => (partialTotal += e.TIME_WORK_LOGS), 0);
        setTotalTime(total);
        setData(temp);
    }, [fromDate, logs, toDate, work]);

    //thêm 1 dòng mới cho log
    const handleAddRows = () => {
        setData((oldRows) => [
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
        setWork(-1);
        setOpen(false);
    };

    //sự kiện thay chọn ngày
    const handleFromDate = (newDate) => {
        setFromDate(newDate);
    };

    const handleToDate = (newDate) => {
        setToDate(newDate);
    };

    //Lưu log
    const handleSave = async () => {
        // console.log(logs);
        const res = await workLogsApi.addLogs(data);
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
                            <Grid container item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid item xs={2}>
                                        <FormControl sx={{ minWidth: '100%' }} size="small">
                                            <DesktopDatePicker
                                                label="Từ ngày"
                                                value={fromDate}
                                                // minDate={beginDate}
                                                maxDate={toDate}
                                                onChange={handleFromDate}
                                                inputFormat="dd/MM/yyyy"
                                                renderInput={(params) => (
                                                    <TextField sx={{ ml: '0px !important' }} size="small" {...params} />
                                                )}
                                                disableMaskedInput
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl sx={{ minWidth: '100%' }} size="small">
                                            <DesktopDatePicker
                                                label="Đến ngày"
                                                value={toDate}
                                                // minDate={beginDate}
                                                // maxDate={toDate}
                                                onChange={handleToDate}
                                                inputFormat="dd/MM/yyyy"
                                                renderInput={(params) => (
                                                    <TextField sx={{ ml: '0px !important' }} size="small" {...params} />
                                                )}
                                                disableMaskedInput
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl sx={{ m: 2, ml: '0px !important', minWidth: '100%' }} size="small">
                                            <InputLabel id="select-works">Công việc</InputLabel>
                                            <Select
                                                labelId="select-works"
                                                id="select-works"
                                                value={work}
                                                label="Công việc"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={-1}>Tất cả</MenuItem>
                                                {works.map((element, index) => (
                                                    <MenuItem key={index} value={element.ID}>
                                                        {element.NAME_WORKS}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography sx={{ m: 2, minWidth: '100%' }}>
                                            Tổng số giờ làm việc: {totalTime} giờ
                                        </Typography>
                                    </Grid>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={handleAddRows}>Thêm dòng mới</Button>
                                <Button>Chức năng 2</Button>
                            </Grid>
                            <Grid item xs={12} sx={{ height: '470px', minWidth: '100%' }}>
                                <WorkLogsTable
                                    data={{
                                        logs: data,
                                    }}
                                    func={{
                                        setData,
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
