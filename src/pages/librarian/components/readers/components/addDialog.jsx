import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newReader: {},
        }
    }

    handleChange = name => e => this.setState({newReader: {...this.state.newReader, [name]: e.target.value}})

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
            >
                <DialogTitle>Add Reader</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='ID'
                        fullWidth
                        onChange={this.handleChange('id')}
                    />
                    <TextField
                        margin='dense'
                        label='password'
                        type='password'
                        fullWidth
                        onChange={this.handleChange('password')}
                    />
                    <TextField
                        margin='dense'
                        label='email'
                        type='email'
                        fullWidth
                        onChange={this.handleChange('email')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>Cancel</Button>
                    <Button color='primary' onClick={this.props.handleAddReader(this.state.newReader)}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}