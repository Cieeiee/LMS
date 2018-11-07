import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import {DescriptionOutlined, ExitToAppOutlined, MenuOutlined} from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import * as intl from "react-intl-universal";
import LibraryRules from "../../../reader/components/libraryRules";
import {fetchShowRules} from "../../../../mock";

const styles = theme => ({
    root: {
        width: '100%',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 12,
        // fontSize: 20
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        marginRight: 40,
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
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
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
        paddingLeft: theme.spacing.unit * 8,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

class SearchAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            anchorEl: null,
        }
    }

    handleLanguage = (which) => () => {
        window.location.search = `?lang=${which}`;
        this.handleClose("openMenu")();
    }
    handleOpen = which => event => {
        this.setState({
            anchorEl: event.currentTarget,
            [which]: true
        })
    }
    handleClose = which => () => {
        this.setState({
            anchorEl: null,
            [which]: false
        })
    }
    async componentDidMount() {
        const result = await fetchShowRules()
        this.setState({
            deposit: result.deposit,
            fine: result.fine,
            maxReturnTime: result.maxReturnTime,
            maxReserveTime: result.maxReserveTime,
            maxBorrowNum: result.maxBorrowNum,
        });
    }

    render() {
        const { classes, loginUser, handleSearch } = this.props;
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
                            {/*<MenuOutlined/>*/}
                            {intl.get('basic.language')}
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
                        </Menu>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            Bibliosoft
                        </Typography>
                        { ( handleSearch !== undefined ) &&
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    onChange={handleSearch}
                                    placeholder={intl.get('basic.Search')}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>}
                        <div className={classes.grow} />
                        <div style={{marginRight: 20}}>
                            {loginUser}
                        </div>
                        <IconButton
                            color="inherit" onClick={this.handleOpen("openRules")}
                        >
                            <DescriptionOutlined />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={() => window.location.href = '/'}
                        >
                            {/*{intl.get('basic.logout')}*/}
                            <ExitToAppOutlined/>
                        </IconButton>
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

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);