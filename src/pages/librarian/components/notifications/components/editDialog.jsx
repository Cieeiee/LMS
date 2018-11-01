import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";

export default class EditDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
            init: false,
        }
    }

    handleChange = e => {this.setState({message: e.target.value})}
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                message: this.props.notification.message,
                init: true,
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                message: undefined,
                init: false,
            })
        }
    }

    render() {
        this.handleInit();

        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.updateNotification')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        id="name"
                        label={intl.get('form.timestamp')}
                        fullWidth
                        defaultValue={this.props.notification && this.props.notification.timestamp}
                        disabled
                    />
                    <TextField
                        error={this.props.formError === "messageEmpty"}
                        margin="normal"
                        label={this.props.formError === "messageEmpty" ?
                            intl.get('form.messageEmpty') : intl.get('form.message')}
                        type="name"
                        fullWidth
                        multiline
                        defaultValue={this.props.notification && this.props.notification.message}
                        value={this.state.message}
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        {intl.get('form.cancel')}
                    </Button>
                    <Button
                        onClick={this.props.handleEdit(this.props.notification, this.state.message)}
                        color="primary"
                    >
                        {intl.get('form.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}