import React from "react";
import {Grid} from "@material-ui/core";
import {OneBook} from "./OneBook";
import {TopBar} from "../components/TopBar";
import MessageDialog from '../components/messageDialog'
import ReserveDialog from "./reserveDialog";

const Alive = require('../components/images/alive.jpeg');

export default class SearchedPage extends React.Component {
    constructor(props) {
        super(props);

        this.alive = {
            isbn: "9787506355957",
            title: "To live",
            author: "Yu Hua",
            introduction: "The book 'To Live' narrates the life stories of a country man called Fu Gui. He was born into a very rich family but he loved gambling. Eventually, he lost all his possessions and became poor. His father died after knowing this, while his mother became seriously ill. Fu Gui went to find a doctor but was forced to join the army on the way. Many years later, after many trials and hardships, Fu Gui went back home and found his mother had passed away while his wife had brought up his son and daughter on her own. Unfortunately, misfortune struck this family again. Fu Gui's wife, son, daughter and grandson died one by one. It was only Fu Gui and an old bull who remained alive. Despite all, Fu Gui was still braver, calmer and more alive than ever.",
            location: "11-111-11",
            remain: 2,
            total: 5,
            price: 12.01,
            picture: Alive,
        };

        this.alive1 = {
            isbn: "9787506355957",
            title: "To live",
            author: "Yu Hua",
            introduction: "",
            location: "11-111-11",
            remain: 2,
            total: 5,
            price: 12.01,
            picture: Alive,
        };

        this.state = {
            bookList: [
                this.alive,
                this.alive,
                this.alive1,
                this.alive,
                this.alive1,
                this.alive,
                this.alive,
                this.alive1,
            ],
            keywords: undefined,
            openReserve: undefined,
            loginUser: undefined,
            returnMessage: undefined,
        };
    };

    componentDidMount() {
        this.setState({
            keywords: this.props.match.params.keywords,
            loginUser: this.props.match.params.loginUser,
        });
        this.handleSearch();
    }


    handleSearch = () => {
        fetch(`/searchBooks?keywords=${this.state.keywords}`)
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    bookList: result.books,
                });
            })
            .catch(e => alert(e));
    };

    handleReserve = book => () => {
        this.handleClose("openReserve")();

        let status = 0;
        fetch('/reader/reserveBook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.loginUser,
                isbn: book.isbn,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                status = result.state
            })
            .catch(e => alert(e));


        if (status === 1) {
            let updatedBookList = this.state.bookList;
            for (let i in updatedBookList) {
                if (updatedBookList[i].isbn === book.isbn) {
                    updatedBookList[i].remain -= 1;
                    break;
                }
            }
            this.setState({
                bookList: updatedBookList,
                returnMessage: "Reserve successfully."
            })
        }
        else if (status === -1) {
            this.setState({
                returnMessage: "You can not borrow more books now.",
            });
        }
        else {
            this.setState({
                returnMessage: "Reserve failed."
            })
        }
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
        const BookList = this.state.bookList.map(book =>
            <Grid item xs={6}>
                <OneBook
                    key={book.isbn}
                    book={book}
                    handleOpen={this.handleOpen}
                />
            </Grid>
        );

        return (
            <React.Fragment>
                <TopBar searchBar loginUser={this.state.loginUser}/>
                <div className={"flex-col"}
                    style={{
                        marginTop: 30,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                >
                    <div className="grow">
                        <Grid container spacing={24}>
                            {BookList}
                        </Grid>
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