import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import blue from "@material-ui/core/es/colors/blue";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import * as intl from "react-intl-universal";
import {fetchBookHistory} from "../../../../mock";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";

const isSearched = searchTerm => item =>
    item.id.indexOf(searchTerm) === 0 ||
    item.barcode.indexOf(searchTerm) === 0 ||
    item.isbn.indexOf(searchTerm) === 0 ||
    item.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.date.includes(searchTerm)

export default class BookHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            historyList: [],
            page: 0,
            rowsPerPage: 10,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleSearch = e => this.setState({searchTerm: e.target.value});

    async componentDidMount() {
        const historyList = await fetchBookHistory()
        this.setState({historyList})
    }

    render() {
        const { historyList, rowsPerPage, page } = this.state;
        let historyListToShow = []
        if (historyList) historyListToShow = historyList.filter(isSearched(this.state.searchTerm))
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, historyListToShow.length - page * rowsPerPage);

        return(
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div style={{width: '100%'}} className="flex-row">
                    <Nav loginUser={this.props.match.params.loginUser} whichFunction={"history"}/>
                    <div className="grow">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>{intl.get('form.barcode')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.librarianID')}</CustomTableCell>
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
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationFooter}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        // fontSize: 18,
    },
    body: {
        // fontSize: 16,
    },
}))(TableCell);