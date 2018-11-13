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

export default class UpdateLocationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            init: false
        }
    }

    handleChange = name => e => this.setState({[name]: e.target.value})
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                location: this.props.copy.location,
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
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
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.updateBookLocation')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label={intl.get('form.barcode')}
                        fullWidth
                        defaultValue={this.props.copy && this.props.copy.barcode}
                        disabled
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
                        onClick={this.props.copy && this.props.handleUpdateLocation(this.props.copy.barcode, this.state.location)}
                        disabled={this.props.processing}
                    >
                        {intl.get('form.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}