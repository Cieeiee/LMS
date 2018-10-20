import {Dialog, DialogTitle} from "@material-ui/core";
import React from "react";

export default function MessageDialog(props) {
    return (
        <Dialog
            onClose={props.handleClose}
            open={props.open}
        >
            <DialogTitle>
                {props.message}
            </DialogTitle>
        </Dialog>
    );
}