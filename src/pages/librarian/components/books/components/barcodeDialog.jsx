import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import * as intl from "react-intl-universal";

export default function BarcodeDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.barcodes')}</DialogTitle>
            <DialogContent>
                <div className="flex-col">
                    {props.barcodeImages !== undefined && props.barcodeImages.map(img =>
                        <img src={`${img}`} alt='' width='300px' style={{marginBottom: 40}}/>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}