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
                <DialogTitle id="form-dialog-title">Add a Book</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='image'
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
                        label='title'
                        fullWidth
                        onChange={this.handleChange('title')}
                    />
                    <TextField
                        margin='dense'
                        label='author'
                        fullWidth
                        onChange={this.handleChange('author')}
                    />
                    <TextField
                        margin='dense'
                        label='category'
                        fullWidth
                        onChange={this.handleChange('category')}
                    />
                    <TextField
                        margin='dense'
                        label='location'
                        fullWidth
                        onChange={this.handleChange('location')}
                    />
                    <TextField
                        margin='dense'
                        label='price'
                        type='number'
                        fullWidth
                        onChange={this.handleChange('price')}
                    />
                    <TextField
                        margin='dense'
                        label='number'
                        type='number'
                        fullWidth
                        onChange={this.handleChange('number')}
                    />
                    <TextField
                        margin='dense'
                        label='introduction'
                        fullWidth
                        multiline
                        onChange={this.handleChange('introduction')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>Cancel</Button>
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
                    >OK</Button>
                </DialogActions>
            </Dialog>
        );
    }
}