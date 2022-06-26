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
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            console.log(data);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div style={{ marginLeft: '5px' }}>
            <label htmlFor="contained-button-file">
                <Input
                    // accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onChange}
                />
                <Button variant="outlined" component="span" sx={{ height: '40px' }}>
                    Upload
                </Button>
            </label>
        </div>
    );
}

export default ReadXLSX;
