import React from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import {  } from '@material-ui/icons'
import '../../librarian.scss'
import blue from "@material-ui/core/es/colors/blue";

const isSearched = searchTerm => item => 
  item.title.includes(searchTerm)

const Books = props => {
  return(
    <Table>
      <TableHead>
        <TableRow>
          <CustomTableCell>ID</CustomTableCell>
          <CustomTableCell numeric>ISBN</CustomTableCell>
          <CustomTableCell numeric>title</CustomTableCell>
          <CustomTableCell numeric>author</CustomTableCell>
          <CustomTableCell numeric>category</CustomTableCell>
          <CustomTableCell numeric>price</CustomTableCell>
          <CustomTableCell numeric><Button variant='outlined' color='inherit' onClick={props.handleOpen(null, 'ADD BOOK')}>add</Button></CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {typeof(props.list.filter) !== "undefined" && props.list.filter(isSearched(props.searchTerm)).map((item, index) =>
          <TableRow key={index} className="table-row">
            <TableCell>{index}</TableCell>
            <TableCell numeric>{item.isbn}</TableCell>
            <TableCell numeric>{item.title}</TableCell>
            <TableCell numeric>{item.author}</TableCell>
            <TableCell numeric>{item.category}</TableCell>
            <TableCell numeric>{item.price}</TableCell>
            <TableCell numeric><Button variant='outlined' onClick={props.handleDetail(item.isbn)}>detail</Button></TableCell>
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
}))(TableCell);

export default Books;