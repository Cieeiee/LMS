import React from 'react'
import '../login.scss'
import { TextField, Button, Paper, Dialog, DialogTitle } from '@material-ui/core'
import FindPasswordDialog from "./findPasswordDialog";
import MessageDialog from "./MessageDialog";

const backgroundImage = require('../components/library.jpg');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: undefined,
            password: undefined,

            incorrect: false,
            notExists: false,
            findFailed: false,
            findSuccess: false,
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
        this.setState({
            [which]: false,
        });
        if (which === "openFind") {
            this.setState({
                ID: undefined,
                email: undefined,
                formError: undefined,
            })
        }
    };

    handleOpen = which => () => {
        this.setState({
            [which]: true
        });
        if (which === "incorrect" || which === "notExists"
            || which === "findFailed" || which === "findSuccess")
            setTimeout(this.handleClose, 1500)
    };

    handleSubmit = event => {
        event.preventDefault();

        let status = -1;
        fetch('/login', {
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
                status = result.state;
            })
            .catch(e => alert(e));

        if (status === -2) {
            this.handleOpen("notExists");
        }
        else if (status === 0) {
            window.location.href = '/reader/' + this.state.id;
        }
        else if (status === 1) {
            window.location.href = '/librarian/' + this.state.id;
        }
        else {
            this.handleOpen("incorrect");
        }
    };

    handleFindPassword = event => {
        event.preventDefault();

        if (this.state.ID === undefined) {
            this.setState({formError: "IDEmpty"});
            return;
        }
        if (this.state.email === undefined) {
            this.setState({formError: "emailEmpty"});
            return;
        }

        this.handleClose("openFind")();
        let status = -1;
        fetch('/findPassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.ID,
                email: this.state.email,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                status = result.state;
            })
            .catch(e => alert(e));

        if (status === 1) {
            this.handleOpen("findSuccess");
        }
        else {
            this.handleOpen("findFailed");
        }
    }

    render() {
        return (
            <div className='admin-login'>
                <div className='admin-login-bg' style={{backgroundImage: `url(${backgroundImage})`}} />
                <h2 className='admin-login-slogan'>Welcome to Bibliosoft <br/> Library Management System</h2>
                <Paper className='admin-login-paper'>
                    <TextField
                        className='admin-login-input'
                        label='account'
                        value={this.state.account}
                        onChange={this.handleChange('account')}
                        margin='normal'
                    />
                    <TextField
                        className='admin-login-input'
                        label='password'
                        value={this.state.password}
                        onChange={this.handleChange('password')}
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
                    formError={this.state.formError}
                    ID={this.state.ID}
                    email={this.state.email}
                />
                <MessageDialog
                    onClose={this.handleClose("incorrect")}
                    open={this.state.incorrect}
                    message={"Incorrect account or password!"}
                />
                <MessageDialog
                    onClose={this.handleClose("notExists")}
                    open={this.state.notExists}
                    message={"Account not exists!"}
                />
                <MessageDialog
                    onClose={this.handleClose("findFailed")}
                    open={this.state.findFailed}
                    message={"Incorrect email or ID."}
                />
                <MessageDialog
                    onClose={this.handleClose("findSuccess")}
                    open={this.state.findSuccess}
                    message={"Success! Check your email for your password."}
                />
            </div>
        )
    }
}