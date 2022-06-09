import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'USER_ID', headerName: 'ID', width: 70 },
    { field: 'NAME_USER', headerName: 'Tên', width: 130 },
    { field: 'WORK_TYPE_NAME', headerName: 'Loại công việc', width: 130 },
    { field: 'WORK_EVALUTE_NAME', headerName: 'Mức độ đánh giá', width: 130 },
    { field: 'COMMENT', headerName: 'Nội dung', width: 130 },
    { field: 'BEGIN_DATE_AT', headerName: 'Ngày bắt đầu', width: 130 },
    { field: 'END_DATE_AT', headerName: 'Ngày kết thúc', width: 130 },
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
