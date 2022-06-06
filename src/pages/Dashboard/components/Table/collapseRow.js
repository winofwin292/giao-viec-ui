import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import worksApi from '~/api/Works/worksApi';

function CollapseRow(props) {
    const data = props.data;
    const [open, setOpen] = React.useState(false);
    const [contextMenu, setContextMenu] = React.useState(null);
    const [childData, setChildData] = React.useState([]);

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
        const data_req = {
            ID: id,
        };
        if (open === false) {
            const res = await worksApi.getById(data_req);
            setChildData(res);
        } else {
            setChildData([]);
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
                    {props.index + 1}
                </TableCell>
                <TableCell align="left">{data.TEN_CV}</TableCell>
                <TableCell align="left">{data.TEN_NGUOI_TAO}</TableCell>
                <TableCell align="left">{data.LOAI_CV}</TableCell>
                <TableCell align="left">{convert(data.TG_TAO)}</TableCell>
                <TableCell align="left">{convert(data.TG_HET_HAN)}</TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={(event) => handleOpen(event, data.ID)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/* Table child */}
                            <Table size="small" aria-label="purchases">
                                {/* <EnhancedTableHead /> */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tên người nhận</TableCell>
                                        <TableCell align="right">Kiểu công việc</TableCell>
                                        <TableCell align="right">Nội dung</TableCell>
                                        <TableCell align="right">TOTAL_TIME</TableCell>
                                        <TableCell align="right">TOTAL_TIME_CHECK</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {childData.map((childRow, index) => (
                                        <TableRow key={childRow.ID}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{childRow.TEN_NGUOI_NHAN}</TableCell>
                                            <TableCell align="right">{childRow.NAME_WORK_TYPES}</TableCell>
                                            <TableCell align="right">{childRow.COMMENT_WORK_RECEIVE}</TableCell>
                                            <TableCell align="right">{childRow.TOTAL_TIME}</TableCell>
                                            <TableCell align="right">{childRow.TOTAL_TIME_CHECK}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* End table child */}
                        </Box>
                    </Collapse>
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
