import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const Books = props => 
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell numeric>ISBN</TableCell>
        <TableCell numeric>title</TableCell>
        <TableCell numeric>author</TableCell>
        <TableCell numeric>category</TableCell>
        <TableCell numeric>price</TableCell>
        <TableCell numeric><Button variant='contained' color='primary'>add</Button></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.list.map((item, index) => 
        <TableRow key={index}>
          <TableCell>{index}</TableCell>
          <TableCell numeric>{item.isbn}</TableCell>
          <TableCell numeric>{item.title}</TableCell>
          <TableCell numeric>{item.author}</TableCell>
          <TableCell numeric>{item.category}</TableCell>
          <TableCell numeric>{item.price}</TableCell>
          <TableCell numeric><Button variant='outlined' color='secondary' onClick={props.handleOpen}>detail</Button></TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>

export default Books;