import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {DialogContentText, TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";

export default class LostDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readerID: undefined,
        }
    }

    handleChange = name => e => this.setState({[name]: e.target.value})


    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Which reader lost the book?</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='Barcode'
                        fullWidth
                        defaultValue={this.props.barcode}
                        disabled
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Reader ID'
                        fullWidth
                        onChange={this.handleChange('readerID')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>Cancel</Button>
                    <Button
                        color='primary'
                        onClick={this.props.handleBorrow({
                            type: 1,
                            barcode: this.props.barcode,
                            state: 0
                        })}
                    >OK</Button>
                </DialogActions>
            </Dialog>
        );
    }
}