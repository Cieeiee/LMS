import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import {TextField} from "@material-ui/core";
import * as intl from "react-intl-universal";

export default function DeleteDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{intl.get('form.formTitle.deleteLocation')}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    label={intl.get('form.location')}
                    fullWidth
                    defaultValue={props.location && props.location.location}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.cancel')}
                </Button>
                <Button
                    onClick={props.location && props.handleDelete(props.location.location)}
                    color="primary"
                    disabled={props.processing}
                >
                    {intl.get('form.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}