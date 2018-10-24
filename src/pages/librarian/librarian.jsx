import { AppBar, Button, Toolbar, Snackbar } from '@material-ui/core';
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
    fetchNotification
} from './../../mock/index';
import Books from './components/books/books.jsx';
import Details from './components/books/details.jsx';
import BookHistory from './components/books/bookHistory.jsx'
import Confirm from './components/confirm/confirm.jsx';
import Nav from './components/nav/nav.jsx';
import Readers from './components/readers/readers.jsx';
import './librarian.scss';
import TopBar from './components/nav/TopBar';
import LibrarianNotifications from "./components/notifications/notifications";

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
      searchTerm: ''
    }
  }
  handleOpen = (barcode, title) => () => this.setState({open: true, barcode, title})
  handleClose = () => this.setState({open: false})
  handleSnackClose = () => this.setState({snackOpen: false})
  handleClick = index => this.setState({type: index})
  handleSearch = e => this.setState({searchTerm: e.target.value})
  
  handleDetail = isbn => async () => {
    const book = await fetchDetails(isbn)
    this.setState({type: 4, book})
  }
  handleAddBook = newBook => async () => {
    const eventState = await fetchAddBook(newBook)
    this.setState({
      open: false,
      type: 0,
      snackOpen: true,
      eventState
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
  handleAddReader = info => async () => {
    const eventState =  await fetchAddReader(info)
    const readers = await fetchReaderList()
    this.setState({
      snackOpen: true,
      eventState,
      readers
    })
  }
  async componentDidMount() {
    const list = await fetchBookList()
    const readers = await fetchReaderList()
    const bookHistory = await fetchBookHistory()
      this.setState({list, readers, bookHistory})
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        <TopBar id={this.props.match.params.id} handleSearch={this.handleSearch} whichTab={this.state.type}/>
        <div style={{height: '100%', width: '100%', display: 'flex'}}>
          <div>
            {Nav({ type: this.state.type, handleClick: this.handleClick })}
          </div>
          <div style={{flexGrow: 1}}>
          {this.state.type === 0 && Books({ 
            list: this.state.list, 
            searchTerm: this.state.searchTerm, 
            handleDetail: this.handleDetail, 
            handleOpen: this.handleOpen 
          })}
          {this.state.type === 1 && <Readers list={this.state.readers}
                                             handleAddReader={this.handleAddReader}
                                             searchTerm={this.state.searchTerm}/>}
          {this.state.type === 2 && BookHistory({list: this.state.bookHistory})}
          {this.state.type === 3 && <LibrarianNotifications/>}
          {this.state.type === 4 && Details({ book: this.state.book, handleOpen: this.handleOpen })}
          </div>
        </div>
        <Confirm
          libid={this.props.match.params.id}
          barcode={this.state.barcode}
          title={this.state.title}
          open={this.state.open}
          handleClose={this.handleClose}
          handleDelete={this.handleDelete}
          handleBorrow={this.handleBorrow}
          handleAddBook={this.handleAddBook}
        />
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