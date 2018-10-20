import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";

export default function LibraryRules(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Library Rules"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {/*The following are the rules of library now.*/}
                </DialogContentText>
                <TextField
                    label="Deposit"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                $
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.deposit}
                    helperText={"The deposit you have to pay before borrowing a book."}
                />
                <TextField
                    label="Fine"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                $/day
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.fine}
                    helperText={"The fine you have to pay if a book haven't been returned in time"}
                />
                <TextField
                    label="Time to return book"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                days
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.maxReturnTime}
                    helperText={"The time limit after you borrowed a book"}
                />
                <TextField
                    label="Valid Time for reserving"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                hours
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.maxReserveTime}
                    helperText={"The duration your reservation is valid."}
                />
                <TextField
                    label="Maximum books to borrow"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                books
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    margin="normal"
                    fullWidth
                    defaultValue={props.rules.maxBorrowNum}
                    helperText={"The maximum number of books you can borrow at a time."}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}