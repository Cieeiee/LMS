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

function BorrowedTable(props) {
    const { classes } = props;

    return (
        <Grid item xs={12}>
            { props.records == false ? <NoContent/> :
            <Table>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>{intl.get("form.title")}</CustomTableCell>
                        <CustomTableCell numeric>{intl.get("form.barcode")}</CustomTableCell>
                        <CustomTableCell numeric>{intl.get("form.borrowTime")}</CustomTableCell>
                        <CustomTableCell numeric>{intl.get("form.returnTime")}</CustomTableCell>
                        <CustomTableCell numeric>{intl.get("form.description")}</CustomTableCell>
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
                                <CustomTableCell numeric>{book.barcode}</CustomTableCell>
                                <CustomTableCell numeric>{book.borrowTime}</CustomTableCell>
                                <CustomTableCell numeric>{book.returnTime}</CustomTableCell>
                                <CustomTableCell numeric>{book.state === 3 && intl.get('basic.lost')}</CustomTableCell>
                                <CustomTableCell numeric>{book.fine}</CustomTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                {props.total !== undefined && <TableFooter>
                    <TableRow>
                        <CustomTableCell>{intl.get("form.totalFine")}</CustomTableCell>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric>{props.total}</CustomTableCell>
                    </TableRow>
                </TableFooter>}
            </Table>}
        </Grid>
    );
};

const BorrowedTableWrapped = withStyles(styles)(BorrowedTable);
export default BorrowedTableWrapped;