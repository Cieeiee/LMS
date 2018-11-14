import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import {BuildOutlined, MoreOutlined, SmsOutlined} from '@material-ui/icons';
import React from 'react';
import {withStyles} from '@material-ui/core';
import '../../librarian.scss'
import blue from "@material-ui/core/es/colors/blue";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import {Link} from "react-router-dom";
import {
    fetchAddBook,
    fetchBookList,
    fetchDownload,
    fetchShowCategories,
    fetchShowLocations,
    fetchUpdateBook
} from "../../../../mock";
import AddDialog from "./components/addDialog";
import UpdateDialog from "./components/updateDialog";
import MessageDialog from "../messageDialog";
import BarcodeDialog from "./components/barcodeDialog";
import * as intl from "react-intl-universal";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";

const isSearched = searchTerm => item =>
    item.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.author.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.category.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.isbn.indexOf(searchTerm) === 0

class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookList: [],
            categories: [],
            locationList: [],
            searchTerm: '',
            openAdd: false,
            openUpdate: false,
            openBarcode: false,
            item: undefined,
            barcodeImages: undefined,
            returnMessage: undefined,
            formError: undefined,
            openSnack: false,
            processing: false,
            page: 0,
            rowsPerPage: 12,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    clearFormError = () => {this.setState({formError: undefined})}
    handleSearch = e => this.setState({searchTerm: e.target.value});
    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item,
            processing: false,
            formError: undefined,
        })
    };
    handleClose = (which) => () => {
        this.setState({
            [which]: false,
            item: undefined,
        })
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };
    checkISBN = (isbn) => {
        if (isbn === undefined || isbn.length === 0) {
            this.setState({formError: "isbnEmpty"})
            return false
        }
        if (!/^\d{13}$/.test(isbn)) {
            this.setState({formError: "isbnError"})
            return false
        }
        return true
    }
    handleAddBook = (img, newBook) => async () => {
        if (!img) {
            this.setState({formError: "imgEmpty"})
            return
        }
        if (newBook.isbn === undefined || newBook.isbn.length === 0) {
            this.setState({formError: "isbnEmpty"})
            return
        }
        if (newBook.isbn !== 0 && !/^\d{13}$/.test(newBook.isbn)) {
            this.setState({formError: "isbnError"})
            return
        }
        if (!newBook.title  || newBook.title.length === 0) {
            this.setState({formError: "titleEmpty"})
            return
        }
        if (!newBook.author  || newBook.author.length === 0) {
            this.setState({formError: "authorEmpty"})
            return
        }
        if (!newBook.category  || newBook.category.length === 0) {
            this.setState({formError: "categoryEmpty"})
            return
        }
        if (!newBook.introduction  || newBook.introduction.length === 0) {
            this.setState({formError: "introductionEmpty"})
            return
        }
        if (!newBook.location  || newBook.location.length === 0) {
            this.setState({formError: "locationEmpty"})
            return
        }
        if (!newBook.price  || newBook.price.length === 0) {
            this.setState({formError: "priceEmpty"})
            return
        }
        if (!/^[.\d]+$/.test(newBook.price) || /^0+/.test(newBook.price)) {
            this.setState({formError: "priceError"})
            return
        }
        if (!newBook.number  || newBook.number.length === 0) {
            this.setState({formError: "numberEmpty"})
            return
        }
        if (!/^\d+$/.test(newBook.number) || /^0+/.test(newBook.number)) {
            this.setState({formError: "numberError"})
            return
        }
        await this.setState({processing: true})
        let data = new FormData()
        data.append('file', img)
        data.append('data', JSON.stringify(newBook))
        const res = await fetchAddBook(data)
        let bookList = await fetchBookList()
        bookList = await this.getChinese(bookList, this.state.categories)
        let returnMessage = ''
        switch (res.state) {
            case -1:
                returnMessage = intl.get('message.bookExists')
                break;
            case -2:
                returnMessage = intl.get('message.pictureError')
                break;
            case -3:
                returnMessage = intl.get('message.IOError')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openAdd: false,
            returnMessage,
            bookList
        })
        if(res.state === 1) {
            this.setState({
                openBarcode: true,
                barcodeImages: res.barcode
            })
            for(let x of res.barcode) {
                fetchDownload(x);
            }
        }
    }
    handleUpdateBook = updateBook => async () => {

        if (!updateBook.title  || updateBook.title.length === 0) {
            this.setState({formError: "titleEmpty"})
            return
        }
        if (!updateBook.author  || updateBook.author.length === 0) {
            this.setState({formError: "authorEmpty"})
            return
        }
        if (!updateBook.category  || updateBook.category.length === 0) {
            this.setState({formError: "categoryEmpty"})
            return
        }
        if (!updateBook.introduction  || updateBook.introduction.length === 0) {
            this.setState({formError: "introductionEmpty"})
            return
        }
        if (!updateBook.price  || updateBook.price.length === 0) {
            this.setState({formError: "priceEmpty"})
            return
        }
        if (!/^[.\d]+$/.test(updateBook.price) || /^0+/.test(updateBook.price)) {
            this.setState({formError: "priceError"})
            return
        }
        await this.setState({processing: true})
        const eventState = await fetchUpdateBook(updateBook)
        let bookList = await fetchBookList()
        bookList = await this.getChinese(bookList, this.state.categories)
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        this.setState({
            openUpdate: false,
            bookList,
            returnMessage,
        })
    }
    getChinese = (bookList, categories) => {
        const _bookList = []
        for (let book of bookList) {
            let category = categories.find(which => which.categoryEn === book.category)
            if (category) {
                book["categoryCh"] = category.categoryCh
            }
            else {
                book["categoryCh"] = book.category
            }
            _bookList.push(book)
        }
        return _bookList
    }

    async componentDidMount() {
        let bookList = await fetchBookList();
        const categories = await fetchShowCategories();
        const locationList = await fetchShowLocations();
        bookList = this.getChinese(bookList, categories)

        this.setState({bookList, categories, locationList});
    }


    render() {
        const { bookList, rowsPerPage, page } = this.state;
        let bookListToShow = []
        if (bookList) bookListToShow = bookList.filter(isSearched(this.state.searchTerm))
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, bookListToShow.length - page * rowsPerPage);


        return(
            <div className="flex-col grow">
                <TopBar
                    loginUser={this.props.match.params.loginUser}
                    handleSearch={this.handleSearch}
                    lang={this.props.location.search}
                />
                <div style={{width: '100%'}} className="flex-row grow">
                    <Nav
                        loginUser={this.props.match.params.loginUser}
                        whichFunction={"books"}
                        lang={this.props.location.search}
                    />
                    <div className="grow">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>ISBN</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.title')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.author')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.category')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.price')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.remain')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.total')}</CustomTableCell>
                                    <CustomTableCell numeric>
                                        <Button
                                            variant='contained'
                                            style={{width: 80}}
                                            onClick={this.handleOpen('openAdd', undefined)}
                                        >
                                            {intl.get('basic.add')}
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookListToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) =>
                                    <TableRow key={index} className="table-row">
                                        <TableCell>{item.isbn}</TableCell>
                                        <TableCell numeric>{item.title}</TableCell>
                                        <TableCell numeric>{item.author}</TableCell>
                                        <TableCell numeric>{ intl.getInitOptions().currentLocale === "zh-CN" ?
                                            item.categoryCh : item.category
                                        }
                                        </TableCell>
                                        <TableCell numeric>{item.price}</TableCell>
                                        <TableCell numeric>{item.remain}</TableCell>
                                        <TableCell numeric>{item.total}</TableCell>
                                        <TableCell numeric>
                                            <IconButton
                                                onClick={this.handleOpen('openUpdate', item)}
                                            >
                                                <BuildOutlined/>
                                            </IconButton>
                                            <IconButton
                                                component={Link}
                                                to={`/librarian/${this.props.match.params.loginUser}/books/${item.isbn}`}
                                            >
                                                <SmsOutlined/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 57 * emptyRows }}>
                                        <TableCell colSpan={9} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={9}
                                        count={bookListToShow.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        rowsPerPageOptions={[12]}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationFooter}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <AddDialog
                            open={this.state.openAdd}
                            handleClose={this.handleClose("openAdd")}
                            categories={this.state.categories}
                            locationList={this.state.locationList}
                            handleAddBook={this.handleAddBook}
                            processing={this.state.processing}
                            formError={this.state.formError}
                            clearFormError={this.clearFormError}
                            checkISBN={this.checkISBN}
                        />
                        <BarcodeDialog
                            open={this.state.openBarcode}
                            handleClose={this.handleClose("openBarcode")}
                            barcodeImages={this.state.barcodeImages}
                        />
                        <UpdateDialog
                            categories={this.state.categories}
                            handleClose={this.handleClose("openUpdate")}
                            handleUpdateBook={this.handleUpdateBook}
                            open={this.state.openUpdate}
                            book={this.state.item}
                            processing={this.state.processing}
                            formError={this.state.formError}
                            clearFormError={this.clearFormError}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("openSnack")}
                            open={Boolean(this.state.returnMessage)}
                            message={this.state.returnMessage}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        fontSize: 14,
        textTransform: 'capitalize',
    },
}))(TableCell);

export default Books;