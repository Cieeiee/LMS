import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newBook: {},
            img: null,
        }
    }

    handleChange = name => e => this.setState({newBook: {...this.state.newBook, [name]: e.target.value}})

    handleImg = e => this.setState({img: e.target.files[0]})

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.addBook')}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label={intl.get('form.image')}
                        fullWidth
                        type='file'
                        accept="image/*"
                        onChange={this.handleImg}
                    />
                    <TextField
                        margin='dense'
                        label='ISBN'
                        fullWidth
                        onChange={this.handleChange('isbn')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.title')}
                        fullWidth
                        onChange={this.handleChange('title')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.author')}
                        fullWidth
                        onChange={this.handleChange('author')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.category')}
                        fullWidth
                        onChange={this.handleChange('category')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.location')}
                        fullWidth
                        onChange={this.handleChange('location')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.price')}
                        type='number'
                        fullWidth
                        onChange={this.handleChange('price')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.number')}
                        type='number'
                        fullWidth
                        onChange={this.handleChange('number')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.introduction')}
                        fullWidth
                        multiline
                        onChange={this.handleChange('introduction')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        disabled={!(
                            this.state.newBook.isbn &&
                            this.state.newBook.title &&
                            this.state.newBook.author &&
                            this.state.newBook.category &&
                            this.state.newBook.introduction &&
                            this.state.newBook.location &&
                            this.state.newBook.price &&
                            this.state.newBook.number
                        )}
                        color='primary'
                        onClick={this.props.handleAddBook(this.state.img, this.state.newBook)}
                    >{intl.get('form.confirm')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}