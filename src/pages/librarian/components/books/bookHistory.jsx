import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import blue from "@material-ui/core/es/colors/blue";

const BookHistory = props => {
  return(
    props.list === null? null:
    <Table>
      <TableHead>
        <TableRow>
          <CustomTableCell>ID</CustomTableCell>
          <CustomTableCell numeric>librarian id</CustomTableCell>
          <CustomTableCell numeric>barcode</CustomTableCell>
          <CustomTableCell numeric>ISBN</CustomTableCell>
          <CustomTableCell numeric>title</CustomTableCell>
          <CustomTableCell numeric>date</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {typeof(props.list.map) !== "undefined" && props.list.map((item, index) =>
          <TableRow key={index} className="table-row">
            <TableCell>{item.num}</TableCell>
            <TableCell numeric>{item.id}</TableCell>
            <TableCell numeric>{item.barcode}</TableCell>
            <TableCell numeric>{item.isbn}</TableCell>
            <TableCell numeric>{item.title}</TableCell>
            <TableCell numeric>{item.date}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
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

export default BookHistory;