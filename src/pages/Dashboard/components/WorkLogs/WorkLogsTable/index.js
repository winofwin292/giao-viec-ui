import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function WorkLogsTable(props) {
    //Sự kiện chỉnh sửa 1 ô dữ liệu
    const handleRowEditCommit = (params, e) => {
        props.data.logs.forEach((r) => {
            if (r.STT === params.id) {
                r[params.field] = params.value;
            }
        });
    };

    //Sự kiện xóa dòng
    const deleteRows = React.useCallback(
        (id) => () => {
            props.func.setData((prevRows) => prevRows.filter((row) => row.STT !== id));
        },
        [props.func],
    );

    //Tạo ra dòng mới giống dòng đã chọn
    const duplicateUser = React.useCallback(
        (id) => () => {
            props.func.setData((prevRows) => {
                const newRows = prevRows.find((row) => row.STT === id);
                return [...prevRows, { ...newRows, STT: prevRows.length + 1 }];
            });
        },
        [props.func],
    );

    //header của các cột, dùng useMemo để không render lại
    const columns = React.useMemo(
        () => [
            // { field: 'STT', headerName: 'STT', width: 70 },
            { field: 'NAME_PROJECT', headerName: 'Tên dự án', width: 130 },
            { field: 'NAME_WORKS', headerName: 'Tên công việc', width: 200 },
            { field: 'NAME_USERS', headerName: 'Người giao', width: 150 },
            { field: 'TITLE', headerName: 'Tên', width: 170, editable: true },
            { field: 'CONTENT', headerName: 'Nội dung', width: 350, editable: true },
            { field: 'BEGIN_DATE_AT', headerName: 'Bắt đầu', width: 150, editable: true, type: 'dateTime' },
            { field: 'END_DATE_AT', headerName: 'Kết thúc', width: 150, editable: true, type: 'dateTime' },
            { field: 'TIME_WORK_LOGS', headerName: 'Thời gian', width: 80, editable: true, type: 'number' },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Công cụ',
                width: 120,
                getActions: (params) => [
                    <GridActionsCellItem icon={<DeleteIcon />} label="Xóa" onClick={deleteRows(params.id)} />,
                    <GridActionsCellItem
                        icon={<FileCopyIcon />}
                        label="Nhân đôi dòng"
                        onClick={duplicateUser(params.id)}
                        showInMenu
                    />,
                ],
            },
        ],
        //2 hàm sự kiện
        [deleteRows, duplicateUser],
    );

    return (
        <DataGrid
            rows={props.data.logs}
            columns={columns}
            pageSize={12}
            rowsPerPageOptions={[12]}
            getRowId={(row) => row.STT}
            isCellEditable={(params) => params.row.ID === null}
            rowHeight={30}
            initialState={{
                sorting: {
                    sortModel: [{ field: 'BEGIN_DATE_AT', sort: 'desc' }],
                },
            }}
            onCellEditCommit={handleRowEditCommit}
        />
    );
}

export default WorkLogsTable;
