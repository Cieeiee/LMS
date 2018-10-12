import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import { AppBar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './reader.scss'
import { TopButton } from "./components/TopButton";
import { TopBar } from "./components/TopBar";
import {OneBook} from "../../components/OneBook";

const Logo = require('./logo.jpg');
const Book = require('../../components/alive.jpeg');

export default class Reader extends React.Component {
    constructor(props) {
        super(props);
        // added for test
        this.alive = {
            isbn: "9787506355957",
            title: "To live",
            author: "Yu Hua",
            introduction: "The book 'To Live' narrates the life stories of a country man called Fu Gui. He was born into a very rich family but he loved gambling. Eventually, he lost all his possessions and became poor. His father died after knowing this, while his mother became seriously ill. Fu Gui went to find a doctor but was forced to join the army on the way. Many years later, after many trials and hardships, Fu Gui went back home and found his mother had passed away while his wife had brought up his son and daughter on her own. Unfortunately, misfortune struck this family again. Fu Gui's wife, son, daughter and grandson died one by one. It was only Fu Gui and an old bull who remained alive. Despite all, Fu Gui was still braver, calmer and more alive than ever.",
            location: "11-111-11",
            remain: 2,
            total: 5,
            price: 12.01,
            picture: Book,
        };

        this.state = {
            bookList: [
                this.alive,
                this.alive,
                this.alive,
                this.alive,
                this.alive,
                this.alive,
                this.alive,
                this.alive,
            ],
            keywords: null
        };
    };

    handleChange = e => {
        this.setState({
            keywords: e.target.value
        })
    };

    handleSearch = () => {
        fetch('/searchBooks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: this.state.keywords,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    bookList: result.books,
                });
            })
            .catch(e => alert(e));
    };

    render() {
        return (
            <div style={{height: '100%'}}>
                {this.state.bookList === null || this.state.bookList === [] ?
                <div style={{height: '100%'}}>
                    <TopButton />
                    <div className='reader-page'>
                        <div className='bg' style={{backgroundImage: `url(${Logo})`}} />
                        <TextField
                            label='search'
                            variant='outlined'
                            style={{width: 600, margin: '30px 0'}}
                            value={this.state.keywords}
                            onChange={this.handleChange}
                        />
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={this.handleSearch}
                        >
                            search
                        </Button>
                    </div>
                </div> :
                <SearchedPage bookList={this.state.bookList}/>}
            </div>
        );
    }

}

class SearchedPage extends React.Component {
    constructor(props) {
        super(props);

    };

    handleSearch = (keywords) => {
        fetch('/searchBooks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: keywords,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    bookList: result.books,
                });
            })
            .catch(e => alert(e));
    };

    render() {
        const BookList = this.props.bookList.map(book =>
            <Grid item xs={6}><OneBook book={book}/></Grid>
        );

        return (
            <div>
                <TopBar/>
                <div className="grow">
                    <Grid container spacing={24}>
                        {BookList}
                    </Grid>
                </div>
            </div>
        );
    }
}
