import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons'
import {Link} from "react-router-dom";
import { PeopleOutlined, DescriptionOutlined } from "@material-ui/icons"
import {serverAdmin} from "../../../mock/config";

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
        fetch(`${serverAdmin}/admin/logout`).catch(e => alert(e));
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
                            <IconButton
                                color="inherit"
                                component={Link} to={`/admin`}
                                style={{textTransform: 'none'}}
                            >
                                <PeopleOutlined/>
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component={Link} to={`/admin/manageRules`}
                                style={{textTransform: 'none'}}
                            >
                                <DescriptionOutlined/>
                            </IconButton>
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
