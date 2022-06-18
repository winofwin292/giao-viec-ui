import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import HeaderTable from './HeaderTable';

function AddReceiveWork(props) {
    const data = props.data.users;
    const types = props.data.types;
    const note = props.data.note;
    const beginDate = props.data.beginDate;
    const endDate = props.data.endDate;
    const header = HeaderTable(types);

    data.forEach((element) => {
        element.WORK_TYPE_NAME = 1;
        element.COMMENT_WORK_RECEIVE = note;
        element.BEGIN_DATE_AT = beginDate;
        element.END_DATE_AT = endDate;
    });

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
            experimentalFeatures={{ newEditingApi: true }}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => handleSelected(ids)}
            rowHeight={30}
        />
    );
}

export default AddReceiveWork;
