import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";

export default class DeleteDialog extends React.Component {
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
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('librarian.nav.deleteBook')}</DialogTitle>
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
                        onClick={this.props.handleDelete(this.props.libID, this.state.barcode)}
                        disabled={this.props.processing}
                    >{intl.get('form.confirm')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}