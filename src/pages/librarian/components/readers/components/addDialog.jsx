import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import * as intl from "react-intl-universal";

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newReader: {},
            init: false,
        }
    }

    handleChange = name => e => this.setState({newReader: {...this.state.newReader, [name]: e.target.value}})
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                newReader: {},
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                newReader: {},
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
            >
                <DialogTitle>{intl.get('form.formTitle.addReader')}</DialogTitle>
                <DialogContent>
                    <TextField
                        error={this.props.formError === "accountEmpty"}
                        margin='dense'
                        label={this.props.formError === "accountEmpty" ?
                            intl.get('form.accountEmpty') : intl.get('form.account')}
                        fullWidth
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange('id')}
                    />
                    <TextField
                        error={this.props.formError === "nameEmpty"}
                        margin='dense'
                        label={this.props.formError === "nameEmpty" ?
                            intl.get('form.nameEmpty') : intl.get('form.name')}
                        fullWidth
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange('name')}
                    />
                    <TextField
                        error={this.props.formError === "emailEmpty"}
                        margin='dense'
                        label={this.props.formError === "emailEmpty" ?
                            intl.get('form.emailEmpty') : intl.get('form.email')}
                        type='email'
                        fullWidth
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange('email')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        color='primary'
                        onClick={this.props.handleAddReader(this.state.newReader)}
                        disabled={this.props.processing}
                    >
                        {intl.get('form.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}