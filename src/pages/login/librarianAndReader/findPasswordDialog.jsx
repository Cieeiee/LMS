import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";
import {TextField} from "@material-ui/core";
import * as intl from "react-intl-universal";

export default function FindPasswordDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{intl.get("form.formTitle.findPassword")}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {intl.get("form.formTitle.findPasswordText")}
                </DialogContentText>
                <TextField
                    error={props.formError === "IDEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "IDEmpty" ? intl.get("form.accountEmpty") : intl.get("form.account")}
                    fullWidth
                    value={props.ID}
                    onChange={props.handleChange("ID")}
                    onFocus={props.handleClearFormError}
                />
                <TextField
                    error={props.formError === "emailEmpty" || props.formError === "emailIncorrect"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "emailEmpty" ?
                            intl.get("form.emailEmpty") :
                            props.formError === "emailIncorrect" ?
                                intl.get("form.emailIncorrect") : intl.get("form.email")
                    }
                    fullWidth
                    value={props.email}
                    onChange={props.handleChange("email")}
                    onFocus={props.handleClearFormError}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get("form.cancel")}
                </Button>
                <Button
                    onClick={props.handleFindPassword}
                    color="primary"
                    autoFocus
                    disabled={props.processing}
                >
                    {intl.get("form.confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}