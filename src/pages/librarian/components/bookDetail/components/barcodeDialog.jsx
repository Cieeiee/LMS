import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import React from "react";
import {serverReader} from "../../../../../mock/config";

export default function BarcodeDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogContent>
                <img src={`${serverReader}/barcode_picture?imgName=${props.barcode}.png`}
                     alt='' width='300px'/>
            </DialogContent>
        </Dialog>
    );
}