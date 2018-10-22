import React from "react";
import {TopBar} from "../components/TopBar";
import MessageDialog from '../components/messageDialog'
import ReserveDialog from "./components/reserveDialog";
import BookList from "./components/bookList";
import {serverReader} from "../../../mock/config";

const Alive = require('../components/images/alive.jpeg');
const alive =  {
    isbn: "9787506355957",
    title: "To live",
    author: "Yu Hua",
    introduction: "The book 'To Live' narrates the life stories of a country man called Fu Gui. He was born into a very rich family but he loved gambling. Eventually, he lost all his possessions and became poor. His father died after knowing this, while his mother became seriously ill. Fu Gui went to find a doctor but was forced to join the army on the way. Many years later, after many trials and hardships, Fu Gui went back home and found his mother had passed away while his wife had brought up his son and daughter on her own. Unfortunately, misfortune struck this family again. Fu Gui's wife, son, daughter and grandson died one by one. It was only Fu Gui and an old bull who remained alive. Despite all, Fu Gui was still braver, calmer and more alive than ever.",
    location: "11-111-11",
    remain: 2,
    total: 5,
    price: 12.01,
    picture: Alive,
    category: "novel",
};

const alive1= {
    isbn: "9787506355957",
    title: "To live",
    author: "Yu Hua",
    introduction: "",
    location: "11-111-11",
    remain: 2,
    total: 5,
    price: 12.01,
    picture: Alive,
    category: "novel",
};

export default class SearchedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // bookList: [
            //     alive,
            //     alive,
            //     alive1,
            //     alive,
            //     alive1,
            //     alive,
            //     alive,
            //     alive1,
            // ],
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
                returnMessage: "Reserve failed."
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
                        {
                            this.state.bookList !== [] ?
                                <BookList
                                    bookList={this.state.bookList}
                                    handleOpen={this.handleOpen}
                                /> :
                                <div>
                                    No books found.
                                </div>
                        }
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