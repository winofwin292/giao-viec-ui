import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

//constants
export const headCells = [
    {
        id: 'STT',
        numeric: true,
        disablePadding: true,
        label: 'STT',
        minWidth: 40,
    },
    {
        id: 'TEN_CV',
        numeric: false,
        disablePadding: false,
        label: 'Tên công việc',
        minWidth: 150,
    },
    {
        id: 'TEN_NGUOI_TAO',
        numeric: false,
        disablePadding: false,
        label: 'Người tạo',
        minWidth: 160,
    },
    {
        id: 'LOAI_CV',
        numeric: false,
        disablePadding: false,
        label: 'Loại',
        minWidth: 170,
    },
    {
        id: 'TG_TAO',
        numeric: false,
        disablePadding: false,
        label: 'Bắt đầu',
        minWidth: 120,
    },
    {
        id: 'TG_HET_HAN',
        numeric: false,
        disablePadding: false,
        label: 'Hết hạn',
        minWidth: 120,
    },
    {
        id: 'IS_SEEN',
        numeric: false,
        disablePadding: false,
        label: 'Trạng thái',
        minWidth: 110,
    },
    {
        id: 'TEN_NGUOI_NHAN',
        numeric: false,
        disablePadding: false,
        label: 'Người nhận',
        minWidth: 300,
    },
    {
        id: 'TOTAL_TIME',
        numeric: false,
        disablePadding: false,
        label: 'Tổng thời gian',
        minWidth: 120,
    },
];

//functions
export function convert(str) {
    var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
}

//styles
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.common.white,
    },
}));
