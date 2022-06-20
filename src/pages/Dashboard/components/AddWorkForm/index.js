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
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSelector } from 'react-redux';
import SelectAutoWidth from '../SelectAutoWidth';
import AddReceiveWork from '../AddReceiveWork';
import levelApi from '~/api/Levels/levelApi';
// import worksApi from '~/api/Works/worksApi';
import userApi from '~/api/Users/useApi';
import typeApi from '~/api/Types/typeApi';
import { convert } from '../share';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddWorkForm(props) {
    const userId = useSelector((state) => state.user.current.id);
    const cUserId = props.data?.USER_ID ? props.data?.USER_ID : userId;
    const cWorkReceiveId = props.data?.WORK_RECEIVE_ID ? props.data?.WORK_RECEIVE_ID : null;
    const cWorkId = props.data?.WORK_ID ? props.data?.WORK_ID : null;

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [note, setNote] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [levels, setLevels] = React.useState([]);
    const [beginDate, setBeginDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [received, setReceived] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [types, setTypes] = React.useState([]);

    const handleBeginDate = (newDate) => {
        setBeginDate(newDate);
    };
    const handleEndDate = (newDate) => {
        setEndDate(newDate);
    };

    const handleClickOpen = async () => {
        setOpen(true);
        const res_level = await levelApi.getAll();
        setLevels(res_level);
        const res_user = await userApi.getAll();
        setUsers(res_user);
        const res_type = await typeApi.getAll();
        setTypes(res_type);
    };

    const clearInput = () => {
        setReceived([]);
        setName('');
        setLevel('');
        setNote('');
        setLevels([]);
        setBeginDate(new Date());
        setEndDate(new Date());
    };

    const handleClose = () => {
        clearInput();
        setOpen(false);
    };

    const handleSave = async () => {
        received.forEach((element) => {
            const newBeginDate = convert(element.BEGIN_DATE_AT.toString());
            const newEndDate = convert(element.END_DATE_AT.toString());
            element.BEGIN_DATE_AT = newBeginDate;
            element.END_DATE_AT = newEndDate;
        });
        const data = {
            USER_ID: cUserId,
            WORK_LEVEL_ID: level,
            NAME_WORKS: name,
            NOTE: note,
            BEGIN_DATE_AT: convert(beginDate.toString()),
            END_DATE_AT: convert(endDate.toString()),
            CREATED_AT: convert(new Date().toString()),
            UPDATED_AT: convert(new Date().toString()),
            WORK_RECEIVE_ID: cWorkReceiveId,
            WORK_ID: cWorkId,
            WORK_RECEIVES: received,
        };
        console.log(data);
        // const res = await worksApi.createWork(data);
        // console.log(res);

        // clearInput();
        // setOpen(false);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {props.miniButton === true ? (
                    <IconButton aria-label="expand row" size="small" onClick={handleClickOpen}>
                        <AddTaskIcon />
                    </IconButton>
                ) : (
                    <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
                        Thêm công việc
                    </Button>
                )}

                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Thêm mới công việc
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
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={name}
                                        label="Tên công việc"
                                        onChange={(e) => setName(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectAutoWidth
                                        data={levels}
                                        onChange={setLevel}
                                        selected={level}
                                        contentKey="NAME_WORK_LEVELS"
                                        label="Chọn loại công việc"
                                    />
                                </Grid>
                                <Grid container direction="row">
                                    <Grid item xs={5.7}>
                                        <DesktopDatePicker
                                            label="Ngày bắt đầu"
                                            value={beginDate}
                                            minDate={new Date()}
                                            maxDate={new Date('01/01/2099')}
                                            onChange={handleBeginDate}
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => <TextField size="small" {...params} />}
                                            disableMaskedInput
                                        />
                                    </Grid>
                                    <Grid item xs={5.7}>
                                        <DesktopDatePicker
                                            label="Ngày hết hạn"
                                            value={endDate}
                                            minDate={beginDate}
                                            maxDate={
                                                props.data ? new Date(props.data.END_DATE_AT) : new Date('01/01/2099')
                                            }
                                            onChange={handleEndDate}
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => <TextField size="small" {...params} />}
                                            disableMaskedInput
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    multiline
                                    value={note}
                                    maxRows={7.2}
                                    minRows={7.2}
                                    label="Nội dung công việc"
                                    onChange={(e) => setNote(e.target.value)}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ height: '340px', m: 2 }}>
                                <AddReceiveWork
                                    data={{ users, types, note, beginDate, endDate }}
                                    onSelected={setReceived}
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

export default AddWorkForm;
