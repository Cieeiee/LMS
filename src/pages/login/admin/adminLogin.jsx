import React from "react";
import {Button, Dialog, DialogTitle, Paper, TextField} from "@material-ui/core";
import MessageDialog from "../components/MessageDialog";

const backgroundImage = require('../components/library.jpg');
const server = "http://192.168.1.103:7911";

export default class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: undefined,
            password: undefined,

            loginStatus: undefined,
            formError: undefined,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleClose = which => () => {
        this.setState({[which]: undefined})
    };

    handleClearFormError = () => {
        this.setState({formError: undefined});
    };

    handleSubmit = event => {
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

        fetch(`${server}/admin/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.account,
                password: this.state.password,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({loginStatus: result.state});
            })
            .catch(e => alert(e));
    };

    loginUser = () => {
        if (this.state.loginStatus === 1)
            window.location.href = '/admin';
    };

    render() {
        this.loginUser();

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
                        style={{margin: '30px 50px'}}
                        className='admin-login-button'
                        variant='outlined'
                        color='secondary'
                        onClick={this.handleSubmit}
                    >
                        login
                    </Button>
                </Paper>
                <MessageDialog
                    handleClose={this.handleClose("loginStatus")}
                    open={this.state.loginStatus === 0}
                    message={"Incorrect account or password!"}
                />
            </div>
        )
    }
}