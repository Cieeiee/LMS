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
import * as intl from "react-intl-universal";

export default function EditDialog(props) {
    return (
        <Dialog
            fullWidth
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.updateLibrarian')}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    id="name"
                    label={intl.get('form.account')}
                    fullWidth
                    defaultValue={props.account !== undefined && props.account.id}
                    disabled
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
                    defaultValue={props.account !== undefined && props.account.email}
                    value={props.email}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("email")}
                    // variant="outlined"
                />
                { props.changePassword && <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            intl.get('form.passwordNotSame') : props.formError === "passwordEmpty" ?
                            intl.get('form.passwordEmpty') : intl.get('form.password')
                    }
                    type="password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    value={props.password}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("password")}
                    // variant="outlined"
                />}
                { props.changePassword && <TextField
                    error={props.formError === "passwordNotSame"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            intl.get('form.passwordNotSame') : intl.get('form.confirmPassword')
                    }
                    type="password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    value={props.confirmPassword}
                    onFocus={props.clearFormError}
                    onChange={props.handleChange("confirmPassword")}
                    // variant="outlined"
                />}
            </DialogContent>
            <DialogActions>
                <FormGroup style={{marginLeft: 20}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.changePassword}
                                onClick={props.handleChange("changePassword")}
                                value="changePassword"
                                color="primary"
                            />
                        }
                        label={intl.get('form.changePassword')}
                    />
                </FormGroup>
                <div className="grow"/>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.cancel')}
                </Button>
                <Button
                    onClick={props.handleEdit}
                    color="primary"
                    disabled={props.processing}
                >
                    {intl.get('form.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}