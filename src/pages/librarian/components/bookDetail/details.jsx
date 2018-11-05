import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography/Typography";
import '../../librarian.scss'
import {fetchAddBookNumber, fetchBorrow, fetchDeleteBook, fetchDetails} from "../../../../mock";
import MessageDialog from "../messageDialog";
import BorrowDialog from "./components/borrowDialog";
import DeleteDialog from "./components/deleteDialog";
import LostDialog from "./components/lostDialog";
import ReturnDialog from "./components/returnDialog";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import * as intl from "react-intl-universal";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {SearchOutlined} from "@material-ui/icons";
import AddDialog from "./components/addDialog";
import BarcodeDialog from "./components/barcodeDialog";
import ShowBarcode from "./components/showBarcode";

const isSearched = searchTerm => item =>
    item.barcode.indexOf(searchTerm) === 0;

export default class BookDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {bookClass: {}, state: []},
            openSnack: false,
            openAdd: false,
            openBorrow: false,
            openReturn: false,
            openLost: false,
            openDelete: false,
            openBarcode: false,
            openShowBarcodes: false,
            eventStatus: false,
            item: undefined,
            searchTerm: "",
            processing: false,
            barcodeImages: undefined,
        }
    }

    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item
        })
    };
    handleClose = (which) => () => {
        this.setState({
            [which]: false,
            item: undefined
        })
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };
    handleChange = which => e => {
        this.setState({[which]: e.target.value})
    }
    handleAdd = info => async () => {
        await this.setState({processing: true})
        const barcodeImages = await fetchAddBookNumber(info)

        const book = await fetchDetails(this.props.match.params.isbn);
        let eventState = undefined
        if (barcodeImages)
            eventState = true
        else
            eventState = false
        this.setState({
            openAdd: false,
            openSnack: true,
            openShowBarcodes: true,
            processing: false,
            barcodeImages,
            eventState,
            book
        })
    }
    handleBorrow = info => async () => {
        await this.setState({processing: true})
        const eventState = await fetchBorrow(info)
        const book = await fetchDetails(this.props.match.params.isbn);
        this.setState({
            processing: false,
            openBorrow: false,
            openReturn: false,
            openLost: false,
            openSnack: true,
            eventState,
            book
        })
    }
    handleDelete = (id, barcode) => async () => {
        await this.setState({processing: true})
        const eventState =  await fetchDeleteBook(id, barcode);
        const book = await fetchDetails(this.props.match.params.isbn);
        this.setState({
            processing: false,
            openDelete: false,
            openSnack: true,
            eventState,
            book
        })
    }

    async componentDidMount() {
        const book = await fetchDetails(this.props.match.params.isbn);
        this.setState({book})
    }

    render() {
        return(
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div className="flex-row">
                    {Nav({loginUser: this.props.match.params.loginUser, whichFunction: "books"})}
                    <div style={{margin: "40px auto 0 auto",width: "60%"}}>
                        <div className="flex-row">
                            <img src={this.state.book.bookClass.picture} alt='' height='400px' />
                            <div style={{marginLeft: 30}} className="flex-col">
                                <Typography variant="title" gutterBottom style={{fontSize: 40}}>
                                    {this.state.book.bookClass.title}
                                </Typography>
                                <Typography variant="p" color="textSecondary">
                                    {this.state.book.bookClass.author}
                                </Typography>
                                <div style={{marginTop: 50}} className="flex-col">
                                    <div className="flex-row">
                                        <Typography color="textSecondary" style={{marginRight: 5}}>
                                            {intl.get('form.category')}:
                                        </Typography>
                                        <Typography>
                                            {this.state.book.bookClass.category}
                                        </Typography>
                                    </div>
                                    <div className="flex-row">
                                        <Typography color="textSecondary" style={{marginRight: 5}}>
                                            {intl.get('form.location')}:
                                        </Typography>
                                        <Typography>
                                            {this.state.book.bookClass.location}
                                        </Typography>
                                    </div>
                                    <Typography color="textSecondary">
                                        {intl.get('form.introduction')}:
                                    </Typography>
                                    <Typography style={{textIndent: '2em'}}>
                                        {this.state.book.bookClass.introduction}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div className="flex-row" style={{margin: "50px auto 0 0"}}>
                            <TextField
                                placeholder={intl.get('basic.Search')}
                                value={this.state.searchTerm}
                                onChange={this.handleChange("searchTerm")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div className="grow"/>
                            <Button
                                style={{marginRight: 20, width: 100}}
                                variant="contained"
                                color="primary"
                                onClick={this.handleOpen("openAdd", this.state.book.bookClass.isbn)}
                            >
                                {intl.get('basic.add')}
                            </Button>
                        </div>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{intl.get('form.barcode')}</TableCell>
                                    <TableCell>{intl.get('form.title')}</TableCell>
                                    {/*<TableCell numeric>{intl.get('basic.borrow')}/{intl.get('basic.return')}</TableCell>*/}
                                    {/*<TableCell numeric>{intl.get('basic.delete')}</TableCell>*/}
                                    <TableCell/>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.book.state.filter(isSearched(this.state.searchTerm))
                                    .map(item =>
                                    <TableRow key={item.barcode}>
                                        <TableCell
                                            className="barcode"
                                            onClick={this.handleOpen("openBarcode", item.barcode)}
                                        >
                                            {item.barcode}
                                        </TableCell>
                                        <TableCell>{this.state.book.bookClass.title}</TableCell>
                                        <TableCell numeric>
                                            {item.availability !== 1 ?
                                                <Button
                                                    // variant='outlined'
                                                    color='primary'
                                                    onClick={this.handleOpen('openBorrow', item.barcode)}
                                                >
                                                    {intl.get('basic.borrow')}
                                                </Button>:
                                                <div>
                                                    <Button
                                                        // variant='outlined'
                                                        color='primary'
                                                        onClick={this.handleOpen('openReturn', item.barcode)}
                                                    >
                                                        {intl.get('basic.return')}
                                                    </Button>
                                                    <Button
                                                        // variant='outlined'
                                                        color='secondary'
                                                        onClick={this.handleOpen('openLost', item.barcode)}
                                                    >
                                                        {intl.get('basic.lost')}
                                                    </Button>
                                                </div>}
                                        </TableCell>
                                        <TableCell numeric>
                                            <Button
                                                // variant='outlined'
                                                color='secondary'
                                                onClick={this.handleOpen('openDelete', item.barcode)}
                                            >
                                                {intl.get('basic.delete')}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <AddDialog
                            open={this.state.openAdd}
                            handleClose={this.handleClose("openAdd")}
                            handleAdd={this.handleAdd}
                            isbn={this.state.item}
                            processing={this.state.processing}
                        />
                        <BorrowDialog
                            open={this.state.openBorrow}
                            handleClose={this.handleClose("openBorrow")}
                            handleBorrow={this.handleBorrow}
                            barcode={this.state.item}
                            processing={this.state.processing}
                        />
                        <DeleteDialog
                            open={this.state.openDelete}
                            handleClose={this.handleClose("openDelete")}
                            handleDelete={this.handleDelete}
                            libID={this.props.match.params.loginUser}
                            barcode={this.state.item}
                            processing={this.state.processing}
                        />
                        <LostDialog
                            open={this.state.openLost}
                            handleClose={this.handleClose("openLost")}
                            handleBorrow={this.handleBorrow}
                            barcode={this.state.item}
                            processing={this.state.processing}
                        />
                        <ReturnDialog
                            open={this.state.openReturn}
                            handleClose={this.handleClose("openReturn")}
                            handleBorrow={this.handleBorrow}
                            barcode={this.state.item}
                            processing={this.state.processing}
                        />
                        <BarcodeDialog
                            open={this.state.openBarcode}
                            handleClose={this.handleClose("openBarcode")}
                            barcode={this.state.item}
                        />
                        <ShowBarcode
                            open={this.state.openShowBarcodes}
                            handleClose={this.handleClose("openShowBarcodes")}
                            barcodeImages={this.state.barcodeImages}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("openSnack")}
                            open={this.state.openSnack}
                            eventState={this.state.eventState}
                            processing={this.state.processing}
                        />
                    </div>
                </div>
            </div>
        )
    }
}