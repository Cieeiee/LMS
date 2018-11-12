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
                    error={props.formError === "accountEmpty" || props.formError === "accountIncorrect"}
                    margin="normal"
                    id="name"
                    label={props.formError === "accountEmpty" ? intl.get('form.accountEmpty')
                        : props.formError === "accountIncorrect" ?
                            intl.get('form.accountIncorrect') : intl.get('form.account')}
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
                    margin="normal"
                    id="name"
                    label={intl.get('form.password')}
                    fullWidth
                    defaultValue={"00010001"}
                    disabled
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