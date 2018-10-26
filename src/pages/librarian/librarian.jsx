import {Snackbar, TextField} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    fetchBookList,
    fetchBorrow,
    fetchDetails,
    fetchAddReader,
    fetchReaderList,
    fetchDeleteBook,
    fetchAddBook,
    fetchBookHistory,
    fetchUpdateBook,
    fetchNotification, fetchDownload, fetchDeleteReader
} from './../../mock/index';
import Footer from '../../mock/footer'
import Books from './components/books/books.jsx';
import Details from './components/books/details.jsx';
import BookHistory from './components/books/bookHistory.jsx'
import Confirm from './components/confirm/confirm.jsx';
import Nav from './components/nav/nav.jsx';
import Readers from './components/readers/readers.jsx';
import './librarian.scss';
import TopBar from './components/nav/TopBar';
import LibrarianNotifications from "./components/notifications/notifications";
import {fetchUpdateReader} from "../../mock";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

export default class Librarian extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [], // all books
      readers: [], // all readers
      bookHistory: [], // ..
      notifications: [],
      type: 0, // 条件渲染
      open: false, // confirm dialog
      book: {}, // book details
      barcode: null,
      title: '', // confirm type
      snackOpen: false, // snackbar
      eventState: false, // fetch response
        openBarcode: false,
      searchTerm: '',
        barcodeImages: undefined,
    }
  }
  handleReloadReader = async () => {
    const readers = await fetchReaderList()
    this.setState({readers})
  }
  handleOpen = (barcode, title) => () => this.setState({open: true, barcode, title})
  handleClose = () => this.setState({open: false})
    handleCloseBarcode = () => this.setState({openBarcode: false});
  handleSnackClose = () => this.setState({snackOpen: false})
  handleClick = index => this.setState({type: index})
  handleSearch = e => this.setState({searchTerm: e.target.value})
  
  handleUpdateBook = newBook => async () => {
    const eventState = await fetchUpdateBook(newBook)
    const book = await fetchBookList()
    this.setState({
      book,
      snackOpen: true,
      eventState
    })
  }
  handleDetail = isbn => async () => {
    const book = await fetchDetails(isbn)
    this.setState({type: 4, book})
  }
  handleAddBook = (img, newBook) => async () => {
    let data = new FormData()
    data.append('file', img)
    data.append('data', JSON.stringify(newBook))
    const res = await fetchAddBook(data)
    const list = await fetchBookList()

    // for(let x of res) {
    //   fetchDownload(x);
    // }
    this.setState({
        openBarcode: true,
      open: false,
      type: 0,
      snackOpen: true,
      eventState: true,
        barcodeImages: res,
      list
    })
  }
  handleBorrow = info => async () => {
    const eventState = await fetchBorrow(info)
    this.setState({
      open: false, 
      type: 0,
      snackOpen: true,
      eventState
    })
  }
  handleDelete = (id, barcode) => async () => {
    const eventState =  await fetchDeleteBook(id, barcode);
    const book = await fetchBookHistory();
    this.setState({
      open: false,
      type: 0,
      snackOpen: true,
      eventState,
        book
    })
  }
  handleUpdateReader = info => async () => {
    const eventState = await fetchUpdateReader(info);
    const readers = await fetchReaderList();
    this.setState({
        snackOpen: true,
        eventState,
        readers
    })
  };
  handleAddReader = info => async () => {
    const eventState =  await fetchAddReader(info)
    const readers = await fetchReaderList()
    this.setState({
      open: false,
      snackOpen: true,
      eventState,
      readers
    })
  }
    handleDeleteReader = id => async () => {
        const eventStatus = await fetchDeleteReader(id);
        const readers = await fetchReaderList()
        this.setState({
            snackOpen: true,
            eventStatus,
            readers
        })
    };

  async componentDidMount() {
    const list = await fetchBookList()
    const readers = await fetchReaderList()
    const bookHistory = await fetchBookHistory()
    this.setState({list, readers, bookHistory})
  }
  render() {
    return (
        <div className="flex-col grow">
            <TopBar id={this.props.match.params.id} handleSearch={this.handleSearch} whichTab={this.state.type}/>
            <div style={{width: '100%'}} className="flex-row grow">
              <div>
                {Nav({ type: this.state.type, handleClick: this.handleClick })}
              </div>
              <div style={{flexGrow: 1}}>
              {this.state.type === 0 && Books({
                list: this.state.list,
                searchTerm: this.state.searchTerm,
                handleDetail: this.handleDetail,
                handleOpen: this.handleOpen,
              })}
              {this.state.type === 1 &&
                <Readers
                  list={this.state.readers}
                  handleAddReader={this.handleAddReader}
                  handleReloadReader={this.handleReloadReader}
                  handleUpdateReader={this.handleUpdateReader}
                  handleDeleteReader={this.handleDeleteReader}
                  searchTerm={this.state.searchTerm}
                />}
              {this.state.type === 2 && BookHistory({ list: this.state.bookHistory })}
              {this.state.type === 3 && <LibrarianNotifications/>}
              {this.state.type === 4 && Details({ book: this.state.book, handleOpen: this.handleOpen })}
              </div>
            </div>
            <Footer />
            <Confirm
              libid={this.props.match.params.id}
              barcode={this.state.barcode}
              title={this.state.title}
              open={this.state.open}
              handleClose={this.handleClose}
              handleDelete={this.handleDelete}
              handleBorrow={this.handleBorrow}
              handleAddBook={this.handleAddBook}
              handleUpdate={this.handleUpdateBook}
            />
              <Dialog
                  fullWidth
                  open={this.state.openBarcode}
                  onClose={this.handleCloseBarcode}
                  aria-labelledby="form-dialog-title"
              >
                  <DialogTitle id="form-dialog-title">Barcodes</DialogTitle>
                  <DialogContent>
                      <div className="flex-col">
                          {this.state.barcodeImages !== undefined && this.state.barcodeImages.map(img =>
                              <img src={img} alt='' width='500px' style={{marginBottom: 40}}/>
                          )}
                      </div>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={this.handleCloseBarcode} color="primary">
                          Close
                      </Button>
                  </DialogActions>
              </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={this.state.snackOpen}
              autoHideDuration={1500}
              onClose={this.handleSnackClose}
              message={this.state.eventState? 'succeed': 'failed'}
            />
        </div>
    )
  }
}