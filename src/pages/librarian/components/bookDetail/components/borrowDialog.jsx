import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";

export default class BorrowDialog extends React.Component {
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
                <DialogTitle id="form-dialog-title">Borrow the book</DialogTitle>
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
                        label='Reader'
                        fullWidth
                        onChange={this.handleChange("readerID")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>Cancel</Button>
                    <Button
                        color='primary'
                        onClick={this.props.handleBorrow({
                            type: 0,
                            barcode: this.props.barcode,
                            id: this.state.readerID,
                            state: 0
                        })}
                    >OK</Button>
                </DialogActions>
            </Dialog>
        );
    }
}