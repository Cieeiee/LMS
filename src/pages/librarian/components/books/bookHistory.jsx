import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const BookHistory = props => {
  return(
    props.list === null? null:
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell numeric>librarian id</TableCell>
          <TableCell numeric>barcode</TableCell>
          <TableCell numeric>ISBN</TableCell>
          <TableCell numeric>title</TableCell>
          <TableCell numeric>date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {typeof(props.list.map) !== "undefined" && props.list.map((item, index) =>
          <TableRow key={index}>
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

export default BookHistory;