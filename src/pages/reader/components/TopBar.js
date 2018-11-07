import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {
    Notifications,
    ExitToApp,
    Home,
    DescriptionOutlined,
    AccountCircleOutlined,
    MenuOutlined
} from '@material-ui/icons'
import {Link} from "react-router-dom";
import LibraryRules from "./libraryRules";
import {serverReader} from "../../../mock/config";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import * as intl from "react-intl-universal";
import {fetchShowRules} from "../../../mock";

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
        // marginLeft: 10,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 7,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 7,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 250,
            },
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
            anchorEl: null,
            openRules: false,
            openMenu: false,
        }
    }

    getAllRules = async () => {
        const result = await fetchShowRules()
        this.setState({
            deposit: result.deposit,
            fine: result.fine,
            maxReturnTime: result.maxReturnTime,
            maxReserveTime: result.maxReserveTime,
            maxBorrowNum: result.maxBorrowNum,
        });
    };

    handleLogout = () => {
        fetch(`${serverReader}/logout`).catch(e => alert(e));
        window.location.href = '/';
    };

    handleChange = e => {
        this.setState({keywords: e.target.value});
    };

    handleSearch = e => {
        if (e.keyCode !== 13)
            return;

        if (this.state.keywords === undefined || this.state.keywords.length === 0)
            return;

        window.location.href = `/reader/${this.props.loginUser}/search/${this.state.keywords}`;
    };

    handleOpen = which => event => {
        this.setState({
            [which]: true,
            anchorEl: event.currentTarget
        });
    };

    handleClose = which => () => {
        this.setState({
            [which]: false,
            anchorEl: null,
        });
    };

    handleLanguage = (which) => () => {
        window.location.search = `?lang=${which}`;
        this.handleClose("openMenu")();
    }

    componentDidMount() {
        this.getAllRules();
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            color="inherit"
                            className={classes.menuButton}
                            onClick={this.handleOpen("openMenu")}
                        >
                            <MenuOutlined/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={this.state.openMenu}
                            onClose={this.handleClose("openMenu")}
                        >
                            <MenuItem onClick={this.handleLanguage("en-US")}>
                                English
                            </MenuItem>
                            <MenuItem onClick={this.handleLanguage("zh-CN")}>
                                中文
                            </MenuItem>
                            <Divider/>
                            <MenuItem component={Link} to={`/reader/${this.props.loginUser}`}>
                                <ListItemIcon>
                                    <Home/>
                                </ListItemIcon>
                                Home
                            </MenuItem>
                        </Menu>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            Bibliosoft
                        </Typography>
                        <div className={classes.grow} />
                        {this.props.searchBar &&
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder={intl.get("basic.Search")}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={this.state.keywords}
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleSearch}
                                />
                            </div>}
                        <div className={classes.sectionDesktop}>
                            <IconButton color="inherit" onClick={this.handleOpen("openRules")}>
                                <DescriptionOutlined />
                            </IconButton>
                            <IconButton color="inherit" component={Link}
                                        to={`/reader/${this.props.loginUser}/history`}
                            >
                                <AccountCircleOutlined />
                            </IconButton>
                            <IconButton color="inherit" component={Link}
                                        to={`/reader/${this.props.loginUser}/notification`}
                            >
                                <Notifications />
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
                <LibraryRules
                    open={this.state.openRules}
                    handleClose={this.handleClose("openRules")}
                    rules={{
                        deposit: this.state.deposit,
                        fine: this.state.fine,
                        maxReturnTime: this.state.maxReturnTime,
                        maxReserveTime: this.state.maxReserveTime,
                        maxBorrowNum: this.state.maxBorrowNum,
                    }}
                />
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const TopBar = withStyles(styles)(PrimarySearchAppBar);

export { TopBar }
