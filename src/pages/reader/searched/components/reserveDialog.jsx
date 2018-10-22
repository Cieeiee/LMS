import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";

export default function ReserveDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Reserve the book?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once you reserve the book, the book will been reserved for you.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleReserve(props.book)} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}