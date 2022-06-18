import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import worksApi from '~/api/Works/worksApi';
import DetailDialog from '../DetailDialog';
import ChildHeader from './TaskTableChild/ChildHeader';
import ChildRow from './TaskTableChild/ChildRow';
import { getComparator, stableSort } from './sortTaskTable';
import { convert } from '~/pages/Dashboard/components/share';

function RowTaskTable(props) {
    const data = props.data;
    const [open, setOpen] = React.useState(false);
    const [childData, setChildData] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('ID');
    const [selected, setSelected] = React.useState([]);
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX + 2,
                      mouseY: event.clientY - 6,
                  }
                : null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleOpen = async (event, id) => {
        event.preventDefault();
        setOpen(!open);

        const data_req = {
            WORK_ID: id,
        };

        if (open === false) {
            // console.log('show');
            const res = await worksApi.getChild(data_req);
            var i = 1;
            res.forEach((item) => {
                item.STT = i;
                i++;
            });
            // console.log(res);
            setChildData(res);
        } else {
            // console.log('end show');
            setChildData([]);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        event.preventDefault();
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <React.Fragment>
            <TableRow
                hover
                role="checkbox"
                aria-checked={props.isItemSelected}
                tabIndex={-1}
                key={data.ID}
                selected={props.isItemSelected}
                sx={{ '& > *': { borderBottom: 'unset' } }}
                // onClick={(event) => handleOpen(event)}
                onContextMenu={handleContextMenu}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        checked={props.isItemSelected}
                        onClick={props.onClick}
                        inputProps={{
                            'aria-labelledby': props.labelId,
                        }}
                    />
                </TableCell>
                <TableCell component="th" id={props.labelId} scope="row" sx={{ padding: '5px 10px' }} align="center">
                    {data.STT}
                </TableCell>
                <TableCell align="left" sx={{ padding: '5px 10px' }}>
                    {data.NAME_WORKS}
                </TableCell>
                <TableCell align="left" sx={{ padding: '5px 10px' }}>
                    {data.NAME_USERS}
                </TableCell>
                <TableCell align="left" sx={{ padding: '5px 10px' }}>
                    {data.NAME_WORK_LEVELS}
                </TableCell>
                <TableCell align="left" sx={{ padding: '5px 10px' }}>
                    {convert(data.BEGIN_DATE_AT)}
                </TableCell>
                <TableCell align="left" sx={{ padding: '5px 10px' }}>
                    {convert(data.END_DATE_AT)}
                </TableCell>
                <TableCell align="left" sx={{ padding: '5px 10px' }}>
                    {data.IS_SEEN === 1 ? 'Đã xem' : 'Chưa xem'}
                </TableCell>
                <TableCell align="left" sx={{ padding: '5px 10px' }}>
                    {data.NAME_RECEIVERS === '' ? 'Chưa giao' : data.NAME_RECEIVERS}
                </TableCell>
                <TableCell align="left" sx={{ padding: '5px 10px' }}>
                    {data.TOTAL_TIME}
                </TableCell>
                {/* {childData.length !== 0 && ( */}
                <TableCell sx={{ padding: '5px 10px' }}>
                    <IconButton aria-label="expand row" size="small" onClick={(event) => handleOpen(event, data.ID)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {/* )} */}
                <TableCell sx={{ padding: '5px 10px' }}>
                    <DetailDialog id={data.ID} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    {/* ChildTable */}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <TableContainer sx={{ maxHeight: 400 }}>
                            <Table stickyHeader aria-labelledby="tableTitle" size="small">
                                <ChildHeader
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={childData.length}
                                />
                                <TableBody>
                                    {stableSort(childData, getComparator(order, orderBy)).map((row, index) => {
                                        return (
                                            <ChildRow
                                                key={row.ID}
                                                data={row}
                                                isItemSelected={isSelected(row.ID)}
                                                labelId={`enhanced-table-checkbox-${index}`}
                                                onClick={(event) => handleClick(event, row.ID)}
                                            />
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Collapse>
                    {/* End childTable */}
                </TableCell>
            </TableRow>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
                }
            >
                <MenuItem onClick={handleClose}>Copy</MenuItem>
                <MenuItem onClick={handleClose}>Print</MenuItem>
                <MenuItem onClick={handleClose}>Highlight</MenuItem>
                <MenuItem onClick={handleClose}>Email</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

RowTaskTable.propTypes = {
    data: PropTypes.shape({
        ID: PropTypes.number.isRequired,
        NAME_WORKS: PropTypes.string.isRequired,
        NAME_USERS: PropTypes.string.isRequired,
        NAME_WORK_LEVELS: PropTypes.string.isRequired,
        BEGIN_DATE_AT: PropTypes.string.isRequired,
        END_DATE_AT: PropTypes.string.isRequired,
    }).isRequired,
};

export default RowTaskTable;
