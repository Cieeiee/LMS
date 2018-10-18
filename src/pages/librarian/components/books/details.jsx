import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';

export default props => 
  <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '0 auto'}}>
    <div style={{display: 'flex'}}>
      <img src={props.book.picture} alt='load failed!' />
      <div>
        <h1>{props.book.title}</h1>
        <p>Author: {props.book.author}</p>
        <p>Category: {props.book.category}</p>
        <p>Location: {props.book.location}</p>
      </div>
    </div>
    <p>{props.book.introduction}</p>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>barCode</TableCell>
          <TableCell>title</TableCell>
          <TableCell numeric>borrow/return</TableCell>
          <TableCell numeric>delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.book.state.map(item =>
          <TableRow key={item.barCode}>
            <TableCell>{item.barCode}</TableCell>
            <TableCell>{props.book.title}</TableCell>
            <TableCell numeric>
              {item.availability === 1?
                <Button variant='outlined' color='primary' onClick={props.handleOpen(item.barCode, 'BORROW')}>borrow</Button>:
                <div>
                  <Button variant='outlined' color='primary' onClick={props.handleOpen(item.barCode, 'RETURN')}>return</Button>
                  <Button variant='outlined' color='secondary' onClick={props.handleOpen(item.barCode, 'LOST')}>lost</Button>
                </div>}
            </TableCell>
            <TableCell numeric><Button variant='outlined' color='secondary' onClick={props.handleOpen(item.barCode, 'DELETE')}>delete</Button></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>