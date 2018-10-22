import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';

export default props => {
  return(
    props.book === null? null:
    <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '0 auto'}}>
      <div style={{display: 'flex'}}>
        <img src={props.book.bookClass.picture} alt='load failed!' height='400px' />
        <div>
          <h1>{props.book.bookClass.title}</h1>
          <p>Author: {props.book.bookClass.author}</p>
          <p>Category: {props.book.bookClass.category}</p>
          <p>Location: {props.book.bookClass.location}</p>
        </div>
      </div>
      <p>{props.book.introduction}</p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>barcode</TableCell>
            <TableCell>title</TableCell>
            <TableCell numeric>borrow/return</TableCell>
            <TableCell numeric>delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.book.state.map(item =>
            <TableRow key={item.barcode}>
              <TableCell>{item.barcode}</TableCell>
              <TableCell>{props.book.bookClass.title}</TableCell>
              <TableCell numeric>
                {item.availability !== 1?
                  <Button variant='outlined' color='primary' onClick={props.handleOpen(item.barcode, 'BORROW')}>borrow</Button>:
                  <div>
                    <Button variant='outlined' color='primary' onClick={props.handleOpen(item.barcode, 'RETURN')}>return</Button>
                    <Button variant='outlined' color='secondary' onClick={props.handleOpen(item.barcode, 'LOST')}>lost</Button>
                  </div>}
              </TableCell>
              <TableCell numeric><Button variant='outlined' color='secondary' onClick={props.handleOpen(item.barcode, 'DELETE')}>delete</Button></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}