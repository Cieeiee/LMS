import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import '../../reader.scss'

export default function UpdateReaderInfoDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">Update your information.</DialogTitle>
            <DialogContent>
                <DialogContentText>

                </DialogContentText>
                <TextField
                    error={props.formError === "nameEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "nameEmpty" ? "the name can not be empty!" : "Name"}
                    fullWidth
                    defaultValue={props.info!== undefined && props.info.name}
                    value={props.name}
                    onChange={props.handleChange("name")}
                    onFocus={props.handleClearFormError}
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
                    defaultValue={props.info !== undefined && props.info.email}
                    value={props.email}
                    onChange={props.handleChange("email")}
                    onFocus={props.handleClearFormError}
                    // variant="outlined"
                />
                { props.changePassword &&
                <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            "The passwords are not same!" : props.formError === "passwordEmpty" ?
                            "The passwords can not be empty" : "Password"
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="password"
                    fullWidth
                    value={props.password}
                    onChange={props.handleChange("password")}
                    onFocus={props.handleClearFormError}
                />
                }
                { props.changePassword &&
                <TextField
                    error={props.formError === "passwordNotSame" }
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            "The passwords are not same!" : "Confirm Password"
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="password"
                    fullWidth
                    value={props.confirmPassword}
                    onChange={props.handleChange("confirmPassword")}
                    onFocus={props.handleClearFormError}
                />
                }

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
                <Button onClick={props.handleUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}