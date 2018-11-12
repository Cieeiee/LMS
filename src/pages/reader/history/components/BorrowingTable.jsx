import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {withStyles} from "@material-ui/core";
import blue from "@material-ui/core/es/colors/blue";
import TableCell from "@material-ui/core/TableCell/TableCell";
import NoContent from "./NoContent";
import * as intl from "react-intl-universal";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";

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

function BorrowingTable(props) {
    const { classes } = props;

    return (
        <Grid item xs={12}>
            { props.records == false ? <NoContent/> :
            <Table>
                <TableHead className={classes.head}>
                    <TableRow>
                        <CustomTableCell>{intl.get("form.title")}</CustomTableCell>
                        <CustomTableCell>{intl.get("form.barcode")}</CustomTableCell>
                        <CustomTableCell>{intl.get("form.borrowTime")}</CustomTableCell>
                        <CustomTableCell numeric>{intl.get("form.fine")}</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.records && props.records.map(book => {
                        return (
                            <TableRow className={classes.row}>
                                <CustomTableCell component="th" scope="row">
                                    {book.title}
                                </CustomTableCell>
                                <CustomTableCell>{book.barcode}</CustomTableCell>
                                <CustomTableCell>{book.borrowTime}</CustomTableCell>
                                <CustomTableCell numeric>{book.fine}</CustomTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <CustomTableCell>{intl.get("form.totalFine")}</CustomTableCell>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric>{props.total}</CustomTableCell>
                    </TableRow>
                </TableFooter>
            </Table>}
        </Grid>
    );
};

const BorrowingTableWrapped = withStyles(styles)(BorrowingTable);
export default BorrowingTableWrapped