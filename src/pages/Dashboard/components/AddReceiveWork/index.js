import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import HeaderTable from './HeaderTable';

function AddReceiveWork(props) {
    const data = props.data.users;
    const types = props.data.types;
    const note = props.data.note;
    const beginDate = props.data.beginDate;
    const endDate = props.data.endDate;
    const project = props.data.project;
    const goal = props.data.goal;
    const header = HeaderTable(types);

    data.forEach((element) => {
        element.WORK_TYPE_ID = 1;
        element.COMMENT_WORK_RECEIVE = note;
        element.BEGIN_DATE_AT = beginDate;
        element.END_DATE_AT = endDate;
        element.PROJECT_ID = project;
        element.WORK_RECEIVE_GOALS = goal;
    });

    const handleRowEditCommit = (params, e) => {
        data.forEach((r) => {
            if (r.ID === params.id) {
                r[params.field] = params.value;
            }
        });
    };

    const handleSelected = (ids) => {
        const selectedIDs = new Set(ids);
        const selectedRowData = data.filter((row) => selectedIDs.has(row.ID));
        props.onSelected(selectedRowData);
    };

    return (
        <DataGrid
            sx={{ width: '97%' }}
            rows={data}
            columns={header}
            pageSize={8}
            rowsPerPageOptions={[8]}
            getRowId={(row) => row.ID}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => handleSelected(ids)}
            rowHeight={30}
            onCellEditCommit={handleRowEditCommit}
        />
    );
}

export default AddReceiveWork;
