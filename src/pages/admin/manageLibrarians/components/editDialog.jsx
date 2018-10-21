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
            <DialogTitle id="form-dialog-title">Edit the librarian</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the new email address or the new password here.
                </DialogContentText>
                <TextField
                    margin="normal"
                    id="name"
                    label="ID"
                    fullWidth
                    defaultValue={props.account !== undefined && props.account.id}
                    disabled
                    // variant="outlined"
                />
                <TextField
                    error={props.formError === "emailEmpty" || props.formError === "emailIncorrect"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "emailEmpty" ?
                            "The email can not be empty" :
                            props.formError === "emailIncorrect" ?
                            "Incorrect email format." : "Email"
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
                            "The passwords are not same!" : props.formError === "passwordEmpty" ?
                            "The passwords can not be empty" : "Password"
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
                            "The passwords are not same!" : "Confirm password"
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
                        label={"change password"}
                    />
                </FormGroup>
                <div className="grow"/>
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