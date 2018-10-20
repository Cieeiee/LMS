import React from 'react'
import {TextField, Button} from '@material-ui/core'
import {Link, Route, BrowserRouter, Switch,} from 'react-router-dom'
import './reader.scss'
import { TopButton } from "./components/TopButton";
import ReaderHistory from "./history/History";
import SearchedPage from "./searched/Searched";
import ReaderNotification from "./notification/Notification"

const Logo = require('./components/images/logo.jpg');

export default class Reader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/reader/:loginUser' exact component={Home}/>
                    <Route path='/reader/:loginUser/history' component={ReaderHistory}/>
                    <Route path='/reader/:loginUser/search/:keywords' component={SearchedPage}/>
                    <Route path='/reader/:loginUser/notification' component={ReaderNotification}/>
                </Switch>
            </BrowserRouter>
        );
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keywords: undefined,
            loginUser: undefined,
        };
    };

    handleChange = e => {
        this.setState({
            keywords: e.target.value,
        })
    };

    componentDidMount() {
        this.setState({loginUser: this.props.match.params.loginUser});
    }

    render() {
        return (
                <div className="flex-col" style={{height: '100%'}}>
                    <TopButton loginUser={this.state.loginUser}/>
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
                            component={Link} to={`/reader/${this.state.loginUser}/search/${this.state.keywords}`}
                        >
                            search
                        </Button>
                    </div>
                </div>
        );
    }

}
