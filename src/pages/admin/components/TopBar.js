import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Notifications, History, ExitToApp, Home } from '@material-ui/icons'
import {Link} from "react-router-dom";
import { PeopleOutlined, DescriptionOutlined } from "@material-ui/icons"
import Button from "@material-ui/core/Button/Button";


const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 12,
        // fontSize: 20
    },
    title: {
        marginLeft: 10,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    toolbar: theme.mixins.toolbar,
});

class PrimarySearchAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: undefined,
            bookList: [],
            value: 0,
        }
    }

    handleLogout = () => {
        fetch('/admin/logout').catch(e => alert(e));
        window.location.href = '/';
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        {/*<IconButton*/}
                            {/*className={classes.menuButton}*/}
                            {/*color="inherit"*/}
                            {/*component={Link} to='/admin'*/}
                        {/*>*/}
                            {/*<Home />*/}
                        {/*</IconButton>*/}
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            Bibliosoft
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Button
                                color="inherit"
                                component={Link} to='/admin'
                                style={{textTransform: 'none'}}
                            >
                                <PeopleOutlined
                                    style={{marginRight: 5}}
                                />
                                Manage Librarians
                            </Button>
                            <Button
                                color="inherit"
                                component={Link} to='/admin/manageRules'
                                style={{textTransform: 'none'}}
                            >
                                <DescriptionOutlined
                                    style={{marginRight: 5}}
                                />
                                Manage Library Rules
                            </Button>
                            <IconButton
                                color="inherit"
                                onClick={this.handleLogout}
                            >
                                <ExitToApp />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const TopBar = withStyles(styles)(PrimarySearchAppBar);

export { TopBar }
