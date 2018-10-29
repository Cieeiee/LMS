import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

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
                <DialogTitle>Update Reader</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='email'
                        type='email'
                        fullWidth
                        onChange={this.handleChange('email')}
                    />
                    <TextField
                        margin='dense'
                        label='password'
                        type='password'
                        fullWidth
                        onChange={this.handleChange('password')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>Cancel</Button>
                    <Button color='primary' onClick={this.props.handleUpdateReader({
                        id: this.props.reader && this.props.reader.id,
                        email: this.state.updateReader.email,
                        password: this.state.updateReader.password,
                    })}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}