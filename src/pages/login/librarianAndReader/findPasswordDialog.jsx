import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";
import {TextField} from "@material-ui/core";

export default function FindPasswordDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Find your password"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Enter your ID (your phone number) and email correctly, then an email with your password will be sent to you.
                </DialogContentText>
                <TextField
                    error={props.formError === "IDEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "IDEmpty" ? "The ID can not be empty" : "ID"}
                    fullWidth
                    value={props.ID}
                    onChange={props.handleChange("ID")}
                />
                <TextField
                    error={props.formError === "emailEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "emailEmpty" ? "The email can not be empty" : "email"}
                    fullWidth
                    value={props.email}
                    onChange={props.handleChange("email")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleFindPassword} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}