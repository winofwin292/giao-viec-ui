import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

const Input = styled('input')({
    display: 'none',
});

function ReadXLSX(props) {
    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });

            const workLevelObj = [];
            const workLevelName = wb.SheetNames[1];
            const workLevelSheet = wb.Sheets[workLevelName];
            const workLevel = XLSX.utils.sheet_to_json(workLevelSheet, { header: 1 });
            for (let i = 1; i < workLevel.length; i++) {
                let newObj = {};
                newObj.ID = workLevel[i][0];
                newObj.NAME_WORK_LEVELS = workLevel[i][1];
                workLevelObj.push(newObj);
            }

            const workProjectObj = [];
            const workProjectName = wb.SheetNames[2];
            const workProjectSheet = wb.Sheets[workProjectName];
            const workProject = XLSX.utils.sheet_to_json(workProjectSheet, { header: 1 });
            for (let i = 1; i < workProject.length; i++) {
                let newObj = {};
                newObj.ID = workProject[i][0];
                newObj.NAME_PROJECT = workProject[i][1];
                workProjectObj.push(newObj);
            }

            const workDataObj = [];
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            for (let i = 1; i < data.length; i++) {
                let level = workLevelObj.find((e) => e.NAME_WORK_LEVELS === data[i][3]);
                let project = workProjectObj.find((e) => e.NAME_PROJECT === data[i][2]);
                console.log(data[i][7]);
                let newObj = {};

                newObj.USER_ID = 1;
                newObj.WORK_LEVEL_ID = level.ID;
                newObj.NAME_WORKS = data[i][1];
                newObj.NOTE = data[i][4];
                newObj.BEGIN_DATE_AT = new Date(data[i][6]);
                newObj.END_DATE_AT = new Date(data[i][7]);
                newObj.CREATED_AT = new Date();
                newObj.UPDATED_AT = new Date();
                newObj.WORK_RECEIVE_ID = '';
                newObj.WORK_ID = '';
                newObj.PROJECT_ID = project.ID;
                newObj.WORK_GOALS = data[i][5];
                newObj.WORK_RECEIVES = {};

                workDataObj.push(newObj);
            }

            console.log(workDataObj);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div style={{ marginLeft: '5px' }}>
            <label htmlFor="contained-button-file">
                <Input
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onChange}
                    onClick={(event) => {
                        event.target.value = null;
                    }}
                />
                <Button variant="outlined" component="span" sx={{ height: '40px' }}>
                    Upload
                </Button>
            </label>
        </div>
    );
}

export default ReadXLSX;
