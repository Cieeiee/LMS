import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {TextField, InputAdornment} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as intl from "react-intl-universal";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { fetchSearchIsbn } from './../../../../../mock/index';

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newBook: {},
            category: '',
            img: null,
            init: false,
            isFilled: false
        }
    }

    handleIsbn = isbn => async () => {
      let data = await fetchSearchIsbn(isbn)
      data.isbn = isbn
      this.setState({ newBook: data, isFilled: true })
    }

    handleChange = name => e => this.setState({newBook: {...this.state.newBook, [name]: e.target.value}})
    handleChangeSelect = event => {this.setState({
        category: event.target.value,
        newBook: {...this.state.newBook, category: event.target.value}
        })
    }
    handleImg = e => this.setState({img: e.target.files[0]})
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                newBook: {},
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                newBook: {},
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
                        margin='dense'
                        label={intl.get('form.image')}
                        fullWidth
                        type='file'
                        accept="image/*"
                        onChange={this.handleImg}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin='dense'
                        label='ISBN'
                        fullWidth
                        value={this.state.newBook.isbn}
                        onChange={this.handleChange('isbn')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Button 
                                color='primary' 
                                onClick={this.handleIsbn(this.state.newBook.isbn)}
                                disabled={!this.state.newBook.isbn}
                              >
                                {intl.get('reader.home.search')}
                              </Button>
                            </InputAdornment>
                          )
                        }}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.title')}
                        fullWidth
                        value={this.state.newBook.title}
                        onChange={this.handleChange('title')}
                        InputLabelProps={{
                          shrink: this.state.isFilled,
                      }}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.author')}
                        fullWidth
                        value={this.state.newBook.author}
                        onChange={this.handleChange('author')}
                        InputLabelProps={{
                          shrink: this.state.isFilled,
                      }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>{intl.get('form.category')}</InputLabel>
                        <Select
                            value={this.state.category}
                            onChange={this.handleChangeSelect}
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
                        label={intl.get('form.location')}
                        fullWidth
                        value={this.state.newBook.location}
                        onChange={this.handleChange('location')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.price')}
                        type='number'
                        fullWidth
                        value={this.state.newBook.price}
                        onChange={this.handleChange('price')}
                        InputLabelProps={{
                          shrink: this.state.isFilled,
                      }}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.number')}
                        type='number'
                        fullWidth
                        value={this.state.newBook.number}
                        onChange={this.handleChange('number')}
                    />
                    <TextField
                        margin='dense'
                        label={intl.get('form.introduction')}
                        fullWidth
                        multiline
                        value={this.state.newBook.introduction}
                        onChange={this.handleChange('introduction')}
                        InputLabelProps={{
                          shrink: this.state.isFilled,
                      }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        disabled={!(
                            this.state.newBook.isbn &&
                            this.state.newBook.title &&
                            this.state.newBook.author &&
                            this.state.category &&
                            this.state.newBook.introduction &&
                            this.state.newBook.location &&
                            this.state.newBook.price &&
                            this.state.newBook.number &&
                            this.state.newBook.number !== '0' &&
                            this.state.newBook.number
                        ) || this.props.processing}
                        color='primary'
                        onClick={this.props.handleAddBook(this.state.img, this.state.newBook)}
                    >{intl.get('form.confirm')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}