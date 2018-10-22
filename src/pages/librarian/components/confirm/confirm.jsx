import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';
import React from 'react';

export default class Confirm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readerId: null,
      newBook: {}
    }
  }
  handleChange = name => e => this.setState({newBook: {...this.state.newBook, [name]: e.target.value}})
  
  render() {
    const props = this.props
    return(
      <Dialog open={props.open} onClose={props.handleClose} fullWidth>
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <DialogContent>
          {props.title === 'DELETE' && 
            <DialogContentText>确实要删？</DialogContentText>}
          {props.title === 'BORROW' && 
            <div>
              <DialogContentText>谁借？</DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                label='Reader'
                fullWidth
                onChange={this.handleChange('readerId')}
              />
            </div>}
          {props.title === 'RETURN' &&
            <DialogContentText>确实要还？</DialogContentText>}
          {props.title === 'LOST' &&
            <div>
              <DialogContentText>哪位小可爱把书丢了？</DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                label='Reader'
                fullWidth
                onChange={this.handleChange('readerId')}
              />
            </div>}
          {props.title === 'ADD BOOK' &&
            <div>
              <TextField
                margin='dense'
                label='ISBN'
                fullWidth
                onChange={this.handleChange('isbn')}
              />
              <TextField
                margin='dense'
                label='title'
                fullWidth
                onChange={this.handleChange('title')}
              />
              <TextField
                margin='dense'
                label='author'
                fullWidth
                onChange={this.handleChange('author')}
              />
              <TextField
                margin='dense'
                label='category'
                fullWidth
                onChange={this.handleChange('category')}
              />
              <TextField
                margin='dense'
                label='introduction'
                fullWidth
                onChange={this.handleChange('introduction')}
              />
              <TextField
                margin='dense'
                label='location'
                fullWidth
                onChange={this.handleChange('location')}
              />
              <TextField
                margin='dense'
                label='price'
                fullWidth
                onChange={this.handleChange('price')}
              />
              <TextField
                margin='dense'
                label='number'
                fullWidth
                onChange={this.handleChange('number')}
              />
            </div>}
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={props.handleClose}>cancel</Button>
          
          {props.title === 'DELETE' && 
            <Button 
              color='primary' 
              onClick={props.handleDelete(props.libid, props.barcode)}
            >OK</Button>}
          
          {props.title === 'BORROW' && 
            <Button 
              color='primary' 
              onClick={props.handleBorrow({
                type: 0,
                barcode: props.barcode,
                id: this.state.readerId,
                state: 0
              })}
            >OK</Button>}
          
          {props.title === 'RETURN' && 
            <Button 
              color='primary' 
              onClick={props.handleBorrow({
                type: 1,
                barcode: props.barcode,
                state: 1
              })}
            >
            OK</Button>}
          
          {props.title === 'LOST' && 
            <Button 
              color='primary' 
              onClick={props.handleBorrow({
                type: 1,
                barcode: props.barcode,
                state: 0
              })}
            >OK</Button>}
          
          {props.title === 'ADD BOOK' && 
            <Button 
              color='primary' 
              onClick={props.handleAddBook(this.state.newBook)}
            >OK</Button>}

        </DialogActions>
      </Dialog>
    )
  }
}
  