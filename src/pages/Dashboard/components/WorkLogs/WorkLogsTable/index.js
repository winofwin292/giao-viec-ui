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
            { field: 'TITLE', headerName: 'Tên', width: 230, editable: true },
            { field: 'CONTENT', headerName: 'Nội dung', width: 500, editable: true },
            { field: 'BEGIN_DATE_AT', headerName: 'Bắt đầu', width: 180, editable: true, type: 'dateTime' },
            { field: 'END_DATE_AT', headerName: 'Kết thúc', width: 180, editable: true, type: 'dateTime' },
            { field: 'TIME_WORK_LOGS', headerName: 'Thời gian', width: 100, editable: true, type: 'number' },
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
        [deleteRows, duplicateUser],
    );

    return (
        <DataGrid
            rows={props.data.logs}
            columns={columns}
            pageSize={12}
            rowsPerPageOptions={[12]}
            getRowId={(row) => row.STT}
            rowHeight={30}
            onCellEditCommit={handleRowEditCommit}
        />
    );
}

export default WorkLogsTable;
