import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";

export default function AddDialog(props) {
    return (
        <Dialog
            fullWidth
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add a notification</DialogTitle>
            <DialogContent>
                {/*<DialogContentText>*/}
                    {/**/}
                {/*</DialogContentText>*/}
                <TextField
                    error={props.formError === "messageEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "messageEmpty" ? "The message can not be empty" : "message"}
                    fullWidth
                    multiline
                    value={props.message}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("message")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleAdd} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}