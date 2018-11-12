import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: undefined,
            location: '',
            init: false
        }
    }

    handleChange = name => e => this.setState({[name]: e.target.value})
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                number: undefined,
                location: '',
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                number: undefined,
                location: '',
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
                        error={this.props.formError === "numberEmpty" || this.props.formError === "numberError"}
                        margin='dense'
                        label={this.props.formError === "numberEmpty" ?
                            intl.get("form.numberEmpty") : this.props.formError === "numberError" ?
                                intl.get("form.numberError") : intl.get('form.number')}
                        fullWidth
                        value={this.state.number}
                        onChange={this.handleChange("number")}
                        onFocus={this.props.clearFormError}
                    />
                    <FormControl
                        error={this.props.formError === "locationEmpty"}
                        margin='dense'
                        fullWidth
                    >
                        <InputLabel>
                            {this.props.formError === "locationEmpty" ?
                                intl.get("form.locationEmpty") : intl.get('form.location')}
                        </InputLabel>
                        <Select
                            value={this.state.location}
                            onChange={this.handleChange("location")}
                            onFocus={this.props.clearFormError}
                        >
                            {
                                this.props.locationList &&
                                this.props.locationList.map(location =>
                                    <MenuItem value={location.location}>{location.location}</MenuItem>
                                )}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        color='primary'
                        onClick={this.props.handleAdd({
                            isbn: this.props.isbn,
                            number: this.state.number,
                            location: this.state.location
                        })}
                        disabled={this.props.processing}
                    >{intl.get('form.confirm')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}