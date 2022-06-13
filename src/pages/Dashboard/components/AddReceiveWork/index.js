import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'USER_ID', headerName: 'ID', width: 100 },
    { field: 'NAME_USER', headerName: 'Tên', width: 250 },
    { field: 'WORK_TYPE_NAME', headerName: 'Loại công việc', width: 180 },
    { field: 'WORK_EVALUTE_NAME', headerName: 'Mức độ đánh giá', width: 180 },
    { field: 'COMMENT', headerName: 'Nội dung', width: 300 },
    { field: 'BEGIN_DATE_AT', headerName: 'Ngày bắt đầu', width: 170 },
    { field: 'END_DATE_AT', headerName: 'Ngày kết thúc', width: 170 },
];

function AddReceiveWork(props) {
    return (
        <DataGrid
            sx={{ width: '97%' }}
            rows={props.dataTable}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[4]}
            getRowId={(row) => row.USER_ID}
            checkboxSelection
        />
    );
}

export default AddReceiveWork;
