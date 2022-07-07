import * as React from 'react';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import { Box, Paper, MenuItem } from '@mui/material';
import { FormControl, Select, InputLabel, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSelector } from 'react-redux';
import HeaderTaskTable from './HeaderTaskTable';
import { getComparator, stableSort } from './sortTaskTable';
import RowTaskTable from './RowTaskTable';
import worksApi from '~/api/Works/worksApi';
import projectApi from '~/api/Projects/projectApi';
import AddWorkForm from '../AddWorkForm';
import { SUCCESS } from '~/components/CustomAlert/constants';
import CustomAlert from '~/components/CustomAlert';
import WorkLogsDialog from '../WorkLogs/WorkLogsDialog';
import ReadXLSX from '../ReadXLSX';
import * as XLSX from 'xlsx';

function TaskTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('STT');
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [refresh, setRefresh] = React.useState(false);
    const defaultData = React.useRef([]);

    const [task, setTask] = React.useState('all');
    const nameFilter = useSelector((state) => state.user.current.user.NAME_USERS);

    var date = new Date();

    var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);

    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 22, 59, 59);
    const [fromDate, setFromDate] = React.useState(firstDay);
    const [toDate, setToDate] = React.useState(lastDay);
    const [state, setState] = React.useState('all');
    const [projects, setProjects] = React.useState([]);
    const [project, setProject] = React.useState('-1');

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
                const res_project = await projectApi.getAll();
                setProjects(res_project.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchMyAPI();
    }, [refresh]);

    //Lọc
    React.useEffect(() => {
        let filterTemp1 = [],
            filterTemp2 = [],
            filterTemp3 = [];

        //Lọc trạng thái công việc và thời gian
        if (state === 'completed') {
            filterTemp1 = defaultData.current.filter(
                (e) =>
                    e.STATUS === 'Hoàn thành' &&
                    new Date(e.BEGIN_DATE_AT) >= fromDate &&
                    new Date(e.END_DATE_AT) <= toDate,
            );
        } else if (state === 'incomplete') {
            filterTemp1 = defaultData.current.filter(
                (e) =>
                    e.STATUS === 'Chưa hoàn thành' &&
                    new Date(e.BEGIN_DATE_AT) >= fromDate &&
                    new Date(e.END_DATE_AT) <= toDate,
            );
        } else {
            filterTemp1 = defaultData.current.filter(
                (e) => new Date(e.BEGIN_DATE_AT) >= fromDate && new Date(e.END_DATE_AT) <= toDate,
            );
        }

        //Lọc theo người tạo hoặc người nhận
        if (task === 'created') {
            filterTemp2 = filterTemp1.filter((e) => e.NAME_USERS === nameFilter);
        } else if (task === 'received') {
            filterTemp2 = filterTemp1.filter((e) => e.NAME_RECEIVERS.includes(nameFilter));
        } else {
            filterTemp2 = filterTemp1;
        }

        if (project === '-1') {
            filterTemp3 = filterTemp2;
        } else {
            let nameProject = projects.find((i) => i.ID === project).NAME_PROJECT;
            filterTemp3 = filterTemp2.filter((e) => e.NAME_PROJECT === nameProject);
        }
        //Set data cho bảng
        setData(filterTemp3);
    }, [task, fromDate, nameFilter, state, toDate, project, projects]);

    const handleFromDate = (newDate) => {
        setFromDate(newDate);
    };
    const handleToDate = (newDate) => {
        setToDate(newDate);
    };

    const handleSelectTask = (event) => {
        setTask(event.target.value);
    };
    const handleSelectState = (event) => {
        setState(event.target.value);
    };
    const handleSelectProject = (event) => {
        setProject(event.target.value);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //Xuất file excel
    const handleExportXLSX = () => {
        //Chỉnh sửa lại tên file (thực hiện sau)
        const filename = 'reports.xlsx';

        const exportData = data.map((element, index) => {
            return {
                STT: index + 1,
                'Tên công việc': element.NAME_WORKS,
                'Tên dự án': element.NAME_PROJECT,
                'Người tạo': element.NAME_USERS,
                'Loại công việc': element.NAME_WORK_LEVELS,
                'Nội dung': element.NOTE,
                'Mục tiêu': element.WORK_GOALS,
                'Bắt đầu': new Date(element.BEGIN_DATE_AT),
                'Kết thúc': new Date(element.END_DATE_AT),
                'Trạng thái': element.STATUS,
                'Người nhận': element.NAME_RECEIVERS,
                'Tổng thời gian thực hiện': element.TOTAL_TIME,
            };
        });

        var ws = XLSX.utils.json_to_sheet(exportData, { dateNF: 'dd/MM/yyyy' });
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh sách công việc');
        XLSX.writeFile(wb, filename);
    };

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
                <Button
                    variant="outlined"
                    sx={{ ml: '5px', mr: '5px' }}
                    startIcon={<RefreshIcon />}
                    onClick={(e) => setRefresh(!refresh)}
                >
                    Làm mới
                </Button>

                <AddWorkForm setNotify={setNotify} setRefresh={setRefresh} refresh={refresh} sx={{ padding: '10px' }} />
                <FormControl sx={{ minWidth: 150, ml: '5px' }} size="small">
                    <InputLabel id="select-task">Hiển thị</InputLabel>
                    <Select
                        labelId="select-task"
                        id="select-task"
                        value={task}
                        label="Hiển thị"
                        autoWidth
                        onChange={handleSelectTask}
                    >
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value="created">Đã tạo</MenuItem>
                        <MenuItem value="received">Đã nhận</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150, ml: '5px' }} size="small">
                    <InputLabel id="select-state">Trạng thái</InputLabel>
                    <Select
                        labelId="select-state"
                        id="select-state"
                        value={state}
                        label="Trạng thái"
                        autoWidth
                        onChange={handleSelectState}
                    >
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value="completed">Hoàn thành</MenuItem>
                        <MenuItem value="incomplete">Chưa hoàn thành</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150, ml: '5px' }} size="small">
                    <InputLabel id="select-project">Dự án</InputLabel>
                    <Select
                        labelId="select-project"
                        id="select-project"
                        value={project}
                        label="Dự án"
                        autoWidth
                        onChange={handleSelectProject}
                    >
                        <MenuItem value="-1">Tất cả</MenuItem>
                        {projects.map((item, index) => (
                            <MenuItem key={index} value={item.ID}>
                                {item.NAME_PROJECT}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <FormControl sx={{ width: 150, ml: '5px' }} size="small">
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
                    <FormControl sx={{ width: 150, ml: '5px' }} size="small">
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
                <WorkLogsDialog setNotify={setNotify} setRefresh={setRefresh} refresh={refresh} />
                <ReadXLSX />
                <Button
                    variant="outlined"
                    sx={{ ml: '5px', mr: '5px' }}
                    startIcon={<GetAppIcon />}
                    onClick={handleExportXLSX}
                >
                    Xuất Excel
                </Button>
            </Paper>
            <Paper sx={{ width: '100%', mb: 2, boxShadow: ' rgb(183 183 183) 0px 1px 10px' }}>
                <TableContainer sx={{ maxHeight: 485 }}>
                    <Table stickyHeader aria-labelledby="tableTitle" size="small">
                        <HeaderTaskTable
                            order={order}
                            orderBy={orderBy}
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
                                            labelId={`enhanced-table-checkbox-${index}`}
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
