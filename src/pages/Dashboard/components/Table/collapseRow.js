import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import worksApi from '~/api/Works/worksApi';
import DetailDialog from '../DetailDialog';

function CollapseRow(props) {
    const data = props.data;
    const [open, setOpen] = React.useState(false);
    const [contextMenu, setContextMenu] = React.useState(null);

    function convert(str) {
        var date = new Date(str),
            mnth = ('0' + (date.getMonth() + 1)).slice(-2),
            day = ('0' + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join('/');
    }

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX + 2,
                      mouseY: event.clientY - 6,
                  }
                : null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleOpen = async (event, id) => {
        event.preventDefault();
        setOpen(!open);
        if (open === false) {
            // const res = await worksApi.getById(data_req);
            // setChildData(res);
        } else {
            // setChildData([]);
        }
    };

    return (
        <React.Fragment>
            <TableRow
                hover
                role="checkbox"
                aria-checked={props.isItemSelected}
                tabIndex={-1}
                key={data.ID}
                selected={props.isItemSelected}
                sx={{ '& > *': { borderBottom: 'unset' } }}
                // onClick={(event) => handleOpen(event)}
                onContextMenu={handleContextMenu}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        checked={props.isItemSelected}
                        onClick={props.onClick}
                        inputProps={{
                            'aria-labelledby': props.labelId,
                        }}
                    />
                </TableCell>
                <TableCell component="th" id={props.labelId} scope="row" padding="none" align="right">
                    {data.ID}
                </TableCell>
                <TableCell align="left">{data.TEN_CV}</TableCell>
                <TableCell align="left">{data.TEN_NGUOI_TAO}</TableCell>
                <TableCell align="left">{data.LOAI_CV}</TableCell>
                <TableCell align="left">{convert(data.TG_TAO)}</TableCell>
                <TableCell align="left">{convert(data.TG_HET_HAN)}</TableCell>
                <TableCell align="left">{data.IS_SEEN === 1 ? 'Đã xem' : 'Chưa xem'}</TableCell>
                <TableCell align="left">{data.TEN_NGUOI_NHAN === '' ? 'Chưa giao' : data.TEN_NGUOI_NHAN}</TableCell>
                <TableCell align="left">{data.TOTAL_TIME}</TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={(event) => handleOpen(event, data.ID)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <DetailDialog id={data.ID} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
                </TableCell>
            </TableRow>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
                }
            >
                <MenuItem onClick={handleClose}>Copy</MenuItem>
                <MenuItem onClick={handleClose}>Print</MenuItem>
                <MenuItem onClick={handleClose}>Highlight</MenuItem>
                <MenuItem onClick={handleClose}>Email</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

CollapseRow.propTypes = {
    data: PropTypes.shape({
        ID: PropTypes.number.isRequired,
        TEN_CV: PropTypes.string.isRequired,
        TEN_NGUOI_TAO: PropTypes.string.isRequired,
        LOAI_CV: PropTypes.string.isRequired,
        TG_TAO: PropTypes.string.isRequired,
        TG_HET_HAN: PropTypes.string.isRequired,
    }).isRequired,
};

export default CollapseRow;
