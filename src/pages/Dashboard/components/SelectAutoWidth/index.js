import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth(props) {
    const handleChange = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <FormControl sx={{ m: 2, minWidth: 90, width: '90%' }}>
            <InputLabel id="levels-label">{props.label}</InputLabel>
            <Select
                labelId="levels-label"
                id="levels"
                value={props.selected}
                onChange={handleChange}
                autoWidth
                label={props.label}
                size="small"
                disabled={props.disabled ? true : false}
            >
                <MenuItem value="">
                    <em>{props.label}</em>
                </MenuItem>
                {props.data.map((item) => (
                    <MenuItem key={item.ID} value={item.ID}>
                        {item[props.contentKey]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
