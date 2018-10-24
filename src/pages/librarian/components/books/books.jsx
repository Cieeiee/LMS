import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { BuildOutlined } from '@material-ui/icons';
import React from 'react';
import '../../librarian.scss';

const isSearched = searchTerm => item => 
  item.title.includes(searchTerm)

const Books = props => {
  return(
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell numeric>ISBN</TableCell>
          <TableCell numeric>title</TableCell>
          <TableCell numeric>author</TableCell>
          <TableCell numeric>category</TableCell>
          <TableCell numeric>price</TableCell>
          <TableCell numeric><Button variant='outlined' color='secondary' onClick={props.handleOpen(null, 'ADD BOOK')}>add</Button></TableCell>
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
            <TableCell numeric>
              <IconButton onClick={props.handleOpen(item.isbn, 'UPDATE BOOK')}>
                <BuildOutlined color='secondary' />
              </IconButton>
              <Button variant='outlined' color='secondary' onClick={props.handleDetail(item.isbn)}>detail</Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default Books;