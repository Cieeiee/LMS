import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";
import * as intl from "react-intl-universal";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../../mock/tablePaginationFooter";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {SearchOutlined} from "@material-ui/icons";
import blue from "@material-ui/core/es/colors/blue";

const isSearched = searchTerm => item =>
    item.id.indexOf(searchTerm) === 0 ||
    item.barcode.indexOf(searchTerm) === 0 ||
    item.isbn.indexOf(searchTerm) === 0 ||
    item.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.date.includes(searchTerm)

export default class HistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            page: 0,
            rowsPerPage: 5,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleSearch = e => this.setState({searchTerm: e.target.value});

    render() {
        const { rowsPerPage, page } = this.state;
        const { historyList } = this.props;
        let historyListToShow = []
        if (historyList) historyListToShow = historyList.filter(isSearched(this.state.searchTerm))
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, historyListToShow.length - page * rowsPerPage);

        return (
            <div style={{margin: "20px 20px 20px 20px"}}>
                <div className="flex-row" style={{margin: "0 0 10px 0"}}>
                    <Typography style={{fontSize: 40}}>
                        {this.props.title}
                    </Typography>
                    <div className="grow"/>
                    <TextField
                        style={{margin: "auto 0 5px auto"}}
                        placeholder={intl.get('basic.Search')}
                        value={this.state.searchTerm}
                        onChange={this.handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>{intl.get('form.barcode')}</CustomTableCell>
                                <CustomTableCell numeric>{this.props.account}</CustomTableCell>
                                <CustomTableCell numeric>ISBN</CustomTableCell>
                                <CustomTableCell numeric>{intl.get('form.title')}</CustomTableCell>
                                <CustomTableCell numeric>{intl.get('form.date')}</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historyListToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) =>
                                    <TableRow key={index} className="table-row">
                                        <TableCell>{item.barcode}</TableCell>
                                        <TableCell numeric>{item.id}</TableCell>
                                        <TableCell numeric>{item.isbn}</TableCell>
                                        <TableCell numeric>{item.title}</TableCell>
                                        <TableCell numeric>{item.date}</TableCell>
                                    </TableRow>
                                )}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={5}
                                    count={historyListToShow.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    rowsPerPageOptions={[5]}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationFooter}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </div>
        );
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        fontSize: 14,
        textTransform: 'capitalize',
    },
    body: {
        // fontSize: 16,
    },
}))(TableCell);