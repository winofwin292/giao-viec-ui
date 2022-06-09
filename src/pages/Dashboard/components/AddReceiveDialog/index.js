import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import SelectAutoWidth from '../SelectAutoWidth';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import evaluteApi from '~/api/Evalutes/evaluteApi';
import userApi from '~/api/Users/useApi';
import typeApi from '~/api/Types/typeApi';
import { convert } from '../share';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AddReceiveDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [evalute, setEvalute] = React.useState('');
    const [evalutes, setEvalutes] = React.useState([]);
    const [type, setType] = React.useState('');
    const [types, setTypes] = React.useState([]);
    const [userID, setUserID] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [beginDate, setBeginDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const handleClickOpen = async () => {
        setOpen(true);
        const res_evalute = await evaluteApi.getAll();
        setEvalutes(res_evalute);
        const res_type = await typeApi.getAll();
        setTypes(res_type);
        const res_user = await userApi.getAll();
        setUsers(res_user);
    };
    const handleClose = () => {
        setEvalutes([]);
        setEvalute('');
        setTypes([]);
        setType('');
        setUsers([]);
        setUserID('');
        setBeginDate(new Date());
        setEndDate(new Date());
        setOpen(false);
    };
    const handlePickBeginDate = (newDate) => {
        setBeginDate(newDate);
    };
    const handlePickEndDate = (newDate) => {
        setEndDate(newDate);
    };

    const handleSubmit = () => {
        const newObj = {
            USER_ID: userID,
            NAME_USER: users[userID].NAME_USERS,
            WORK_TYPE_ID: type,
            WORK_TYPE_NAME: types[type].NAME_WORK_TYPES,
            WORK_EVALUTE_ID: evalute,
            WORK_EVALUTE_NAME: evalutes[evalute].NAME_WORK_EVALUTES,
            COMMENT: comment,
            BEGIN_DATE_AT: convert(beginDate.toString()),
            END_DATE_AT: convert(endDate.toString()),
            CREATED_AT: convert(new Date().toString()),
            UPDATED_AT: convert(new Date().toString()),
        };
        props.onSubmit((prev) => [...prev, newObj]);
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ m: 2 }}>
                Thêm người nhận việc
            </Button>
            <BootstrapDialog
                fullWidth
                maxWidth="lg"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Thêm người nhận việc
                </BootstrapDialogTitle>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '90%' },
                        p: 2,
                    }}
                >
                    <Grid container>
                        <Grid item xs={6}>
                            <SelectAutoWidth
                                data={users}
                                onChange={setUserID}
                                selected={userID}
                                contentKey="NAME_USERS"
                                label="Chọn người nhận việc"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Nội dung công việc"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectAutoWidth
                                data={types}
                                onChange={setType}
                                selected={type}
                                contentKey="NAME_WORK_TYPES"
                                label="Chọn loại công việc"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectAutoWidth
                                data={evalutes}
                                onChange={setEvalute}
                                selected={evalute}
                                contentKey="NAME_WORK_EVALUTES"
                                label="Chọn mức độ đánh giá công việc"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Ngày bắt đầu"
                                    value={beginDate}
                                    minDate={new Date('2017-01-01')}
                                    onChange={handlePickBeginDate}
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} />}
                                    disableMaskedInput
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Ngày kết thúc"
                                    value={endDate}
                                    minDate={new Date('2017-01-01')}
                                    onChange={handlePickEndDate}
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} />}
                                    disableMaskedInput
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end">
                            <Button variant="outlined" sx={{ m: 2, right: 25 }} onClick={handleSubmit}>
                                Xác nhận
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </BootstrapDialog>
        </div>
    );
}
