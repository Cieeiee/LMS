import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import * as intl from "react-intl-universal";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
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
            <DialogTitle>{intl.get('form.formTitle.reserveBook')}</DialogTitle>
            <DialogContent>
                <TextField
                    label={intl.get('form.barcode')}
                    defaultValue={props.barcode}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.cancel')}
                </Button>
                <Button
                    onClick={props.handleReserve(props.reader, props.barcode)}
                    color="primary"
                    disabled={props.processing}
                >
                    {intl.get('form.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}