import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField, DialogActions } from '@material-ui/core';
import React from 'react';
import { fetchReaderHistory } from '../../../../mock';

export default class Readers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      history: null,
      newReader: {},
      addOpen: false
    }
  }
  handleClose = () => this.setState({open: false})
  handleclose1 = () => this.setState({addOpen: false})
  handleChange = name => e => this.setState({newReader: {...this.state.newReader, [name]: e.target.value}})

  handleOpen = () => this.setState({addOpen: true})
  handleDtails = id => async () => {
    const history = await fetchReaderHistory(id)
    this.setState({
      open: true,
      history
    })
  }
  render() {
    const props = this.props
    return([
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell numeric>Name</TableCell>
            <TableCell numeric>books borrowed</TableCell>
            <TableCell numeric>books reserved</TableCell>
            <TableCell numeric>deposit</TableCell>
            <TableCell numeric><Button variant='outlined' color='secondary' onClick={this.handleOpen}>add</Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {typeof(props.list.map) !== "undefined"
            && props.list.filter(reader => reader.id.includes(props.searchTerm)).map((item, index) =>
            <TableRow key={index} className="table-row">
              <TableCell>{item.id}</TableCell>
              <TableCell numeric>{item.name}</TableCell>
              <TableCell numeric>{item.booksBorrowed}</TableCell>
              <TableCell numeric>{item.booksReserved}</TableCell>
              <TableCell numeric>{item.deposit}</TableCell>
              <TableCell numeric>
                <Button variant='outlined' color='secondary' onClick={this.handleDtails(item.id)}>detail</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>,
      <Dialog
        maxWidth='lg'
        open={this.state.open}
        onClose={this.handleClose}
      >
        <DialogTitle>Borrow History</DialogTitle>
        <DialogContent>
          {this.state.history === null? <p>load failed!</p>:
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>barcode</TableCell>
                <TableCell>borrow time</TableCell>
                <TableCell>return time</TableCell>
                <TableCell>fine</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.history.map(item => 
                <TableRow key={item.barcode}>
                  <TableCell>{item.barcode}</TableCell>
                  <TableCell>{item.borrowTime}</TableCell>
                  <TableCell>{item.returnTime}</TableCell>
                  <TableCell>{item.fine}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>}
        </DialogContent>
      </Dialog>,
      <Dialog
        open={this.state.addOpen}
        onClose={this.handleclose1}
      >
        <DialogTitle>Add Reader</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='ID'
            fullWidth
            onChange={this.handleChange('id')}
          />
          <TextField
            margin='dense'
            label='password'
            type='password'
            fullWidth
            onChange={this.handleChange('password')}
          />
          <TextField
            margin='dense'
            label='email'
            type='email'
            fullWidth
            onChange={this.handleChange('email')}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={this.handleclose1}>cancel</Button>
          <Button color='primary' onClick={props.handleAddReader(this.state.newReader)}>OK</Button>
        </DialogActions>
      </Dialog>
    ])
  }
}