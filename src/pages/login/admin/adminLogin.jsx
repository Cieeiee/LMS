import React from "react";
import {Button, Paper, TextField} from "@material-ui/core";
import MessageDialog from "../components/MessageDialog";
import {fetchAdminLogin} from "../../../mock";
import IconButton from "@material-ui/core/IconButton/IconButton";
import * as intl from "react-intl-universal";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {ExitToAppOutlined} from "@material-ui/icons";

const backgroundImage = require('../../../images/library.jpg');

export default class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: undefined,
            password: undefined,

            loginStatus: undefined,
            formError: undefined,
            anchorEl: undefined
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleClose = which => () => {
        if (which === 'loginStatus')
            this.setState({[which]: undefined})
        else
            this.setState({[which]: false})
    };

    handleClearFormError = () => {
        this.setState({formError: undefined});
    };

    handleSubmit = async event => {
        event.preventDefault();

        if (this.state.account === undefined || this.state.account.length === 0) {
            this.setState({
                formError: "accountEmpty",
            });
            return;
        }

        if (this.state.password === undefined || this.state.password.length === 0) {
            this.setState({
                formError: "passwordEmpty"
            });
            return;
        }

        const loginStatus = await fetchAdminLogin(this.state.account, this.state.password)
        this.setState({loginStatus});
        if (loginStatus === 1)
            window.location.href = `/admin${this.props.location.search}`;
    };
    handleLanguage = (which) => () => {
        window.location.search = `?lang=${which}`;
        this.handleClose("openMenu")();
    }
    handleOpen = which => event => {
        this.setState({
            [which]: true,
            anchorEl: event.currentTarget
        });
    };

    render() {

        return (
            <div className='flex-col' style={{height: '100%'}}>
                <div className='admin-login-bg' style={{backgroundImage: `url(${backgroundImage})`}} />
                <div style={{margin: "10px 10px 0 10px"}} className="flex-row">
                    <IconButton
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={this.handleOpen("openMenu")}
                        style={{color: "white"}}
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
                    <div className="grow"/>
                    <IconButton
                        style={{color: 'white', margin: "auto auto"}}
                        onClick = {() => window.location.href = '/'}
                    >
                        <ExitToAppOutlined/>
                    </IconButton>
                </div>
                <div className='login-bar'>
                    <div className="login-content">
                        <div className="flex-col">
                            <h2 className='admin-login-slogan'>Welcome to Bibliosoft <br/> Library Management System</h2>
                        </div>
                        <Paper className='admin-login-paper'>
                            <TextField
                                error={this.state.formError === "accountEmpty"}
                                className='admin-login-input'
                                label={this.state.formError === "accountEmpty" ? intl.get("form.accountEmpty") : intl.get("form.account")}
                                value={this.state.account}
                                onChange={this.handleChange('account')}
                                onFocus={this.handleClearFormError}
                                margin='normal'
                            />
                            <TextField
                                error={this.state.formError === "passwordEmpty"}
                                className='admin-login-input'
                                label={this.state.formError === "passwordEmpty" ? intl.get("form.passwordEmpty") : intl.get("form.password")}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                onFocus={this.handleClearFormError}
                                type='password'
                                margin='normal'
                            />
                            <Button
                                style={{margin: '30px 50px'}}
                                className='admin-login-button'
                                variant='outlined'
                                color='secondary'
                                onClick={this.handleSubmit}
                            >
                                {intl.get("basic.login")}
                            </Button>
                        </Paper>
                    </div>
                </div>
                <MessageDialog
                    handleClose={this.handleClose("loginStatus")}
                    open={this.state.loginStatus === 0}
                    message={intl.get("message.incorrectAccountOrPassword")}
                />
            </div>
        )
    }
}