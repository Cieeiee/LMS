import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import * as intl from "react-intl-universal";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";

export default class UpdateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateBook: {},
            init: false,
            category: undefined,
        }
    }

    handleChange = name => e => this.setState({updateBook: {...this.state.updateBook, [name]: e.target.value}})
    handleChangeSelect = event => {this.setState({
        category: event.target.value,
        updateBook: {...this.state.updateBook, category: this.state.category}})
    }
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                updateBook: {
                    isbn: this.props.book.isbn,
                    title: this.props.book.title,
                    author: this.props.book.author,
                    category: this.props.book.category,
                    introduction: this.props.book.introduction,
                    price: this.props.book.price,
                },
                category: this.props.book.category,
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                updateBook: {},
                init: false
            })
        }
    };

    render() {
        this.handleInit();

        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.updateBook')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label={intl.get('form.title')}
                        fullWidth
                        defaultValue={this.props.book && this.props.book.title}
                        onChange={this.handleChange('title')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.author')}
                        fullWidth
                        defaultValue={this.props.book && this.props.book.author}
                        onChange={this.handleChange('author')}
                    />
                    <FormControl fullWidth>
                        <InputLabel>{intl.get('form.category')}</InputLabel>
                        <Select
                            onChange={this.handleChangeSelect}
                            value={this.state.category}
                        >
                            { intl.getInitOptions().currentLocale === 'en-US' ?
                                this.props.categories.map(category =>
                                    <MenuItem value={category.categoryEn}>{category.categoryEn}</MenuItem>
                                ) :
                                this.props.categories.map(category =>
                                    <MenuItem value={category.categoryEn}>{category.categoryCh}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        margin='dense'
                        label={intl.get('form.price')}
                        type='number'
                        fullWidth
                        defaultValue={this.props.book && this.props.book.price}
                        onChange={this.handleChange('price')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.introduction')}
                        multiline
                        fullWidth
                        defaultValue={this.props.book && this.props.book.introduction}
                        onChange={this.handleChange('introduction')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        disabled={!(
                            this.state.updateBook.title &&
                            this.state.updateBook.author &&
                            this.state.updateBook.category &&
                            this.state.updateBook.introduction &&
                            this.state.updateBook.price
                        ) || this.props.processing}
                        color='primary'
                        onClick={this.props.handleUpdateBook(this.state.updateBook)}
                    >{intl.get('form.confirm')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}