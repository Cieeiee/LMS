import {Dialog, DialogTitle} from "@material-ui/core";
import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import Button from "@material-ui/core/Button/Button";

export default function MessageDialog(props) {
    return (
        <div>
            <Dialog
                onClose={props.handleClose}
                open={props.open}
            >
                <ClickAwayListener onClickAway={props.handleClose}>
                    <DialogTitle>
                        {props.message}
                    </DialogTitle>
                </ClickAwayListener>
            </Dialog>
        </div>
    );
}