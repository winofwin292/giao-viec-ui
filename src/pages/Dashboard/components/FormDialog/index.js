import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import SelectAutoWidth from '../SelectAutoWidth';
import levelApi from '~/api/Levels/levelApi';
import evaluteApi from '~/api/Evalutes/evaluteApi';
import worksApi from '~/api/Works/worksApi';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [levels, setLevels] = React.useState([]);
    const [evalute, setEvalute] = React.useState('');
    const [evalutes, setEvalutes] = React.useState([]);
    const [endDate, setEndDate] = React.useState(new Date());

    const handlePickDate = (newDate) => {
        setEndDate(newDate);
    };

    const handleClickOpen = async () => {
        setOpen(true);
        const res_level = await levelApi.getAll();
        setLevels(res_level);
        const res_evalute = await evaluteApi.getAll();
        setEvalutes(res_evalute);
        // console.log(res);
    };

    function convert(str) {
        var date = new Date(str),
            mnth = ('0' + (date.getMonth() + 1)).slice(-2),
            day = ('0' + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join('/');
    }

    const handleClose = () => {
        setLevels([]);
        setLevel('');
        setOpen(false);
    };

    const handleSave = async () => {
        const data = {
            USER_ID: 1,
            WORK_LEVEL_ID: level,
            WORK_EVALUTE_ID: evalute,
            NAME_WORKS: name,
            END_DATE_AT: convert(endDate.toString()),
            CREATE_AT: convert(new Date().toString()),
            UPDATE_AT: convert(new Date().toString()),
        };
        console.log(data);
        const res = await worksApi.createWork(data);
        console.log(res);

        setLevel('');
        setEvalute('');
        // setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm công việc
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Thêm mới công việc
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
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
                            <TextField fullWidth label="Tên công việc" onChange={(e) => setName(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectAutoWidth
                                data={levels}
                                onChange={setLevel}
                                selected={level}
                                label="Chọn mức độ công việc"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectAutoWidth
                                data={evalutes}
                                onChange={setEvalute}
                                selected={evalute}
                                label="Chọn mức độ đánh giá công việc"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="For desktop"
                                    value={endDate}
                                    minDate={new Date('2017-01-01')}
                                    onChange={handlePickDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </div>
    );
}

export default FormDialog;
