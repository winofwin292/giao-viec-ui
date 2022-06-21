import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSelector } from 'react-redux';
import HeaderTaskTable from './HeaderTaskTable';
import { getComparator, stableSort } from './sortTaskTable';
import ToolbarTaskTable from './ToolbarTaskTable';
import RowTaskTable from './RowTaskTable';
import worksApi from '~/api/Works/worksApi';
import AddWorkForm from '../AddWorkForm';
import { SUCCESS } from '~/components/CustomAlert/constants';
import CustomAlert from '~/components/CustomAlert';
import WorkLogsDialog from '../WorkLogs/WorkLogsDialog';

function TaskTable() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('STT');
    const [selected, setSelected] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filterState, setFilterState] = React.useState('all');
    const [fromDate, setFromDate] = React.useState(firstDay);
    const [toDate, setToDate] = React.useState(lastDay);
    const [refresh, setRefresh] = React.useState(false);
    const defaultData = React.useRef([]);
    const nameFilter = useSelector((state) => state.user.current.user.NAME_USERS);
    const [notify, setNotify] = React.useState({
        open: false,
        type: SUCCESS,
        msg: '',
    });

    React.useEffect(() => {
        async function fetchMyAPI() {
            try {
                let response = await worksApi.getAll();
                var i = 1;
                response.data.forEach((item) => {
                    item.STT = i;
                    i++;
                });
                defaultData.current = response.data.map((element) => element);
                setData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchMyAPI();
    }, [refresh]);

    React.useEffect(() => {
        switch (filterState) {
            case 'created':
                const filtered = defaultData.current.filter(
                    (element) =>
                        element.NAME_USERS === nameFilter &&
                        new Date(element.BEGIN_DATE_AT) >= fromDate &&
                        new Date(element.END_DATE_AT) <= toDate,
                );
                setData(filtered);
                break;
            case 'received':
                const filtered1 = defaultData.current.filter(
                    (element) =>
                        element.NAME_RECEIVERS.includes(nameFilter) &&
                        new Date(element.BEGIN_DATE_AT) >= fromDate &&
                        new Date(element.END_DATE_AT) <= toDate,
                );
                setData(filtered1);
                break;
            default:
                const filtered2 = defaultData.current.filter(
                    (element) => new Date(element.BEGIN_DATE_AT) >= fromDate && new Date(element.END_DATE_AT) <= toDate,
                );
                setData(filtered2);
                break;
        }
    }, [filterState, fromDate, nameFilter, toDate]);

    const handleFromDate = (newDate) => {
        setFromDate(newDate);
    };
    const handleToDate = (newDate) => {
        setToDate(newDate);
    };

    const handleSelect = (event) => {
        setFilterState(event.target.value);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.ID);
            setSelected(newSelected);
            //làm gì đó khi chọn tất cả
            return;
        }
        setSelected([]);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper
                sx={{
                    marginBottom: '10px',
                    width: '100%',
                    mb: 2,
                    p: 1,
                    boxShadow: ' rgb(183 183 183) 0px 1px 10px',
                    display: 'flex',
                }}
            >
                <AddWorkForm setNotify={setNotify} setRefresh={setRefresh} refresh={refresh} sx={{ padding: '10px' }} />
                <FormControl sx={{ minWidth: 150, ml: '5px', height: '36.5px' }} size="small">
                    <InputLabel id="demo-select-small">Hiển thị</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={filterState}
                        label="Hiển thị"
                        autoWidth
                        onChange={handleSelect}
                    >
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value="created">Đã tạo</MenuItem>
                        <MenuItem value="received">Đã nhận</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <FormControl sx={{ minWidth: 150, ml: '5px', height: '36.5px' }} size="small">
                        <DesktopDatePicker
                            label="Từ ngày"
                            value={fromDate}
                            // minDate={beginDate}
                            maxDate={toDate}
                            onChange={handleFromDate}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField size="small" {...params} />}
                            disableMaskedInput
                        />
                    </FormControl>
                    <FormControl sx={{ minWidth: 150, ml: '5px', height: '36.5px' }} size="small">
                        <DesktopDatePicker
                            label="Đến ngày"
                            value={toDate}
                            minDate={fromDate}
                            // maxDate={toDate}
                            onChange={handleToDate}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField size="small" {...params} />}
                            disableMaskedInput
                        />
                    </FormControl>
                </LocalizationProvider>
                <WorkLogsDialog />
            </Paper>
            <Paper sx={{ width: '100%', mb: 2, boxShadow: ' rgb(183 183 183) 0px 1px 10px' }}>
                <ToolbarTaskTable numSelected={selected.length} />
                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader aria-labelledby="tableTitle" size="small">
                        <HeaderTaskTable
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <RowTaskTable
                                            setRefresh={setRefresh}
                                            refresh={refresh}
                                            setNotify={setNotify}
                                            key={row.ID}
                                            data={row}
                                            isItemSelected={isSelected(row.ID)}
                                            labelId={`enhanced-table-checkbox-${index}`}
                                            onClick={(event) => handleClick(event, row.ID)}
                                        />
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 33 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <CustomAlert data={notify} onClose={setNotify} />
        </Box>
    );
}

export default TaskTable;
