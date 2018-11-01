import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";
import * as intl from "react-intl-universal";

export default function LibraryRules(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{intl.get("reader.rules.title")}</DialogTitle>
            <DialogContent>
                <TextField
                    label={intl.get("admin.rules.Deposit")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {intl.get("admin.rules.Deposit_unit")}
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.deposit}
                    helperText={intl.get("admin.rules.Deposit_detail")}
                />
                <TextField
                    label={intl.get("admin.rules.Fine")}
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
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.fine}
                    helperText={intl.get("admin.rules.Fine_detail")}
                />
                <TextField
                    label={intl.get("admin.rules.TimeToReturnBook")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {intl.get("admin.rules.TimeToReturnBook_unit")}
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.maxReturnTime}
                    helperText={intl.get("admin.rules.TimeToReturnBook_detail")}
                />
                <TextField
                    label={intl.get("admin.rules.ValidTimeForReserving")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {intl.get("admin.rules.ValidTimeForReserving_unit")}
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.maxReserveTime}
                    helperText={intl.get("admin.rules.ValidTimeForReserving_detail")}
                />
                <TextField
                    label={intl.get("admin.rules.MaximumBooksToBorrow")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {intl.get("admin.rules.MaximumBooksToBorrow_unit")}
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.maxBorrowNum}
                    helperText={intl.get("admin.rules.MaximumBooksToBorrow_detail")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {intl.get("form.cancel")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}