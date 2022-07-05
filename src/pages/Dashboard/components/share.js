import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

//constants
export const headCells = [
    {
        id: 'STT',
        label: 'STT',
        minWidth: 50,
    },
    {
        id: 'NAME_WORKS',
        label: 'Tên công việc',
        minWidth: 150,
    },
    {
        id: 'NAME_PROJECT',
        label: 'Dự án',
        minWidth: 150,
    },
    {
        id: 'NAME_USERS',
        label: 'Người tạo',
        minWidth: 160,
    },
    {
        id: 'NAME_WORK_LEVELS',
        label: 'Loại',
        minWidth: 170,
    },
    {
        id: 'NOTE',
        label: 'Nội dung',
        minWidth: 200,
    },
    {
        id: 'WORK_GOALS',
        label: 'Mục tiêu công việc',
        minWidth: 200,
    },
    {
        id: 'BEGIN_DATE_AT',
        label: 'Bắt đầu',
        minWidth: 100,
    },
    {
        id: 'END_DATE_AT',
        numeric: false,
        label: 'Hết hạn',
        minWidth: 100,
    },
    {
        id: 'STATUS',
        label: 'Trạng thái',
        minWidth: 110,
    },
    {
        id: 'NAME_RECEIVERS',
        label: 'Người nhận',
        minWidth: 300,
    },
    {
        id: 'TOTAL_TIME',
        label: 'Tổng thời gian',
        minWidth: 150,
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
