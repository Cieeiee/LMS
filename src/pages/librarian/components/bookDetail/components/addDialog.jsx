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
            number: undefined,
            init: false
        }
    }

    handleChange = name => e => this.setState({[name]: e.target.value})
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                number: undefined,
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                number: undefined,
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
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.addBook')}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label={intl.get('form.number')}
                        fullWidth
                        value={this.state.number}
                        onChange={this.handleChange("number")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        color='primary'
                        onClick={this.props.handleAdd({
                            isbn: this.props.isbn,
                            number: this.state.number,
                        })}
                        disabled={this.props.processing}
                    >{intl.get('form.confirm')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}