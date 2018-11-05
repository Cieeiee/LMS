import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import * as intl from "react-intl-universal";

export default class UpdateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateReader: {},
            init: false,
        }
    }

    handleChange = name => e => this.setState({updateReader: {...this.state.updateReader, [name]: e.target.value}})
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                updateReader: this.props.reader,
                init: true
            })
        }
        if (!this.props.open && this.state.init){
            this.setState({
                updateReader: {},
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
                <DialogTitle>{intl.get('form.formTitle.updateReader')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label={intl.get('form.account')}
                        fullWidth
                        defaultValue={this.props.reader && this.props.reader.id}
                        disabled
                    />
                    <TextField
                        error={this.props.formError === "nameEmpty"}
                        margin='dense'
                        label={this.props.formError === "nameEmpty" ?
                            intl.get('form.nameEmpty') : intl.get('form.name')}
                        fullWidth
                        defaultValue={this.props.reader && this.props.reader.name}
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
                        defaultValue={this.props.reader && this.props.reader.email}
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange('email')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button color='primary' onClick={this.props.handleUpdateReader({
                        id: this.props.reader && this.props.reader.id,
                        name: this.state.updateReader.name,
                        email: this.state.updateReader.email,
                    })}>
                        {intl.get('form.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}