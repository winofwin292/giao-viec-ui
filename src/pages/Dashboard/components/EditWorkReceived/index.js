import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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
import workReceivesApi from '~/api/WorkReceives/workReceivesApi';
import { SUCCESS, ERROR } from '~/components/CustomAlert/constants';

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

function EditWorkReceived(props) {
    const oldData = props.data;
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState(oldData.COMMENT_WORK_RECEIVE);
    const [userID, setUserID] = React.useState('');
    const [beginDate, setBeginDate] = React.useState(new Date(oldData.BEGIN_DATE_AT));
    const [endDate, setEndDate] = React.useState(new Date(oldData.END_DATE_AT));
    const [users, setUsers] = React.useState([]);

    const handleClickOpen = async () => {
        setOpen(true);
        const res_user = await userApi.getAll();
        setUsers(res_user.data);
        setUserID(oldData.USER_ID);
    };
    const handleClose = () => {
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

    const handleSubmit = async () => {
        const newObj = {
            ID: oldData.ID,
            USER_ID: userID,
            COMMENT_WORK_RECEIVE: comment,
            BEGIN_DATE_AT: beginDate,
            END_DATE_AT: endDate,
        };

        const res = await workReceivesApi.update(newObj);
        if (res.status === 200) {
            props.setNotify({
                open: true,
                type: SUCCESS,
                msg: 'Chỉnh sửa thành công',
            });
        } else {
            props.setNotify({
                open: true,
                type: ERROR,
                msg: 'Lỗi: lỗi khi chỉnh sửa dữ liệu',
            });
        }
        handleClose();
        //Làm mới dữ liệu
        props.setRefresh(!props.refresh);
    };

    return (
        <div>
            <IconButton aria-label="expand row" size="small" onClick={handleClickOpen}>
                <ModeEditIcon />{' '}
            </IconButton>
            <BootstrapDialog
                fullWidth
                maxWidth="lg"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Chỉnh sửa công việc
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
                                value={comment}
                                size="small"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Ngày bắt đầu"
                                    value={beginDate}
                                    minDate={new Date(oldData.BEGIN_DATE_AT)}
                                    maxDate={endDate}
                                    onChange={handlePickBeginDate}
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField size="small" {...params} />}
                                    disableMaskedInput
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Ngày kết thúc"
                                    value={endDate}
                                    minDate={beginDate}
                                    maxDate={new Date(props.data.MAX_END_DATE_AT)}
                                    onChange={handlePickEndDate}
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField size="small" {...params} />}
                                    disableMaskedInput
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                sx={{ m: 2, right: 25 }}
                                onClick={handleSubmit}
                                endIcon={<CheckIcon />}
                            >
                                Xác nhận
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </BootstrapDialog>
        </div>
    );
}

export default EditWorkReceived;
