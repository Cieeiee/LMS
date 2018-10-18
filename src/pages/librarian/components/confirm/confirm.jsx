import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';
import React from 'react';

export default props => 
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
          />
        </div>}
    </DialogContent>
    <DialogActions>
      <Button color='primary' onClick={props.handleClose}>cancel</Button>
      {props.title === 'DELETE' && <Button color='primary' onClick={props.handleDelete(props.barCode)}>OK</Button>}
      {props.title === 'BORROW' && <Button color='primary' onClick={props.handleBorrow(props.barCode)}>OK</Button>}
      {props.title === 'RETURN' && <Button color='primary' onClick={props.handleReturn(props.barCode)}>OK</Button>}
      {props.title === 'LOST' && <Button color='primary' onClick={props.handleLost(props.barCode)}>OK</Button>}
    </DialogActions>
  </Dialog>