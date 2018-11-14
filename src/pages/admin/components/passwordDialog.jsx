import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";

export default function PasswordDialog(props) {
    return (
        <Dialog
            fullWidth
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.changePassword')}</DialogTitle>
            <DialogContent>
                <TextField
                    error={props.formError === "oldPasswordEmpty"}
                    margin="normal"
                    label={
                         props.formError === "oldPasswordEmpty" ?
                            intl.get('form.passwordEmpty') : intl.get('form.oldPassword')
                    }
                    type="password"
                    fullWidth
                    value={props.oldPassword}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("oldPassword")}
                />
                <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    label={
                        props.formError === "passwordNotSame" ?
                            intl.get('form.passwordNotSame') : props.formError === "passwordEmpty" ?
                            intl.get('form.passwordEmpty') : intl.get('form.newPassword')
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
                    label={
                        props.formError === "passwordNotSame" ?
                            intl.get('form.passwordNotSame') : intl.get('form.confirmPassword')
                    }
                    type="password"
                    fullWidth
                    value={props.confirmPassword}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("confirmPassword")}
                />
            </DialogContent>
            <DialogActions>
                <div className="grow"/>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.cancel')}
                </Button>
                <Button
                    onClick={props.handleChangePassword}
                    color="primary"
                    disabled={props.processing}
                >
                    {intl.get('form.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}