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
        this.handleOpen();
        // fetch('/api/login')
        //  .then(response => response.json())
        //  .then(result => {
        //      if(result.status === 1) {
        //          this.handleOpen()
        //      } else {
        //          alert('sucess')
        //      }
        //  })
        //  .catch(e => alert(e))
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
                        style={{margin: 50}}
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