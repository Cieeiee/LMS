import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography/Typography";
import '../../librarian.scss'

export default props => {
  return(
    props.book === null? null:
    <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '0 auto'}}>
      <div style={{display: 'flex', marginTop: 20}}>
        <img src={props.book.bookClass.picture} alt='load failed!' height='400px' />
        <div style={{marginLeft: 20}}>
          <Typography variant="title" gutterBottom style={{fontSize: 40}}>{props.book.bookClass.title}</Typography>
          <Typography variant="p" color="textSecondary">{props.book.bookClass.author}</Typography>
          <div style={{marginTop: 50}}>
              <div className="flew-row">
                  <Typography color="textSecondary">Category: </Typography>
                  <Typography>{props.book.bookClass.category}</Typography>
              </div>
              <div className="flex-row">
                  <Typography color="textSecondary">Location: </Typography>
                  <Typography>{props.book.bookClass.location}</Typography>
              </div>
              <Typography color="textSecondary">Introduction</Typography>
              <Typography style={{textIndent: '2em'}}>{props.book.bookClass.introduction}</Typography>
          </div>
        </div>
      </div>

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