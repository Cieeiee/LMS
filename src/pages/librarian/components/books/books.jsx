import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { BuildOutlined } from '@material-ui/icons';
import React from 'react';
import {withStyles} from '@material-ui/core';
import '../../librarian.scss'
import blue from "@material-ui/core/es/colors/blue";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import {Link} from "react-router-dom";
import {fetchAddBook, fetchBookList, fetchDownload, fetchUpdateBook} from "../../../../mock";
import AddDialog from "./components/addDialog";
import UpdateDialog from "./components/updateDialog";
import MessageDialog from "../messageDialog";
import BarcodeDialog from "./components/barcodeDialog";
import * as intl from "react-intl-universal";

const isSearched = searchTerm => item =>
    item.title.toUpperCase().includes(searchTerm.toUpperCase())

class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookList: [],
            searchTerm: '',
            openAdd: false,
            openUpdate: false,
            openBarcode: false,
            item: undefined,
            barcodeImages: undefined,
            returnMessage: undefined,
            eventState: false,
            openSnack: false,
        }
    }

    handleSearch = e => this.setState({searchTerm: e.target.value});
    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item
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
        let data = new FormData()
        data.append('file', img)
        data.append('data', JSON.stringify(newBook))
        const res = await fetchAddBook(data)
        const bookList = await fetchBookList()

        for(let x of res) {
            fetchDownload(x);
        }
        this.setState({
            eventState: true,
            openAdd: false,
            openBarcode: true,
            openSnack: true,
            barcodeImages: res,
            bookList
        })
    }
    handleUpdateBook = updateBook => async () => {
        const eventState = await fetchUpdateBook(updateBook)
        const bookList = await fetchBookList()

        this.setState({
            eventState,
            openUpdate: false,
            openSnack: true,
            bookList,
        })
    }

    async componentDidMount() {
        const bookList = await fetchBookList();
        this.setState({bookList});
    }


    render() {
        return(
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div style={{width: '100%'}} className="flex-row">
                    {Nav({loginUser: this.props.match.params.loginUser, whichFunction: "books"})}
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
                                        <TableCell numeric>{item.category}</TableCell>
                                        <TableCell numeric>{item.location}</TableCell>
                                        <TableCell numeric>{item.price}</TableCell>
                                        <TableCell numeric>{item.remain}</TableCell>
                                        <TableCell numeric>{item.total}</TableCell>
                                        <TableCell numeric>
                                            <IconButton onClick={this.handleOpen('openUpdate', item)}>
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
                            handleAddBook={this.handleAddBook}
                        />
                        <BarcodeDialog
                            open={this.state.openBarcode}
                            handleClose={this.handleClose("openBarcode")}
                            barcodeImages={this.state.barcodeImages}
                        />
                        <UpdateDialog
                            open={this.state.openUpdate}
                            handleClose={this.handleClose("openUpdate")}
                            handleUpdateBook={this.handleUpdateBook}
                            book={this.state.item}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("openSnack")}
                            open={this.state.openSnack}
                            message={this.state.returnMessage}
                            eventState={this.state.eventState}
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