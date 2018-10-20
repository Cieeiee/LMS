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
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add a librarian</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the information that needed.
                </DialogContentText>
                <TextField
                    error={props.formError === "nameEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "nameEmpty" ? "The ID can not be empty" : "ID"}
                    fullWidth
                    value={props.ID}
                    onChange={props.handleChange("ID")}
                />
                <TextField
                    error={props.formError === "emailEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "emailEmpty" ? "The email can not be empty" : "Email"}
                    type="email"
                    fullWidth
                    value={props.email}
                    onChange={props.handleChange("email")}
                />
                <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            "The passwords are not same!" : props.formError === "passwordEmpty" ?
                            "The passwords can not be empty" : "Confirm Password"
                    }
                    type="password"
                    fullWidth
                    value={props.password}
                    onChange={props.handleChange("password")}
                />
                <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            "The passwords are not same!" : props.formError === "passwordEmpty" ?
                            "The passwords can not be empty" : "Confirm Password"
                    }
                    type="password"
                    fullWidth
                    value={props.confirmPassword}
                    onChange={props.handleChange("confirmPassword")}
                    // variant="outlined"
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