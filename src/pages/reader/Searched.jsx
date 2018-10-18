import React from "react";
import {Grid} from "@material-ui/core";
import {OneBook} from "./components/OneBook";
import {TopBar} from "./components/TopBar";

const Alive = require('./components/images/alive.jpeg');

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
            keywords: undefined
        };
    };

    componentDidMount() {
        this.setState({keywords: this.props.match.params.keywords});
        // this.handleSearch();
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

    render() {
        // !!!
        // {/*<Grid item xs={6}><OneBook book={book} readerID={this.props.location.account}/></Grid>*/}
        const BookList = this.state.bookList.map(book =>
            <Grid item xs={6}><OneBook key={book.isbn} book={book} readerID={"abc"}/></Grid>
        );

        return (
            <React.Fragment>
                <TopBar searchBar/>
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
                </div>
            </React.Fragment>
        );
    }
}