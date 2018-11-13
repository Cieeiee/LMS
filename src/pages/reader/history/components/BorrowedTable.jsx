import {withStyles} from "@material-ui/core";
import blue from "@material-ui/core/es/colors/blue";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import React from "react";
import NoContent from "./NoContent";
import * as intl from "react-intl-universal";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
    footer: {
        backgroundColor: blue[50],
        color: theme.palette.common.black,
        fontSize: 16,
    }
}))(TableCell);

class BorrowedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        const { classes, records } = this.props;
        const { rowsPerPage, page } = this.state;
        let recordsToShow = []
        if (records) recordsToShow = records
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, recordsToShow.length - page * rowsPerPage);

        return (
            <Grid item xs={12}>
                { this.props.records == false ? <NoContent/> :
                    <Table>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>{intl.get("form.title")}</CustomTableCell>
                                <CustomTableCell>{intl.get("form.barcode")}</CustomTableCell>
                                <CustomTableCell>{intl.get("form.borrowTime")}</CustomTableCell>
                                <CustomTableCell>{intl.get("form.returnTime")}</CustomTableCell>
                                <CustomTableCell>{intl.get("form.description")}</CustomTableCell>
                                <CustomTableCell numeric>{intl.get("form.fine")}</CustomTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recordsToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(book => {
                                return (
                                    <TableRow key={book.borrowTime} className={classes.row}>
                                        <CustomTableCell component="th" scope="row">
                                            {book.title}
                                        </CustomTableCell>
                                        <CustomTableCell>{book.barcode}</CustomTableCell>
                                        <CustomTableCell>{book.borrowTime}</CustomTableCell>
                                        <CustomTableCell>{book.returnTime}</CustomTableCell>
                                        <CustomTableCell>
                                            {book.state === 3 ? intl.get('basic.lost') : intl.get('basic.normal')}
                                        </CustomTableCell>
                                        <CustomTableCell numeric>{book.fine}</CustomTableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={6}
                                    count={recordsToShow.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationFooter}
                                />
                            </TableRow>
                        </TableFooter>
                        {/*{this.props.total !== undefined && <TableFooter>*/}
                            {/*<TableRow>*/}
                                {/*<CustomTableCell>{intl.get("form.totalFine")}</CustomTableCell>*/}
                                {/*<CustomTableCell numeric/>*/}
                                {/*<CustomTableCell numeric/>*/}
                                {/*<CustomTableCell numeric/>*/}
                                {/*<CustomTableCell numeric/>*/}
                                {/*<CustomTableCell numeric>{this.props.total}</CustomTableCell>*/}
                            {/*</TableRow>*/}
                        {/*</TableFooter>}*/}
                    </Table>}
            </Grid>
        );
    }
};

const BorrowedTableWrapped = withStyles(styles)(BorrowedTable);
export default BorrowedTableWrapped;