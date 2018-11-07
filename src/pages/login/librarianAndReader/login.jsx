import React from 'react'
import '../login.scss'
import { TextField, Button, Paper} from '@material-ui/core'
import FindPasswordDialog from "./findPasswordDialog";
import MessageDialog from "../components/MessageDialog";
import {serverReader, serverLibrarian} from "../../../mock/config";
import {fetchFindPassword, fetchReaderLibrarianLogin} from "../../../mock";

const backgroundImage = require('../components/library.jpg');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: undefined,
            password: undefined,

            loginStatus: undefined,
            findStatus: undefined,
            openFind: false,

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

        if (which === "openFind") {
            this.setState({
                ID: undefined,
                email: undefined,
                formError: undefined,
            })
        }
    };

    handleClearFormError = () => {
        this.setState({formError: undefined});
    };

    handleOpen = which => () => {
        this.setState({
            [which]: true
        });
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

        const loginStatus = await fetchReaderLibrarianLogin(this.state.account, this.state.password)
        this.setState({loginStatus});
        if (loginStatus === 0)
            window.location.href = '/reader/' + this.state.account;
        if (loginStatus === 1)
            window.location.href = `/librarian/${this.state.account}/books`;
    };

    handleFindPassword = event => {
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

        this.handleClose("openFind")();

        const findStatus = fetchFindPassword(this.state.ID, this.state.email)
        this.setState({findStatus});
    };

    render() {

        return (
            <div className='admin-login'>
                <div className='admin-login-bg' style={{backgroundImage: `url(${backgroundImage})`}} />
                <h2 className='admin-login-slogan'>Welcome to Bibliosoft <br/> Library Management System</h2>
                <Paper className='admin-login-paper'>
                    <TextField
                        error={this.state.formError === "accountEmpty"}
                        className='admin-login-input'
                        label={this.state.formError === "accountEmpty" ? "account can not be empty" : 'account'}
                        value={this.state.account}
                        onChange={this.handleChange('account')}
                        onFocus={this.handleClearFormError}
                        margin='normal'
                    />
                    <TextField
                        error={this.state.formError === "passwordEmpty"}
                        className='admin-login-input'
                        label={this.state.formError === "passwordEmpty" ? "password can not be empty" : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        onFocus={this.handleClearFormError}
                        type='password'
                        margin='normal'
                    />
                    <Button
                        onClick={this.handleOpen("openFind")}
                    >
                        forget your password?
                    </Button>
                    <Button
                        className='admin-login-button'
                        style={{margin: '20px 50px 30px 50px'}}
                        variant='outlined'
                        color='secondary'
                        onClick={this.handleSubmit}
                    >
                        login
                    </Button>
                </Paper>
                <FindPasswordDialog
                    open={this.state.openFind}
                    handleClose={this.handleClose("openFind")}
                    handleChange={this.handleChange}
                    handleFindPassword={this.handleFindPassword}
                    handleClearFormError={this.handleClearFormError}
                    formError={this.state.formError}
                    ID={this.state.ID}
                    email={this.state.email}
                />
                <MessageDialog
                    handleClose={this.handleClose("loginStatus")}
                    open={this.state.loginStatus === -1}
                    message={"Incorrect account or password!"}
                />
                <MessageDialog
                    handleClose={this.handleClose("loginStatus")}
                    open={this.state.loginStatus === -2}
                    message={"Account not exists!"}
                />
                <MessageDialog
                    handleClose={this.handleClose("findStatus")}
                    open={this.state.findStatus === -2}
                    message={"User not exists or no permission"}
                />
                <MessageDialog
                    handleClose={this.handleClose("findStatus")}
                    open={this.state.findStatus === -1}
                    message={"User name doesn't match the email."}
                />
                <MessageDialog
                    handleClose={this.handleClose("findStatus")}
                    open={this.state.findStatus === 0}
                    message={"Sorry, system error happened."}
                />
                <MessageDialog
                    handleClose={this.handleClose("findStatus")}
                    open={this.state.findStatus === 1}
                    message={"Success! Check your email for your password."}
                />
            </div>
        )
    }
}