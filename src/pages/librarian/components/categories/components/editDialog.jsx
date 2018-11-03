import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";

export default class EditDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateCategory: {},
            init: false,
        }
    }

    handleChange = name => e => {this.setState({
        updateCategory: {
            ...this.state.updateCategory,
            [name]: e.target.value
        }
    })}
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                updateCategory: this.props.category,
                init: true,
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                updateCategory: {},
                init: false,
            })
        }
    }

    render() {
        this.handleInit();

        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.updateCategory')}</DialogTitle>
                <DialogContent>
                    <TextField
                        error={this.props.formError === "enEmpty"}
                        margin="normal"
                        label={this.props.formError === "enEmpty" ?
                            intl.get('form.enEmpty') : intl.get('form.English')}
                        fullWidth
                        defaultValue={this.props.category && this.props.category.en}
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange("en")}
                    />
                    <TextField
                        error={this.props.formError === "zhEmpty"}
                        margin="normal"
                        label={this.props.formError === "zhEmpty" ?
                            intl.get('form.zhEmpty') : intl.get('form.Chinese')}
                        type="name"
                        fullWidth
                        defaultValue={this.props.category && this.props.category.zh}
                        onFocus={this.props.clearFormError}
                        onChange={this.handleChange("zh")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        {intl.get('form.cancel')}
                    </Button>
                    <Button
                        onClick={this.props.category && this.props.handleUpdate(this.props.category.en,
                            this.state.updateCategory.en, this.state.updateCategory.zh)}
                        color="primary"
                    >
                        {intl.get('form.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}