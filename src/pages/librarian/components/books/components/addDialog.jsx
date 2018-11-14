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
import Typography from "@material-ui/core/Typography/Typography";

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newBook: {},
            category: '',
            location: '',
            img: null,
            imgPreview: undefined,
            init: false,
            isFilled: false,
            openISBN: true,
        }
    }

    handleIsbn = isbn => async () => {
        if (!this.props.checkISBN(isbn))
            return
        let data = await fetchSearchIsbn(isbn)
        let img = await fetch(data.picture, {
            method: 'GET',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Cookie': 'bid=9UKj7i2yhGo'
            },

        })
        console.log(img)

        if (Object.prototype.isPrototypeOf(data) && Object.keys(data).length > 0) {
            data.isbn = isbn
            this.setState({ newBook: data, isFilled: true})
        }
    }
    handleOpen = which => () => {this.setState({[which]: true})}
    handleClose = which => () => {
        this.setState({
            [which]: false,
            newBook: {...this.state.newBook, isbn: 0}
        })
    }
    handleChange = name => e => this.setState({newBook: {...this.state.newBook, [name]: e.target.value}})
    handleChangeSelect = name => event => {
        this.setState({
            [name]: event.target.value,
            newBook: {...this.state.newBook, [name]: event.target.value}
        })
    }
    handleImg = e => {
        const img = e.target.files[0]
        let r = new FileReader()
        r.readAsDataURL(img)

        r.onloadend = () => {
            this.setState({
                img,
                imgName: img.name,
                imgPreview: r.result
            })
        }
    }
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                newBook: {},
                init: true,
                category: '',
                location: '',
                img: null,
                imgName: undefined,
                imgPreview: undefined,
                isFilled: false,
                openISBN: true,
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                init: false,
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
                maxWidth='md'
                fullWidth
                scroll="body"
            >
                <DialogTitle id="form-dialog-title">{intl.get('form.formTitle.addBook')}</DialogTitle>
                <DialogContent>
                    <div className="flex-row">
                        <div className="flex-col" style={{width: "40%", marginRight: 20}}>
                            <input
                                accept="image/*"
                                id="button-file"
                                style={{display: "none"}}
                                multiple
                                type="file"
                                onChange={this.handleImg}
                            />
                            <label htmlFor="button-file">
                                <TextField
                                    error={this.props.formError === "imgEmpty"}
                                    label={this.props.formError === "imgEmpty" ?
                                        intl.get('form.imgEmpty') : intl.get('form.image')}
                                    margin='dense'
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.imgName}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <Button
                                                    component="span"
                                                    color="primary"
                                                    onClick={this.props.clearFormError}
                                                >
                                                    {intl.get('form.select')}
                                                </Button>
                                            </InputAdornment>
                                        ),
                                        readOnly: true,
                                    }}
                                >
                                </TextField>
                            </label>
                            <img src={this.state.imgPreview} width="100%" alt=""/>
                        </div>
                        <div className="flex-col grow">
                            {this.state.openISBN &&
                            <TextField
                                error={this.props.formError === "isbnEmpty" || this.props.formError === "isbnError"}
                                label={this.props.formError === "isbnEmpty" ?
                                    intl.get('form.isbnEmpty') : this.props.formError === "isbnError" ?
                                        intl.get('form.isbnError') : "ISBN"}
                                onFocus={this.props.clearFormError}
                                margin='dense'
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
                            />}
                            {this.state.openISBN &&
                            <Typography
                                color="primary"
                                className="loginUser"
                                variant="caption"
                                onClick={this.handleClose("openISBN")}
                            >
                                {intl.get('form.noISBN')}
                            </Typography>}
                            <TextField
                                error={this.props.formError === "titleEmpty"}
                                label={this.props.formError === "titleEmpty" ?
                                    intl.get('form.titleEmpty') : intl.get('form.title')}
                                onFocus={this.props.clearFormError}
                                margin='dense'
                                fullWidth
                                value={this.state.newBook.title}
                                onChange={this.handleChange('title')}
                                InputLabelProps={(this.state.openISBN && this.state.isFilled) && {
                                    shrink: this.state.isFilled,
                                }}
                            />
                            <TextField
                                error={this.props.formError === "authorEmpty"}
                                label={this.props.formError === "authorEmpty" ?
                                    intl.get('form.authorEmpty') : intl.get('form.author')}
                                onFocus={this.props.clearFormError}
                                margin='dense'
                                fullWidth
                                value={this.state.newBook.author}
                                onChange={this.handleChange('author')}
                                InputLabelProps={(this.state.openISBN && this.state.isFilled) && {
                                    shrink: this.state.isFilled,
                                }}
                            />
                            <TextField
                                error={this.props.formError === "priceEmpty" || this.props.formError === "priceError"}
                                label={this.props.formError === "priceEmpty" ?
                                    intl.get('form.priceEmpty') : this.props.formError === "priceError" ?
                                        intl.get('form.priceError') : intl.get('form.price')}
                                onFocus={this.props.clearFormError}
                                margin='dense'
                                type='number'
                                fullWidth
                                value={this.state.newBook.price}
                                onChange={this.handleChange('price')}
                                InputLabelProps={(this.state.openISBN && this.state.isFilled) && {
                                    shrink: this.state.isFilled,
                                }}
                            />
                            <TextField
                                error={this.props.formError === "introductionEmpty"}
                                label={this.props.formError === "introductionEmpty" ?
                                    intl.get('form.introductionEmpty') : intl.get('form.introduction')}
                                onFocus={this.props.clearFormError}
                                margin='dense'
                                fullWidth
                                multiline
                                value={this.state.newBook.introduction}
                                onChange={this.handleChange('introduction')}
                                InputLabelProps={(this.state.openISBN && this.state.isFilled) && {
                                    shrink: this.state.isFilled,
                                }}
                            />
                            <FormControl
                                margin='dense'
                                fullWidth
                                error={this.props.formError === "categoryEmpty"}
                            >
                                <InputLabel>{this.props.formError === "categoryEmpty" ?
                                    intl.get('form.categoryEmpty') : intl.get('form.category')}</InputLabel>
                                <Select
                                    value={this.state.category}
                                    onChange={this.handleChangeSelect("category")}
                                    onFocus={this.props.clearFormError}
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
                            <FormControl
                                margin='dense'
                                fullWidth
                                error={this.props.formError === "locationEmpty"}
                            >
                                <InputLabel>{this.props.formError === "locationEmpty" ?
                                    intl.get('form.locationEmpty') : intl.get('form.location')}</InputLabel>
                                <Select
                                    value={this.state.location}
                                    onChange={this.handleChangeSelect("location")}
                                    onFocus={this.props.clearFormError}
                                >
                                    {
                                        this.props.locationList && this.props.locationList.map(location =>
                                            <MenuItem value={location.location}>{location.location}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            {/*<TextField*/}
                                {/*margin='dense'*/}
                                {/*label={intl.get('form.location')}*/}
                                {/*fullWidth*/}
                                {/*value={this.state.newBook.location}*/}
                                {/*onChange={this.handleChange('location')}*/}
                            {/*/>*/}
                            <TextField
                                error={this.props.formError === "numberEmpty" || this.props.formError === "numberError"}
                                label={this.props.formError === "numberEmpty" ?
                                    intl.get('form.numberEmpty') : this.props.formError === "numberError" ?
                                        intl.get('form.numberError') : intl.get('form.number')}
                                onFocus={this.props.clearFormError}
                                margin='dense'
                                fullWidth
                                value={this.state.newBook.number}
                                onChange={this.handleChange('number')}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        disabled={this.props.processing}
                        color='primary'
                        onClick={this.props.handleAddBook(this.state.img, this.state.newBook)}
                    >{intl.get('form.confirm')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}