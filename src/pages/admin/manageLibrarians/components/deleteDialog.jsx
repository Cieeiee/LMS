import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";
import {TextField} from "@material-ui/core";

export default function DeleteDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{intl.get('form.formTitle.deleteLibrarian')}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    id="name"
                    label={intl.get('form.account')}
                    fullWidth
                    defaultValue={props.account !== undefined && props.account.id}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.cancel')}
                </Button>
                <Button onClick={props.handleDelete} color="primary" autoFocus>
                    {intl.get('form.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}