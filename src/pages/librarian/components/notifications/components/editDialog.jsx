import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";

export default function EditDialog(props) {
    return (
        <Dialog
            fullWidth
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Edit the notification</DialogTitle>
            <DialogContent>
                {/*<DialogContentText>*/}
                    {/*Please enter the new email address or the new password here.*/}
                {/*</DialogContentText>*/}
                {/*<TextField*/}
                    {/*margin="normal"*/}
                    {/*id="name"*/}
                    {/*label="Timestamp"*/}
                    {/*fullWidth*/}
                    {/*defaultValue={props.timestamp}*/}
                    {/*disabled*/}
                    {/*// variant="outlined"*/}
                {/*/>*/}
                <TextField
                    error={props.formError === "messageEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "messageEmpty" ? "The message can not be empty" : "Message"}
                    type="email"
                    fullWidth
                    multiline
                    defaultValue={props.message}
                    value={props.message}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("message")}
                    // variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleEdit} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}