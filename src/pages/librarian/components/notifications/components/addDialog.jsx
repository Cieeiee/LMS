import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
        }
    }

    handleChange = e => {this.setState({message: e.target.value})}

    render() {
        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add a notification</DialogTitle>
                <DialogContent>
                    <TextField
                        error={this.props.formError === "messageEmpty"}
                        margin="normal"
                        id="name"
                        label={this.props.formError === "messageEmpty" ? "The message can not be empty" : "message"}
                        fullWidth
                        multiline
                        value={this.state.message}
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.handleAdd(this.state.message)} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}