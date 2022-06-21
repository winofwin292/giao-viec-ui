import * as React from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useSelector } from 'react-redux';
import workReceivesApi from '~/api/WorkReceives/workReceivesApi';
import worksApi from '~/api/Works/worksApi';

const statusWork = [
    {
        value: 1,
        label: 'Chưa hoàn thành',
    },
    {
        value: 2,
        label: 'Hoàn thành',
    },
];

function ChangeStatus(props) {
    const objStatus = statusWork.find((element) => element.label === props.data.STATUS);
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(objStatus.value);
    const loginInUser = useSelector((state) => state.user.current);
    // console.log(loginInUser);

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const dataReq = {
            ID: props.data.ID,
            STATUS: status,
        };
        let res = null;
        if (props.table === 'receive') res = await workReceivesApi.updateStatus(dataReq);
        else if (props.table === 'work') res = await worksApi.updateStatus(dataReq);

        //Kiểm tra mã lỗi, nếu lỗi 400 -. công việc được giao chưa hoàn thành
        console.log(res);

        setOpen(false);
    };
    return (
        <div>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={handleClickOpen}
                disabled={!(props.data.USER_ID === loginInUser.id)}
            >
                <AssignmentTurnedInIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Trạng thái công việc</DialogTitle>
                <DialogContent>
                    <DialogContentText>Hãy chọn hộp thoại bên dưới để thay đổi trạng thái công việc</DialogContentText>
                    <FormControl sx={{ mt: 3, minWidth: '100%' }}>
                        <InputLabel id="work-receive-state">Trạng thái công việc</InputLabel>
                        <Select
                            labelId="work-receive-state"
                            id="work-receive-state"
                            value={status}
                            onChange={handleChange}
                            autoWidth
                            label="Trạng thái công việc"
                        >
                            {statusWork.map((element, index) => (
                                <MenuItem key={index} value={element.value}>
                                    {element.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy bỏ</Button>
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ChangeStatus;
