import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";

export default function AddDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.addLibrarian')}</DialogTitle>
            <DialogContent>
                <TextField
                    error={props.formError === "nameEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "nameEmpty" ? intl.get('form.nameEmpty') : intl.get('form.account')}
                    fullWidth
                    value={props.ID}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("ID")}
                />
                <TextField
                    error={props.formError === "emailEmpty" || props.formError === "emailIncorrect"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "emailEmpty" ?
                            intl.get('form.emailEmpty') :
                            props.formError === "emailIncorrect" ?
                                intl.get('form.emailIncorrect') : intl.get('form.email')
                    }
                    type="email"
                    fullWidth
                    value={props.email}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("email")}
                />
                <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            intl.get('form.passwordNotSame') : props.formError === "passwordEmpty" ?
                            intl.get('form.passwordEmpty') : intl.get('form.password')
                    }
                    type="password"
                    fullWidth
                    value={props.password}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("password")}
                />
                <TextField
                    error={props.formError === "passwordNotSame"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            intl.get('form.passwordNotSame') : intl.get('form.confirmPassword')
                    }
                    type="password"
                    fullWidth
                    value={props.confirmPassword}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("confirmPassword")}
                    // variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.cancel')}
                </Button>
                <Button
                    onClick={props.handleAdd}
                    color="primary"
                    disabled={props.processing}
                >
                    {intl.get('form.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}