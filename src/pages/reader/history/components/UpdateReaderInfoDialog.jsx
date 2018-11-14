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
import * as intl from "react-intl-universal";

export default function UpdateReaderInfoDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">{intl.get("form.formTitle.updateInformation")}</DialogTitle>
            <DialogContent>
                <TextField
                    error={props.formError === "nameEmpty"}
                    margin="normal"
                    label={props.formError === "nameEmpty" ? intl.get("form.nameEmpty") : intl.get("form.name")}
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
                    label={
                        props.formError === "emailEmpty" ?
                            intl.get("form.emailEmpty") :
                            props.formError === "emailIncorrect" ?
                                intl.get("form.emailIncorrect") : intl.get("form.email")
                    }
                    type="email"
                    fullWidth
                    defaultValue={props.info !== undefined && props.info.email}
                    value={props.email}
                    onChange={props.handleChange("email")}
                    onFocus={props.handleClearFormError}
                    // variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get("form.cancel")}
                </Button>
                <Button onClick={props.handleUpdate} disabled={props.processing} color="primary">
                    {intl.get("form.confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}