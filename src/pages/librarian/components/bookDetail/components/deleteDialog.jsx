import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";

export default function DeleteDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.deleteBook')}</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label={intl.get('form.barcode')}
                    fullWidth
                    defaultValue={props.barcode}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.handleClose}>{intl.get('form.cancel')}</Button>
                <Button
                    color='primary'
                    onClick={props.handleDelete(props.libID, props.barcode)}
                >{intl.get('form.confirm')}</Button>
            </DialogActions>
        </Dialog>
    );
}