import React from 'react'
import {TextField, Button, Grid, withStyles} from '@material-ui/core'
import { AppBar } from '@material-ui/core'
import {Link, Route, BrowserRouter, Switch,} from 'react-router-dom'
import './reader.scss'
import { TopButton } from "./components/TopButton";
import { TopBar } from "./components/TopBar";
import { OneBook } from "./components/OneBook";
import ReaderHistory from "./History";
import SearchedPage from "./Searched";
import ReaderNotification from "./Notification"

const Logo = require('./logo.jpg');

export default class Reader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/reader' component={Home}/>
                    <Route path='/reader/history' component={ReaderHistory}/>
                    <Route path='/reader/search/:keywords' component={SearchedPage}/>
                    <Route path='/reader/notification' component={ReaderNotification}/>
                </Switch>
            </BrowserRouter>
        );
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keywords: undefined
        };
    };

    handleChange = e => {
        this.setState({
            keywords: e.target.value
        })
    };

    render() {
        return (
            <div style={{height: '100%'}}>
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
                            component={Link} to={'/reader/search/'+this.state.keywords}
                        >
                            search
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

}
