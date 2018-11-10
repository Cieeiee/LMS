import React from 'react'
import '../login.scss'
import { TextField, Button, Paper} from '@material-ui/core'
import FindPasswordDialog from "./findPasswordDialog";
import MessageDialog from "../components/MessageDialog";
import {serverReader, serverLibrarian} from "../../../mock/config";
import {fetchFindPassword, fetchReaderLibrarianLogin} from "../../../mock";
import IconButton from "@material-ui/core/IconButton/IconButton";
import * as intl from "react-intl-universal";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";

const backgroundImage = require('../../../images/library.jpg');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: undefined,
            password: undefined,

            loginStatus: undefined,
            findStatus: undefined,
            openFind: false,
            openMenu: false,

            ID: undefined,
            email: undefined,
            formError: undefined,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleClose = which => () => {
        if (which === "loginStatus" || which === "findStatus") {
            this.setState({[which]: undefined});
        }
        else {
            this.setState({[which]: false});
        }
    };

    handleClearFormError = () => {
        this.setState({formError: undefined});
    };

    handleOpen = which => event => {
        this.setState({
            [which]: true,
            processing: false,
            ID: undefined,
            email: undefined,
            anchorEl: event.currentTarget
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        if (this.state.account === undefined || this.state.account.length === 0) {
            this.setState({formError: "accountEmpty"});
            return;
        }

        if (this.state.password === undefined || this.state.password.length === 0) {
            this.setState({formError: "passwordEmpty"});
            return;
        }

        const loginStatus = await fetchReaderLibrarianLogin(this.state.account, this.state.password)
        this.setState({loginStatus});
        if (loginStatus === 0)
            window.location.href = '/reader/' + this.state.account;
        if (loginStatus === 1)
            window.location.href = `/librarian/${this.state.account}/books`;
    };

    handleFindPassword = async event => {
        event.preventDefault();

        if (this.state.ID === undefined) {
            this.setState({formError: "IDEmpty"});
            return;
        }
        const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!emailPattern.test(this.state.email)) {
            this.setState({formError: "emailIncorrect"});
            return;
        }
        if (this.state.email === undefined) {
            this.setState({formError: "emailEmpty"});
            return;
        }

        await this.setState({processing: true})
        const findStatus = await fetchFindPassword(this.state.ID, this.state.email)
        this.setState({
            findStatus,
            openFind: false,
        });
    };

    handleLanguage = (which) => () => {
        window.location.search = `?lang=${which}`;
        this.handleClose("openMenu")();
    }


    render() {

        return (
            <div className='flex-col' style={{height: "100%"}}>
                <div className="admin-login-bg " style={{backgroundImage: `url(${backgroundImage})`}}/>
                <div style={{margin: "10px 10px 0 10px"}}>
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
                                    label={this.state.formError === "accountEmpty" ?
                                        intl.get("form.accountEmpty") : intl.get("form.account")}
                                    value={this.state.account}
                                    onChange={this.handleChange('account')}
                                    onFocus={this.handleClearFormError}
                                    margin='normal'
                                />
                                <TextField
                                    error={this.state.formError === "passwordEmpty"}
                                    className='admin-login-input'
                                    label={this.state.formError === "passwordEmpty" ?
                                        intl.get("form.passwordEmpty") : intl.get("form.password")}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    onFocus={this.handleClearFormError}
                                    type='password'
                                    margin='normal'
                                />
                                <Button
                                    onClick={this.handleOpen("openFind")}
                                >
                                    {intl.get("basic.forgetPassword")}
                                </Button>
                                <Button
                                    className='admin-login-button'
                                    style={{margin: '20px 50px 30px 50px'}}
                                    variant='outlined'
                                    color='secondary'
                                    onClick={this.handleSubmit}
                                >
                                    {intl.get("basic.login")}
                                </Button>
                            </Paper>
                        </div>
                        <FindPasswordDialog
                            open={this.state.openFind}
                            handleClose={this.handleClose("openFind")}
                            handleChange={this.handleChange}
                            handleFindPassword={this.handleFindPassword}
                            handleClearFormError={this.handleClearFormError}
                            processing={this.state.processing}
                            formError={this.state.formError}
                            ID={this.state.ID}
                            email={this.state.email}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("loginStatus")}
                            open={this.state.loginStatus === -1}
                            message={intl.get("message.incorrectAccountOrPassword")}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("loginStatus")}
                            open={this.state.loginStatus === -2}
                            message={intl.get("message.accountNotExists")}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("findStatus")}
                            open={this.state.findStatus === -2}
                            message={intl.get("message.accountNotExists")}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("findStatus")}
                            open={this.state.findStatus === -1}
                            message={intl.get("message.accountEmailNotMatch")}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("findStatus")}
                            open={this.state.findStatus === 0}
                            message={intl.get("message.systemError")}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("findStatus")}
                            open={this.state.findStatus === 1}
                            message={intl.get("message.successFindPassword")}
                        />
                    </div>
            </div>
        )
    }
}