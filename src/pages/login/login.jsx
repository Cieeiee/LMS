import React from 'react'
import './login.scss'
import { TextField, Button, Paper, Dialog, DialogTitle } from '@material-ui/core'

const backgroundImage = require('./library.jpg')

export default class AdminLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account: undefined,
            password: undefined,
            open: false
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        setTimeout(this.handleClose, 1500)
    }

    handleSubmit = event => {
        event.preventDefault()
        
        if(this.state.account === 'a' && this.state.password === 'a') {
            window.location.href = '/admin'
            return
        }

        if(this.state.account === '1' && this.state.password === '1') {
            window.location.href = '/librarian'
            return
        }

        fetch(`/readerLogIn?student_id=${this.state.account}&password=${this.state.password}`)
         .then(response => response.json())
         .then(result => {
             if(result.result !== '0') {
                 this.handleOpen()
             } else {
                window.location.href = '/reader'
             }
         })
         .catch(() => this.handleOpen())
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
                        style={{margin: '30px 50px'}}
                        className='admin-login-button'
                        variant='outlined'
                        color='secondary'
                        onClick={this.handleSubmit}
                    >
                    login
                    </Button>
                </Paper>
                <Dialog
                    onClose={this.handleClose}
                    open={this.state.open}
                >
                    <DialogTitle>
                        incorrect account or password!
                    </DialogTitle>
                </Dialog>
            </div>
        )
    }
}