import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';

const headCells = [
    {
        id: 'ID',
        numeric: true,
        disablePadding: true,
        label: 'ID',
        minWidth: 50,
    },
    {
        id: 'TEN_CV',
        numeric: false,
        disablePadding: false,
        label: 'Tên công việc',
        minWidth: 250,
    },
    {
        id: 'TEN_NGUOI_TAO',
        numeric: false,
        disablePadding: false,
        label: 'Người tạo',
        minWidth: 200,
    },
    {
        id: 'LOAI_CV',
        numeric: false,
        disablePadding: false,
        label: 'Loại',
        minWidth: 200,
    },
    {
        id: 'TG_TAO',
        numeric: false,
        disablePadding: false,
        label: 'Ngày tạo',
        minWidth: 140,
    },
    {
        id: 'TG_HET_HAN',
        numeric: false,
        disablePadding: false,
        label: 'Ngày hết hạn',
        minWidth: 150,
    },
    {
        id: 'IS_SEEN',
        numeric: false,
        disablePadding: false,
        label: 'Trạng thái',
        minWidth: 140,
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
        minWidth: 160,
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ minWidth: headCell.minWidth }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
export { headCells };
