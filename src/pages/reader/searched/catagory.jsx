import React from "react";
import {Grid} from "@material-ui/core";
import {OneBook} from "./components/OneBook";
import {TopBar} from "../components/TopBar";
import MessageDialog from '../components/messageDialog'
import ReserveDialog from "./components/reserveDialog";
import BookList from "./components/bookList";

const Alive = require('../components/images/alive.jpeg');
const server = "http://192.168.1.100:8080";

export default class CategoryPage extends React.Component {
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
        fetch(`${server}/searchCategory?category=${this.props.match.params.category}`)
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
                returnMessage: "Reserve successfully."
            })
        }
        if (this.state.reserveStatus === -1) {
            this.setState({
                reserveStatus: undefined,
                openReserve: undefined,
                returnMessage: "You can not borrow more books now.",
            });
        }
        if (this.state.reserveStatus === 0) {
            this.setState({
                reserveStatus: undefined,
                openReserve: undefined,
                returnMessage: "There is no books can be reserved now."
            })
        }
    };

    handleReserve = book => () => {
        fetch(`${server}/reader/reserveBook`, {
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
            <React.Fragment>
                <TopBar searchBar loginUser={this.props.match.params.loginUser}/>
                <div className={"flex-col"}
                     style={{
                         marginTop: 30,
                         marginLeft: 10,
                         marginRight: 10,
                     }}
                >
                    <div className="grow">
                        <BookList
                            bookList={this.state.bookList}
                            handleOpen={this.handleOpen}
                        />
                    </div>
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
            </React.Fragment>
        );
    }
}