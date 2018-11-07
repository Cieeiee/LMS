import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

export default class ReturnDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barcode: undefined,
            init: false,
        }
    }

    handleChange = name => e => this.setState({[name]: e.target.value})
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                barcode: undefined,
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                barcode: undefined,
                init: false
            })
        }
    }

    render() {
        this.handleInit()

        return (
            <div>
                {this.props.step === 0 &&
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{intl.get('librarian.nav.lostBook')}</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={this.props.formError === "barcodeEmpty"}
                            margin='dense'
                            label={this.props.formError === "barcodeEmpty" ?
                                intl.get("form.barcodeEmpty") : intl.get('form.barcode')}
                            fullWidth
                            value={this.state.barcode}
                            onFocus={this.props.clearFormError}
                            onChange={this.handleChange("barcode")}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                        <Button
                            color='primary'
                            onClick={
                                this.props.handlePayFine({
                                    barcode: this.state.barcode,
                                    state: 1
                                })
                            }
                            disabled={this.props.processing}
                        >
                            {intl.get('form.confirm')}
                        </Button>
                    </DialogActions>
                </Dialog>}
                {this.props.step === 1 &&
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.payFine')}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin='dense'
                            label={intl.get('form.fineNoUnit')}
                            fullWidth
                            defaultValue={this.props.fine}
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
                        <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                        <Button
                            color='primary'
                            onClick={this.props.handleBorrow({
                                type: 1,
                                barcode: this.state.barcode,
                                state: 1
                            })}
                            disabled={this.props.processing}
                        >
                            {intl.get('form.paid')}
                        </Button>
                    </DialogActions>
                </Dialog>}

            </div>
        );
    }
}