import React from "react";
import {TopBar} from "../components/TopBar";
import MessageDialog from '../components/messageDialog'
import ReserveDialog from "./components/reserveDialog";
import BookList from "./components/bookList";
import {serverReader} from "../../../mock/config";
import * as intl from "react-intl-universal";

export default class SearchedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookList: [],
            keywords: undefined,
            openReserve: undefined,
            loginUser: undefined,
            returnMessage: undefined,
            reserveStatus: undefined,
        };
    };

    componentDidMount() {
        this.handleSearch();
    }


    handleSearch = () => {
        fetch(`${serverReader}/searchBooks?keywords=${this.props.match.params.keywords}`)
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    bookList: result.books,
                });
            })
            .catch(e => alert(e));
    };

    reserveBook = () => {
        if (this.state.reserveStatus === 1) {
            let updatedBookList = this.state.bookList;
            for (let i in updatedBookList) {
                if (updatedBookList[i].isbn === this.state.openReserve.isbn) {
                    updatedBookList[i].remain -= 1;
                    break;
                }
            }
            this.setState({
                reserveStatus: undefined,
                openReserve: undefined,
                bookList: updatedBookList,
                returnMessage: intl.get('basic.success')
            })
        }
        if (this.state.reserveStatus === -1) {
            this.setState({
                reserveStatus: undefined,
                openReserve: undefined,
                returnMessage: intl.get('reader.searched.cannotBorrow'),
            });
        }
        if (this.state.reserveStatus === 0) {
            this.setState({
                reserveStatus: undefined,
                openReserve: undefined,
                returnMessage: intl.get('basic.failed')
            })
        }
    };

    handleReserve = book => () => {
        fetch(`${serverReader}/reader/reserveBook`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.match.params.loginUser,
                isbn: book.isbn,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({reserveStatus: result.state});
            })
            .catch(e => alert(e));
    };

    handleOpen = (which, value) => () => {
        this.setState({[which]: value});
    };

    handleClose = which => () => {
        if (which === "returnMessage" || which === "openReserve")
            this.setState({[which]: undefined});
        else
            this.setState({[which]: false});
    };

    render() {
        this.reserveBook();

        return (
            <div>
                <TopBar searchBar loginUser={this.props.match.params.loginUser}/>
                <div style={{marginTop: 30}}>
                    {
                        this.state.bookList ?
                            <BookList
                                bookList={this.state.bookList}
                                handleOpen={this.handleOpen}
                            /> :
                            <div>
                                No books founded.
                            </div>
                    }
                    <ReserveDialog
                        handleClose={this.handleClose("openReserve")}
                        handleReserve={this.handleReserve}
                        open={this.state.openReserve !== undefined}
                        book={this.state.openReserve}
                    />
                    <MessageDialog
                        handleClose={this.handleClose("returnMessage")}
                        open={this.state.returnMessage !== undefined}
                        message={this.state.returnMessage}
                    />
                </div>
            </div>
        );
    }
}