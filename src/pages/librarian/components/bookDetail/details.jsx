import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography/Typography";
import '../../librarian.scss'
import {fetchAddBookNumber, fetchBorrow, fetchDeleteBook, fetchDetails, fetchPayFine} from "../../../../mock";
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
            item: undefined,
            searchTerm: "",
            processing: false,
            barcodeImages: undefined,
            step: 0,
            formError: undefined
        }
    }

    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item,
            step: 0,
            processing: false
        })
    };
    handleClose = (which) => () => {
        this.setState({
            [which]: false,
            item: undefined,
            step: 0,
            formError: undefined
        })
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };
    clearFormError = () => {
        this.setState({formError: undefined})
    }
    handleChange = which => e => {
        this.setState({[which]: e.target.value})
    }
    handleAdd = info => async () => {
        if (info.number === undefined || info.number.length === 0) {
            this.setState({formError: "numberEmpty"})
            return
        }
        await this.setState({processing: true})
        const barcodeImages = await fetchAddBookNumber(info)

        const book = await fetchDetails(this.props.match.params.isbn);
        let returnMessage = ''
        if (barcodeImages === null)
            returnMessage = intl.get('message.systemError')
        else
            returnMessage = intl.get('message.success')

        this.setState({
            openAdd: false,
            openShowBarcodes: true,
            barcodeImages,
            returnMessage,
            book
        })
    }
    handlePayFine = info => async () => {
        if (info.barcode === undefined || info.barcode.length === 0) {
            this.setState({formError: "barcodeEmpty"})
            return
        }
        await this.setState({processing: true})
        const fine = await fetchPayFine(info)
        if (fine === -1) {
            this.setState({
                returnMessage: intl.get('message.systemError'),
                openLost: false,
                openReturn: false,
                step: 0
            })
        }
        else {
            this.setState({
                step: 1,
                processing: false,
                fine
            })
        }
    }
    handleBorrow = info => async () => {
        if (info.barcode === undefined || info.barcode.length === 0) {
            this.setState({formError: "barcodeEmpty"})
            return
        }
        if (info.type === 0 && (info.id === undefined || info.id.length === 0)) {
            this.setState({formError: "readerEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState = await fetchBorrow(info)
        const book = await fetchDetails(this.props.match.params.isbn);
        let returnMessage = ''
        switch(eventState) {
            case -1:
                returnMessage = intl.get('message.readerNotExists')
                break;
            case -2:
                returnMessage = intl.get('message.excessBorrow')
                break;
            case -3:
                returnMessage = intl.get('message.notReserver')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openBorrow: false,
            openReturn: false,
            openLost: false,
            step: 0,
            returnMessage,
            book
        })
    }
    handleDelete = (id, barcode) => async () => {
        if (barcode === undefined || barcode.length === 0) {
            this.setState({formError: "barcodeEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState =  await fetchDeleteBook(id, barcode);
        const book = await fetchDetails(this.props.match.params.isbn);
        let returnMessage = ''
        switch(eventState) {
            case -1:
                returnMessage = intl.get('message.bookStillBorrowed')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openDelete: false,
            returnMessage,
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
                    <Nav loginUser={this.props.match.params.loginUser} whichFunction={"books"}/>
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
                                    <TableCell>{intl.get('form.bookState')}</TableCell>
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
                                        <TableCell>
                                            <Typography color="textSecondary">
                                                {item.availability === 0 && intl.get("form.inLibrary")}
                                                {item.availability === 1 && intl.get("form.borrowed")}
                                                {item.availability === 2 && intl.get("form.reserved")}
                                            </Typography>
                                        </TableCell>
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
                            formError={this.state.formError}
                            clearFormError={this.clearFormError}
                        />
                        <BorrowDialog
                            open={this.state.openBorrow}
                            handleClose={this.handleClose("openBorrow")}
                            handleBorrow={this.handleBorrow}
                            barcode={this.state.item}
                            processing={this.state.processing}
                            formError={this.state.formError}
                            clearFormError={this.clearFormError}
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
                            step={this.state.step}
                            handlePayFine={this.handlePayFine}
                            fine={this.state.fine}
                        />
                        <ReturnDialog
                            open={this.state.openReturn}
                            handleClose={this.handleClose("openReturn")}
                            handleBorrow={this.handleBorrow}
                            barcode={this.state.item}
                            processing={this.state.processing}
                            step={this.state.step}
                            handlePayFine={this.handlePayFine}
                            fine={this.state.fine}
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
                            open={Boolean(this.state.returnMessage)}
                            message={this.state.returnMessage}
                        />
                    </div>
                </div>
            </div>
        )
    }
}