import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import {TextField} from "@material-ui/core";
import * as intl from "react-intl-universal";

export default function DeleteDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{intl.get('form.formTitle.deleteCategory')}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    label={intl.get('form.English')}
                    fullWidth
                    defaultValue={props.category && props.category.categoryEn}
                    disabled
                />
                <TextField
                    margin="normal"
                    label={intl.get('form.Chinese')}
                    fullWidth
                    defaultValue={props.category && props.category.categoryCh}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get('form.cancel')}
                </Button>
                <Button onClick={props.category && props.handleDelete(props.category.categoryEn)} color="primary" autoFocus>
                    {intl.get('form.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}