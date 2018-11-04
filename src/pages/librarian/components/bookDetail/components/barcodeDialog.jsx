import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";
import {serverReader} from "../../../../../mock/config";

export default function BarcodeDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogContent>
                <img src={`${serverReader}/barcode_picture?imgName=${props.barcode}.png`}
                     alt='' width='500px'/>
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.handleClose}>{intl.get('form.close')}</Button>
            </DialogActions>
        </Dialog>
    );
}