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
// import projectApi from '~/api/Projects/projectApi';
import worksApi from '~/api/Works/worksApi';
import { SUCCESS, ERROR } from '~/components/CustomAlert/constants';
import CustomAlert from '~/components/CustomAlert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function WorkLogsDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [lengthData, setLengthData] = React.useState([]);
    const [totalTime, setTotalTime] = React.useState(0);
    const [refresh, setRefresh] = React.useState(false);

    //variable lọc
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 22, 59, 59);
    const [fromDate, setFromDate] = React.useState(firstDay);
    const [toDate, setToDate] = React.useState(lastDay);
    const [works, setWorks] = React.useState([]);
    const [work, setWork] = React.useState(-1);
    const [logs, setLogs] = React.useState([]);
    const [projects, setProjects] = React.useState([]);
    const [project, setProject] = React.useState(-1);

    //user id gán cứng
    const userId = 4;
    // const userId = useSelector((state) => state.user.current.id);

    //Trạng thái thông báo
    const [notify, setNotify] = React.useState({
        open: false,
        type: ERROR,
        msg: '',
    });

    //Lấy danh sách dự án cho select
    React.useEffect(() => {
        async function getProjectsAPI() {
            try {
                const req = {
                    ID: userId,
                };
                const res_project = await worksApi.getProjectByUserId(req);
                setProjects(res_project.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getProjectsAPI();
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
                setLengthData(res.data.length);
            } catch (error) {
                console.log(error.message);
            }
        }
        getAllLogAPI();
    }, [refresh]);

    //Lọc log theo id công việc
    React.useEffect(() => {
        let temp1 = [],
            temp2 = [],
            total;

        if (work === -1) {
            temp1 = logs.filter((e) => new Date(e.BEGIN_DATE_AT) >= fromDate && new Date(e.END_DATE_AT) <= toDate);
        } else {
            temp1 = logs.filter(
                (e) =>
                    e.WORK_RECEIVE_ID === work &&
                    new Date(e.BEGIN_DATE_AT) >= fromDate &&
                    new Date(e.END_DATE_AT) <= toDate,
            );
        }

        if (project === -1) {
            temp2 = temp1;
        } else {
            let nameProject = projects.find((i) => i.PROJECT_ID === project).NAME_PROJECT;
            temp2 = temp1.filter((e) => e.NAME_PROJECT === nameProject);
        }

        //tính tổng giờ làm việc
        total = temp2.reduce((partialTotal, e) => (partialTotal += e.TIME_WORK_LOGS), 0);
        setTotalTime(total);
        setData(temp2);
    }, [fromDate, logs, project, projects, toDate, work]);

    //thêm 1 dòng mới cho log
    const handleAddRows = () => {
        if (work === -1 && project === -1) {
            setNotify({
                open: true,
                type: ERROR,
                msg: 'Vui lòng chọn dự án và công việc khi thêm dòng mới',
            });
        } else {
            // let nameProject = projects.find((i) => i.PROJECT_ID === project).NAME_PROJECT;
            // let nameWork = works.find((i) => i.RECEIVE_ID === work).NAME_WORKS;
            // let nameUser = data.find((i) => i.WORK_RECEIVE_ID === work)?.NAME_USERS || '-';
            setLengthData((oldValue) => oldValue + 1);
            setData((oldRows) => [
                ...oldRows,
                {
                    STT: lengthData,
                    ID: null,
                    // NAME_PROJECT: nameProject,
                    // NAME_USERS: nameUser,
                    // NAME_WORKS: nameWork,
                    NAME_PROJECT: '-',
                    NAME_USERS: '-',
                    NAME_WORKS: '-',
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
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setWork(-1);
        setProject(-1);
        setLengthData(logs.length);
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
        //lọc các dòng có ID rỗng để gởi về sv
        const newRows = data.filter((e) => e.ID === null);
        // console.log(newRows);
        const res = await workLogsApi.addLogs(newRows);
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
        //làm mới dữ liệu dưới nền, khi lọc sẽ hiển thị dữ liệu mới
        setRefresh(!refresh);
        // handleClose();
    };

    //Lấy danh sách công việc theo project id và user id
    const handleChangeProject = (event) => {
        setProject(event.target.value);
        async function getWorksAPI() {
            try {
                const req = {
                    PROJECT_ID: event.target.value,
                    USER_ID: userId,
                };
                const res_work = await worksApi.getWorkByProjectId(req);

                setWorks(res_work.data);
                //Đặt lại hiển thị công việc là tất cả
                setWork(-1);
            } catch (error) {
                console.log(error.message);
            }
        }
        getWorksAPI();
    };
    const handleChangeWork = (event) => {
        setWork(event.target.value);
    };

    return (
        <div style={{ marginLeft: '5px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Button variant="outlined" sx={{ height: '40px' }} onClick={handleClickOpen}>
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
                                    <Grid item xs={2}>
                                        <FormControl sx={{ m: 2, ml: '0px !important', minWidth: '100%' }} size="small">
                                            <InputLabel id="select-project">Dự án</InputLabel>
                                            <Select
                                                labelId="select-project"
                                                id="select-project"
                                                value={project}
                                                label="Dự án"
                                                onChange={handleChangeProject}
                                            >
                                                <MenuItem value={-1}>Tất cả</MenuItem>
                                                {projects.map((element, index) => (
                                                    <MenuItem key={index} value={element.PROJECT_ID}>
                                                        {element.NAME_PROJECT}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl sx={{ m: 2, ml: 3, minWidth: '100%' }} size="small">
                                            <InputLabel id="select-work">Công việc</InputLabel>
                                            <Select
                                                labelId="select-work"
                                                id="select-work"
                                                value={work}
                                                label="Công việc"
                                                onChange={handleChangeWork}
                                            >
                                                <MenuItem value={-1}>Tất cả</MenuItem>
                                                {works.map((element, index) => (
                                                    <MenuItem key={index} value={element.RECEIVE_ID}>
                                                        {element.NAME_WORKS}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs>
                                        <Typography sx={{ m: 2, ml: '40px !important', minWidth: '100%' }}>
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
                        <CustomAlert data={notify} onClose={setNotify} />
                    </Box>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
}

export default WorkLogsDialog;
