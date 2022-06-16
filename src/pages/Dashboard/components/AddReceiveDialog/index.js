import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import SelectAutoWidth from '../SelectAutoWidth';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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

function AddReceiveDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [type, setType] = React.useState('');
    const [types, setTypes] = React.useState([]);
    const [userID, setUserID] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [beginDate, setBeginDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const handleClickOpen = async () => {
        setOpen(true);
        const res_type = await typeApi.getAll();
        setTypes(res_type);
        const res_user = await userApi.getAll();
        setUsers(res_user);
    };
    const handleClose = () => {
        setTypes([]);
        setType('');
        setUsers([]);
        setUserID('');
        setComment('');
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
            NAME_USER: users.filter((item) => item.ID === userID)[0].NAME_USERS,
            WORK_TYPE_ID: type,
            WORK_TYPE_NAME: types.filter((item) => item.ID === type)[0].NAME_WORK_TYPES,
            COMMENT_WORK_RECEIVE: comment,
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Button variant="contained" onClick={handleClickOpen} sx={{ m: 2 }} startIcon={<AddCircleIcon />}>
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
                            p: 1,
                        }}
                    >
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <SelectAutoWidth
                                            data={users}
                                            onChange={setUserID}
                                            selected={userID}
                                            contentKey="NAME_USERS"
                                            label="Chọn người nhận việc"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <SelectAutoWidth
                                            data={types}
                                            onChange={setType}
                                            selected={type}
                                            contentKey="NAME_WORK_TYPES"
                                            label="Chọn loại công việc"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} direction="row">
                                    <Grid item xs={5.7}>
                                        <Grid item xs={12}>
                                            <DesktopDatePicker
                                                label="Ngày bắt đầu"
                                                value={beginDate}
                                                minDate={new Date()}
                                                maxDate={props.endDate}
                                                onChange={handlePickBeginDate}
                                                inputFormat="dd/MM/yyyy"
                                                renderInput={(params) => <TextField {...params} />}
                                                disableMaskedInput
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5.7}>
                                        <Grid item xs={12}>
                                            <DesktopDatePicker
                                                label="Ngày kết thúc"
                                                value={endDate}
                                                minDate={beginDate}
                                                maxDate={props.endDate}
                                                onChange={handlePickEndDate}
                                                inputFormat="dd/MM/yyyy"
                                                renderInput={(params) => <TextField {...params} />}
                                                disableMaskedInput
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        value={comment}
                                        maxRows={8.6}
                                        minRows={8.6}
                                        label="Nội dung công việc"
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    sx={{ m: 2, right: 27 }}
                                    onClick={handleSubmit}
                                    endIcon={<CheckIcon />}
                                >
                                    Xác nhận
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </BootstrapDialog>
            </LocalizationProvider>
        </div>
    );
}

export default AddReceiveDialog;
