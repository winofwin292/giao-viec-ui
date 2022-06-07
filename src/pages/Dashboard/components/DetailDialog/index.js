import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import worksApi from '~/api/Works/worksApi';

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

export default function DetailDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [childData, setChildData] = React.useState([]);

    const handleClickOpen = async () => {
        const data_req = {
            ID: props.id,
        };
        setOpen(true);
        const res = await worksApi.getById(data_req);
        setChildData(res);
    };
    const handleClose = () => {
        setOpen(false);
        setChildData([]);
    };

    return (
        <div>
            <IconButton aria-label="expand row" size="small" onClick={(e) => handleClickOpen(e)}>
                <InfoIcon />
            </IconButton>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Chi tiết giao việc
                </BootstrapDialogTitle>
                <Box sx={{ margin: 1, marginBottom: 4 }}>
                    {/* Table child */}
                    <Table size="small" aria-label="purchases">
                        {/* <EnhancedTableHead /> */}
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tên người nhận</TableCell>
                                <TableCell align="right">Kiểu công việc</TableCell>
                                <TableCell align="right">Nội dung</TableCell>
                                <TableCell align="right">Tổng thời gian</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {childData.map((childRow, index) => (
                                <TableRow key={childRow.ID}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{childRow.TEN_NGUOI_NHAN}</TableCell>
                                    <TableCell align="right">{childRow.NAME_WORK_TYPES}</TableCell>
                                    <TableCell align="right">{childRow.COMMENT_WORK_RECEIVE}</TableCell>
                                    <TableCell align="right">{childRow.TOTAL_TIME}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* End table child */}
                </Box>
            </BootstrapDialog>
        </div>
    );
}
