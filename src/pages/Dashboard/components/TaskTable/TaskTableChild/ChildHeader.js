import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import { headCells, StyledTableCell } from '~/pages/Dashboard/components/share';

function ChildHeader(props) {
    const { order, orderBy, onRequestSort } = props;
    const colorCode = ['#03a9f4', '#0288d1', '#01579b'][Math.floor(Math.random() * 3)] + '!important';

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ minWidth: headCell.minWidth }}
                        sx={{ padding: '5px', backgroundColor: colorCode }}
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
                    </StyledTableCell>
                ))}
                <StyledTableCell
                    colSpan={3}
                    align="center"
                    style={{ minWidth: 20 }}
                    sx={{ padding: '5px', backgroundColor: colorCode }}
                >
                    Công cụ
                </StyledTableCell>
            </TableRow>
        </TableHead>
    );
}

ChildHeader.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default ChildHeader;
export { headCells };
