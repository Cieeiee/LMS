import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

export default function LostDialog(props) {
    return (
        <div>
            {props.step === 0 &&
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.lostBook')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label={intl.get('form.barcode')}
                        fullWidth
                        defaultValue={props.barcode}
                        disabled
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        color='primary'
                        onClick={
                            props.handlePayFine({
                                barcode: props.barcode,
                                state: 0
                            })
                        }
                        disabled={props.processing}
                    >{intl.get('form.confirm')}</Button>
                </DialogActions>
            </Dialog>}
            {props.step === 1 &&
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.payFine')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label={intl.get('form.fineNoUnit')}
                        fullWidth
                        defaultValue={props.fine}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {intl.get("admin.rules.Fine_unit")}
                                </InputAdornment>
                            ),
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        color='primary'
                        onClick={props.handleBorrow({
                            type: 1,
                            barcode: props.barcode,
                            state: 0
                        })}
                        disabled={props.processing}
                    >{intl.get('form.paid')}</Button>
                </DialogActions>
            </Dialog>}
        </div>
    );
}