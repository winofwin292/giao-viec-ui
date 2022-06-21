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
import EditWorkReceived from '../EditWorkReceived';
import AddWorkForm from '../AddWorkForm';
import ChangeStatus from '../ChangeStatus';
import { convert } from '~/pages/Dashboard/components/share';
import { SUCCESS } from '~/components/CustomAlert/constants';
import CustomAlert from '~/components/CustomAlert';

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

function DetailDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [childData, setChildData] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);
    const [notify, setNotify] = React.useState({
        open: false,
        type: SUCCESS,
        msg: '',
    });

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                const data_req = {
                    ID: props.id,
                };
                const res = await worksApi.getById(data_req);
                setChildData(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        if (open) {
            fetchMyAPI();
        } else {
            setChildData([]);
        }
    }, [open, props.id]);

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                const data_req = {
                    ID: props.id,
                };
                const res = await worksApi.getById(data_req);
                setChildData(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchMyAPI();
    }, [props.id, refresh]);

    const handleClickOpen = async () => {
        setOpen(true);
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
            <BootstrapDialog
                fullWidth
                maxWidth="lg"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Chi tiết giao việc
                </BootstrapDialogTitle>
                <Box sx={{ margin: 1, marginBottom: 4 }}>
                    {/* Table child */}
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tên người nhận</TableCell>
                                <TableCell align="right">Kiểu công việc</TableCell>
                                <TableCell align="right">Nội dung</TableCell>
                                <TableCell align="right">Ngày bắt đầu</TableCell>
                                <TableCell align="right">Ngày kết thúc</TableCell>
                                <TableCell align="right">Tổng thời gian</TableCell>
                                <TableCell align="right">Trạng thái</TableCell>
                                <TableCell align="center" colSpan={3}>
                                    Công cụ
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {childData.map((childRow, index) => (
                                <TableRow key={childRow.ID}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{childRow.NAME_RECEIVERS}</TableCell>
                                    <TableCell align="right">{childRow.NAME_WORK_TYPES}</TableCell>
                                    <TableCell align="right">{childRow.COMMENT_WORK_RECEIVE}</TableCell>
                                    <TableCell align="right">{convert(childRow.BEGIN_DATE_AT)}</TableCell>
                                    <TableCell align="right">{convert(childRow.END_DATE_AT)}</TableCell>
                                    <TableCell align="right">{childRow.TOTAL_TIME}</TableCell>
                                    <TableCell align="right">{childRow.STATUS}</TableCell>
                                    <TableCell>
                                        <ChangeStatus
                                            setRefresh={setRefresh}
                                            refresh={refresh}
                                            miniButton={true}
                                            setNotify={setNotify}
                                            data={{
                                                ID: childRow.ID,
                                                STATUS: childRow.STATUS,
                                                USER_ID: childRow.USER_ID,
                                            }}
                                            table="receive"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <EditWorkReceived
                                            setRefresh={setRefresh}
                                            refresh={refresh}
                                            setNotify={setNotify}
                                            data={{
                                                ID: childRow.ID,
                                                USER_ID: childRow.USER_ID,
                                                TEN_NGUOI_NHAN: childRow.NAME_RECEIVERS,
                                                COMMENT_WORK_RECEIVE: childRow.COMMENT_WORK_RECEIVE,
                                                BEGIN_DATE_AT: childRow.BEGIN_DATE_AT,
                                                END_DATE_AT: childRow.END_DATE_AT,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <AddWorkForm
                                            setRefresh={setRefresh}
                                            refresh={refresh}
                                            miniButton={true}
                                            setNotify={setNotify}
                                            data={{
                                                WORK_ID: props.id,
                                                WORK_RECEIVE_ID: childRow.ID,
                                                USER_ID: childRow.USER_ID,
                                                END_DATE_AT: childRow.END_DATE_AT,
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* End table child */}
                </Box>
                <CustomAlert data={notify} onClose={setNotify} />
            </BootstrapDialog>
        </div>
    );
}

export default DetailDialog;
