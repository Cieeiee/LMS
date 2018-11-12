import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import * as intl from "react-intl-universal";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";


export default function CancelReserveDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{intl.get('form.formTitle.cancelReserveBook')}</DialogTitle>
            <DialogContent>
                <TextField
                    label={intl.get('form.barcode')}
                    defaultValue={props.book && props.book.barcode}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.cancel')}
                </Button>
                <Button
                    onClick={props.book && props.handleCancelReserve(props.reader, props.book.barcode, props.book.reserveTime)}
                    color="primary"
                    disabled={props.processing}
                >
                    {intl.get('form.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}