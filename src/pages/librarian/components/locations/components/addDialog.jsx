import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: undefined,
            init: false,
        }
    }

    handleChange = e => {this.setState({location: e.target.value})}
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                location: undefined,
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                location: undefined,
                init: false
            })
        }
    }

    render() {
        this.handleInit()

        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.addLocation')}</DialogTitle>
                <DialogContent>
                    <TextField
                        error={this.props.formError === "locationEmpty"}
                        margin="normal"
                        label={this.props.formError === "locationEmpty" ?
                            intl.get('form.locationEmpty') : intl.get('form.location')}
                        fullWidth
                        multiline
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        {intl.get('form.cancel')}
                    </Button>
                    <Button
                        onClick={this.props.handleAdd(this.state.location)}
                        color="primary"
                        disabled={this.props.processing}
                    >
                        {intl.get('form.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}