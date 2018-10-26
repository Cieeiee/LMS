import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { BuildOutlined } from '@material-ui/icons';
import React from 'react';
import {withStyles} from '@material-ui/core';
import '../../librarian.scss'
import blue from "@material-ui/core/es/colors/blue";

const isSearched = searchTerm => item => 
  item.title.includes(searchTerm)

const Books = props => {
  return(
    <Table>
      <TableHead>
        <TableRow>
          <CustomTableCell>ISBN</CustomTableCell>
          <CustomTableCell numeric>title</CustomTableCell>
          <CustomTableCell numeric>author</CustomTableCell>
          <CustomTableCell numeric>category</CustomTableCell>
          <CustomTableCell numeric>location</CustomTableCell>
            <CustomTableCell numeric>remain</CustomTableCell>
            <CustomTableCell numeric>total</CustomTableCell>
          <CustomTableCell numeric><Button variant='outlined' color='inherit' onClick={props.handleOpen(null, 'ADD BOOK')}>add</Button></CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {typeof(props.list.filter) !== "undefined" && props.list.filter(isSearched(props.searchTerm)).map((item, index) =>
          <TableRow key={index} className="table-row">
            <TableCell>{item.isbn}</TableCell>
            <TableCell numeric>{item.title}</TableCell>
            <TableCell numeric>{item.author}</TableCell>
            <TableCell numeric>{item.category}</TableCell>
            <TableCell numeric>{item.location}</TableCell>
              <TableCell numeric>{item.remain}</TableCell>
              <TableCell numeric>{item.total}</TableCell>
            <TableCell numeric>
              <IconButton onClick={props.handleOpen(item.isbn, 'UPDATE BOOK')}>
                <BuildOutlined/>
              </IconButton>
              <Button variant='outlined' onClick={props.handleDetail(item.isbn)}>detail</Button>
            </TableCell>
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