import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'ID', headerName: 'ID', width: 100 },
    { field: 'NAME_USERS', headerName: 'Tên', width: 250 },
    {
        field: 'WORK_TYPE_NAME',
        headerName: 'Loại công việc',
        width: 180,
        editable: true,
        type: 'singleSelect',
        valueOptions: [
            {
                value: 1,
                label: 'Chính',
            },
            {
                value: 2,
                label: 'Phối hợp',
            },
            {
                value: 3,
                label: 'Giám sát',
            },
        ],
    },
    { field: 'COMMENT_WORK_RECEIVE', headerName: 'Nội dung', width: 470, editable: true },
    { field: 'BEGIN_DATE_AT', headerName: 'Ngày bắt đầu', width: 170, editable: true, type: 'date' },
    { field: 'END_DATE_AT', headerName: 'Ngày kết thúc', width: 170, editable: true, type: 'date' },
];

function AddReceiveWork(props) {
    return (
        <DataGrid
            sx={{ width: '97%' }}
            rows={props.dataTable}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            getRowId={(row) => row.ID}
            experimentalFeatures={{ newEditingApi: true }}
            checkboxSelection
        />
    );
}

export default AddReceiveWork;
