import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import worksApi from '~/api/Works/worksApi';
import DetailDialog from '~/pages/Dashboard/components/DetailDialog';
import ChildHeader from '../TaskTableChild/ChildHeader';
import ChangeStatus from '../../ChangeStatus';
import { getComparator, stableSort } from '../sortTaskTable';
import { convert } from '~/pages/Dashboard/components/share';

function ChildRow(props) {
    const data = props.data;
    const [open, setOpen] = React.useState(false);
    const [childData, setChildData] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('STT');
    const [selected, setSelected] = React.useState([]);

    const handleOpen = async (event, id) => {
        event.preventDefault();
        setOpen(!open);
        const data_req = {
            WORK_ID: id,
        };
        if (open === false) {
            const res = await worksApi.getChild(data_req);
            // console.log(res);
            setChildData(res.data);
        } else {
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
    if (data.length <= 0) {
        return <React.Fragment></React.Fragment>;
    } else
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
                >
                    <TableCell component="th" id={props.labelId} scope="row" sx={{ padding: '5px' }} align="right">
                        {data.STT}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.NAME_WORKS}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.NAME_PROJECT}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.NAME_USERS}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.NAME_WORK_LEVELS}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.NOTE}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.WORK_GOALS}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {convert(data.BEGIN_DATE_AT)}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {convert(data.END_DATE_AT)}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.STATUS}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.NAME_RECEIVERS === '' ? 'Chưa giao' : data.NAME_RECEIVERS}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '5px' }}>
                        {data.TOTAL_TIME}
                    </TableCell>
                    <TableCell sx={{ padding: '0px' }}>
                        <ChangeStatus
                            miniButton={true}
                            data={{
                                ID: data.ID,
                                STATUS: data.STATUS,
                                USER_ID: data.USER_ID,
                            }}
                            table="work"
                        />
                    </TableCell>
                    <TableCell sx={{ padding: '0px' }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={(event) => handleOpen(event, data.ID)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell sx={{ padding: '0px' }}>
                        <DetailDialog
                            data={{
                                id: data.ID,
                                END_DATE_AT: data.END_DATE_AT,
                            }}
                        />
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
                                            row.STT = index + 1;
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
            </React.Fragment>
        );
}

ChildRow.propTypes = {
    data: PropTypes.shape({
        ID: PropTypes.number.isRequired,
        NAME_WORKS: PropTypes.string.isRequired,
        NAME_USERS: PropTypes.string.isRequired,
        NAME_WORK_LEVELS: PropTypes.string.isRequired,
        BEGIN_DATE_AT: PropTypes.string.isRequired,
        END_DATE_AT: PropTypes.string.isRequired,
    }).isRequired,
};

export default ChildRow;
