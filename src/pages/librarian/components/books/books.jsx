import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { BuildOutlined } from '@material-ui/icons';
import React from 'react';
import {withStyles} from '@material-ui/core';
import '../../librarian.scss'
import blue from "@material-ui/core/es/colors/blue";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import {Link} from "react-router-dom";
import {fetchAddBook, fetchBookList, fetchDownload, fetchShowCategories, fetchUpdateBook} from "../../../../mock";
import AddDialog from "./components/addDialog";
import UpdateDialog from "./components/updateDialog";
import MessageDialog from "../messageDialog";
import BarcodeDialog from "./components/barcodeDialog";
import * as intl from "react-intl-universal";

const isSearched = searchTerm => item =>
    item.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.author.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.category.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.isbn.indexOf(searchTerm) === 0 ||
    item.location.includes(searchTerm)

class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookList: [],
            categories: [],
            searchTerm: '',
            openAdd: false,
            openUpdate: false,
            openBarcode: false,
            item: undefined,
            barcodeImages: undefined,
            returnMessage: undefined,
            openSnack: false,
            processing: false,
        }
    }

    handleSearch = e => this.setState({searchTerm: e.target.value});
    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item,
            processing: false
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
    handleAddBook = (img, newBook) => async () => {
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
            book["categoryCh"] = categories.find(which => which.categoryEn === book.category).categoryCh
            _bookList.push(book)
        }
        return _bookList
    }

    async componentDidMount() {
        let bookList = await fetchBookList();
        const categories = await fetchShowCategories();
        bookList = this.getChinese(bookList, categories)

        this.setState({bookList, categories});
    }


    render() {
        return(
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div style={{width: '100%'}} className="flex-row">
                    <Nav loginUser={this.props.match.params.loginUser} whichFunction={"books"}/>
                    <div className="grow">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>ISBN</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.title')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.author')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.category')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.location')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.price')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.remain')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.total')}</CustomTableCell>
                                    <CustomTableCell numeric>
                                        <Button
                                            variant='outlined'
                                            color='inherit'
                                            onClick={this.handleOpen('openAdd', undefined)}
                                        >
                                            {intl.get('basic.add')}
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {typeof(this.state.bookList.filter) !== "undefined" &&
                                this.state.bookList.filter(isSearched(this.state.searchTerm)).map((item, index) =>
                                    <TableRow key={index} className="table-row">
                                        <TableCell>{item.isbn}</TableCell>
                                        <TableCell numeric>{item.title}</TableCell>
                                        <TableCell numeric>{item.author}</TableCell>
                                        <TableCell numeric>{ intl.getInitOptions().currentLocale === "zh-CN" ?
                                            item.categoryCh : item.category
                                        }
                                        </TableCell>
                                        <TableCell numeric>{item.location}</TableCell>
                                        <TableCell numeric>{item.price}</TableCell>
                                        <TableCell numeric>{item.remain}</TableCell>
                                        <TableCell numeric>{item.total}</TableCell>
                                        <TableCell numeric>
                                            <IconButton
                                                onClick={this.handleOpen('openUpdate', item)}
                                                style={{marginRight: 10}}
                                            >
                                                <BuildOutlined/>
                                            </IconButton>
                                            <Button
                                                variant='outlined'
                                                component={Link}
                                                to={`/librarian/${this.props.match.params.loginUser}/books/${item.isbn}`}
                                            >
                                                {intl.get('basic.details')}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <AddDialog
                            open={this.state.openAdd}
                            handleClose={this.handleClose("openAdd")}
                            categories={this.state.categories}
                            handleAddBook={this.handleAddBook}
                            processing={this.state.processing}
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
        // fontSize: 18,
    },
}))(TableCell);

export default Books;