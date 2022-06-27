import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

//constants
export const headCells = [
    {
        id: 'STT',
        numeric: true,
        label: 'STT',
        minWidth: 40,
    },
    {
        id: 'NAME_WORKS',
        numeric: false,
        label: 'Tên công việc',
        minWidth: 150,
    },
    {
        id: 'NAME_USERS',
        numeric: false,
        label: 'Người tạo',
        minWidth: 160,
    },
    {
        id: 'NAME_WORK_LEVELS',
        numeric: false,
        label: 'Loại',
        minWidth: 170,
    },
    {
        id: 'BEGIN_DATE_AT',
        numeric: false,
        label: 'Bắt đầu',
        minWidth: 120,
    },
    {
        id: 'END_DATE_AT',
        numeric: false,
        label: 'Hết hạn',
        minWidth: 120,
    },
    {
        id: 'STATUS',
        numeric: false,
        label: 'Trạng thái',
        minWidth: 110,
    },
    {
        id: 'NAME_RECEIVERS',
        numeric: false,
        label: 'Người nhận',
        minWidth: 300,
    },
    {
        id: 'TOTAL_TIME',
        numeric: false,
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
