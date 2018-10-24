import React from 'react'
import {TextField, Button} from '@material-ui/core'
import {Route, BrowserRouter, Switch,} from 'react-router-dom'
import './reader.scss'
import { TopButton } from "./components/TopButton";
import ReaderHistory from "./history/History";
import SearchedPage from "./searched/Searched";
import ReaderNotification from "./notification/Notification"
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import CategoryPage from "./searched/catagory";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import ApplicationFooter from "../../mock/footer";

const Logo = require('./components/images/logo.jpg');

export default class Reader extends React.Component {
    render() {
        return (
            <div style={{width: '100%'}} className="flex-col grow">
                <BrowserRouter>
                    <Switch>
                        <Route path='/reader/:loginUser' exact component={Home}/>
                        <Route path='/reader/:loginUser/history' component={ReaderHistory}/>
                        <Route path='/reader/:loginUser/search/:keywords' component={SearchedPage}/>
                        <Route path='/reader/:loginUser/category/:category' component={CategoryPage}/>
                        <Route path='/reader/:loginUser/notification' component={ReaderNotification}/>
                    </Switch>
                </BrowserRouter>
                <div className="grow"/>
                <ApplicationFooter/>
            </div>
        );
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keywords: undefined,

            openCategory: false,
        };
    };

    handleChange = e => {
        this.setState({
            keywords: e.target.value,
        })
    };

    handleOpen = which => () => {
        this.setState({[which]: true});
    };

    handleClose = which => () => {
        this.setState({[which]: false});
    };

    handleSearch = which => e => {
        if (which === "keyUp" && e.keyCode !== 13) {
            return;
        }
        if (this.state.keywords === undefined || this.state.keywords.length === 0) {
            return;
        }

        window.location.href = `/reader/${this.props.match.params.loginUser}/search/${this.state.keywords}`;
    };

    handleCategory = which => () => {
        window.location.href = `/reader/${this.props.match.params.loginUser}/category/${which}`;
    };

    render() {
        return (
                <div className="flex-col" style={{height: '100%'}}>
                    <TopButton loginUser={this.props.match.params.loginUser}/>
                    <div className='reader-page'>
                        <div className='bg' style={{backgroundImage: `url(${Logo})`}} />
                        <TextField
                            label='search'
                            variant='outlined'
                            style={{width: 600, margin: '30px 0 50px 0'}}
                            value={this.state.keywords}
                            onChange={this.handleChange}
                            onKeyUp={this.handleSearch("keyUp")}
                        />
                        <div className="flex-row" >
                            <Button
                                variant='outlined'
                                color='primary'
                                style={{marginRight: 60, width: 150}}
                                onClick={this.handleSearch("button")}
                            >
                                search
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                style={{width: 150}}
                                onMouseEnter={this.handleOpen("openCategory")}
                                buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                            >
                                Category
                            </Button>
                            <CategorySelect
                                open={this.state.openCategory}
                                handleCategory={this.handleCategory}
                                anchorEl={this.anchorEl}
                                handleClose={this.handleClose}
                            />
                        </div>
                    </div>
                </div>
        );
    }
}

function CategorySelect(props) {
    return (
        <Popper
            open={props.open}
            anchorEl={props.anchorEl}
            transition disablePortal
            onMouseLeave={props.handleClose("openCategory")}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={props.handleClose("openCategory")}>
                            <MenuList>
                                <MenuItem onClick={props.handleCategory("IT")}>IT</MenuItem>
                                <MenuItem onClick={props.handleCategory("literature")}>literature</MenuItem>
                                <MenuItem onClick={props.handleCategory("CS")}>CS</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}
