import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons'
import {Link} from "react-router-dom";
import { PeopleOutlined, DescriptionOutlined, SettingsOutlined } from "@material-ui/icons"
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import PasswordDialog from "./passwordDialog";
import MessageDialog from "./messageDialog";
import * as intl from "react-intl-universal";
import {fetchAdminChangePassword} from "../../../mock";

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
            anchorEl: null,
            openMenu: false,
            openChangePassword: false,
            formError: undefined,
            oldPassword: undefined,
            password: undefined,
            confirmPassword: undefined,
            returnMessage: undefined,
        }
    }

    handleOpen = which => event => {
        this.setState({
            anchorEl: event.currentTarget,
            formError: undefined,
            [which]: true,
            processing: false,
            oldPassword: undefined,
            password: undefined,
            confirmPassword: undefined,
        })
    }
    handleClose = which => () => {
        this.setState({
            anchorEl: null,
            [which]: false
        })
    }
    handleChange = which => e => {
        this.setState({
            [which]: e.target.value
        })
    }
    clearFormError = () => {
        this.setState({formError: undefined})
    }
    handleChangePassword = async () => {
        if (this.state.oldPassword === undefined || this.state.oldPassword.length === 0) {
            this.setState({formError: "oldPasswordEmpty"});
            return;
        }
        if (this.state.password === undefined || this.state.password.length === 0) {
            this.setState({formError: "passwordEmpty"});
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({formError: "passwordNotSame"});
            return;
        }
        await this.setState({processing: true})
        const eventState = await fetchAdminChangePassword(this.state.oldPassword, this.state.password)
        let returnMessage = '';
        switch (eventState) {
            case -1:
                returnMessage = intl.get('message.oldPasswordError')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }

        this.setState({
            openChangePassword: false,
            returnMessage
        });

    }
    handleLanguage = (which) => () => {
        window.location.search = `?lang=${which}`;
        this.handleClose("openMenu")();
    }

    handleLogout = () => {
        // fetch(`${serverAdmin}/admin/logout`).catch(e => alert(e));
        window.location.href = `/reader/guest${this.props.lang}`;
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            color="inherit"
                            className={classes.menuButton}
                            onClick={this.handleOpen("openMenu")}
                        >
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
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                color="inherit"
                                style={{textTransform: 'none'}}
                                onClick={this.handleOpen("openChangePassword")}
                            >
                                <SettingsOutlined/>
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component={Link} to={`/admin${this.props.lang}`}
                                style={{textTransform: 'none'}}
                            >
                                <PeopleOutlined/>
                            </IconButton>
                            <IconButton
                                color="inherit"
                                component={Link} to={`/admin/manageRules${this.props.lang}`}
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
                <PasswordDialog
                    handleClose={this.handleClose("openChangePassword")}
                    handleChangePassword={this.handleChangePassword}
                    handleChange={this.handleChange}
                    clearFormError={this.clearFormError}
                    oldPassword={this.state.oldPassword}
                    password={this.state.password}
                    confrimPassword={this.state.confirmPassword}
                    formError={this.state.formError}
                    open={this.state.openChangePassword}
                    processing={this.state.processing}
                />
                <MessageDialog
                    handleClose={this.handleClose("returnMessage")}
                    open={Boolean(this.state.returnMessage)}
                    message={this.state.returnMessage}
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
