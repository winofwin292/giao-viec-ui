function HeaderTable(workTypes) {
    const newTypes = [];

    workTypes.forEach((element) => {
        const newElement = {};
        newElement.value = element.ID;
        newElement.label = element.NAME_WORK_TYPES;
        newTypes.push(newElement);
    });

    const headerName = [
        { field: 'ID', headerName: 'ID', width: 70 },
        { field: 'NAME_USERS', headerName: 'Tên', width: 200 },
        {
            field: 'WORK_TYPE_ID',
            headerName: 'Loại công việc',
            width: 180,
            editable: true,
            type: 'singleSelect',
            valueOptions: newTypes,
            valueFormatter: ({ id, value, field, api }) => {
                const colDef = api.getColumn(field);
                const option = colDef.valueOptions.find(({ value: optionValue }) => value === optionValue);

                return option.label;
            },
        },
        { field: 'COMMENT_WORK_RECEIVE', headerName: 'Nội dung', width: 470, editable: true },
        { field: 'BEGIN_DATE_AT', headerName: 'Ngày bắt đầu', width: 150, editable: true, type: 'date' },
        { field: 'END_DATE_AT', headerName: 'Ngày kết thúc', width: 150, editable: true, type: 'date' },
    ];
    return headerName;
}

export default HeaderTable;
