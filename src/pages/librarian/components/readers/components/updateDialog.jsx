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
        }
    }

    handleChange = name => e => this.setState({updateReader: {...this.state.updateReader, [name]: e.target.value}})

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
            >
                <DialogTitle>{intl.get('form.formTitle.updateReader')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label={intl.get('form.password')}
                        type='password'
                        fullWidth
                        onChange={this.handleChange('password')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.email')}
                        type='email'
                        fullWidth
                        onChange={this.handleChange('email')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button color='primary' onClick={this.props.handleUpdateReader({
                        id: this.props.reader && this.props.reader.id,
                        email: this.state.updateReader.email,
                        password: this.state.updateReader.password,
                    })}>
                        {intl.get('form.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}