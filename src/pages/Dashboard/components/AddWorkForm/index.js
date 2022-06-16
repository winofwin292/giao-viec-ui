import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import SelectAutoWidth from '../SelectAutoWidth';
import levelApi from '~/api/Levels/levelApi';
import worksApi from '~/api/Works/worksApi';
import AddReceiveWork from '../AddReceiveWork';
import AddReceiveDialog from '../AddReceiveDialog';
import userApi from '~/api/Users/useApi';
import { convert } from '../share';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddWorkForm(props) {
    const cUserId = props.data?.USER_ID ? props.data?.USER_ID : 1;
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
    };

    const handleClose = () => {
        setLevels([]);
        setLevel('');
        setNote('');
        setBeginDate(new Date());
        setEndDate(new Date());
        setOpen(false);
        setReceived([]);
    };

    const handleSave = async () => {
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
        // console.log(data);
        const res = await worksApi.createWork(data);
        console.log(res);

        setReceived([]);
        setName('');
        setLevel('');
        setNote('');
        setBeginDate(new Date());
        setEndDate(new Date());
        setLevel('');
        setOpen(false);
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
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Thêm mới công việc
                            </Typography>
                            <Button
                                autoFocus
                                variant="outlined"
                                color="inherit"
                                onClick={handleSave}
                                endIcon={<SaveIcon />}
                            >
                                Lưu
                            </Button>
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
                                            renderInput={(params) => <TextField {...params} />}
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
                                            renderInput={(params) => <TextField {...params} />}
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
                                    maxRows={9.4}
                                    minRows={9.4}
                                    label="Nội dung công việc"
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ height: '240px', m: 2 }}>
                                <AddReceiveWork dataTable={users} />
                            </Grid>
                            <Grid item xs={12} sx={{ m: '0 2' }}>
                                <AddReceiveDialog onSubmit={setReceived} endDate={endDate} />
                            </Grid>
                        </Grid>
                    </Box>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
}

export default AddWorkForm;
