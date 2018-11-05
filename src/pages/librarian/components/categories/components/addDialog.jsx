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
            newCategory: {},
            init: false,
        }
    }

    handleChange = name => e => {this.setState({
        newCategory: {
            ...this.state.newCategory,
            [name]: e.target.value
        }
    })}
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                newCategory: {},
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                newCategory: {},
                init: false
            })
        }
    }

    render() {
        this.handleInit()

        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.addCategory')}</DialogTitle>
                <DialogContent>
                    <TextField
                        error={this.props.formError === "enEmpty"}
                        margin="normal"
                        label={this.props.formError === "enEmpty" ?
                            intl.get('form.enEmpty') : intl.get('form.English')}
                        fullWidth
                        multiline
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange("en")}
                    />
                    <TextField
                        error={this.props.formError === "zhEmpty"}
                        margin="normal"
                        label={this.props.formError === "zhEmpty" ?
                            intl.get('form.zhEmpty') : intl.get('form.Chinese')}
                        fullWidth
                        multiline
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange("zh")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        {intl.get('form.cancel')}
                    </Button>
                    <Button
                        onClick={this.props.handleAdd(this.state.newCategory.en, this.state.newCategory.zh)}
                        color="primary"
                    >
                        {intl.get('form.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}