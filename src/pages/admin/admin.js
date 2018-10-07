import React from 'react'
import './admin.scss'
import { List, ListItem, ListItemText, Divider, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    handleChange = index => {
        this.setState({
            index
        })
    }
    render() {
        return (
            <div className='page'>
              <List component="nav" className='nav'>
                <ListItem>
                  <ListItemText primary={<h1>administrator</h1>} />
                  <Button variant='outlined' onClick={() => window.location.href = '/'}>logout</Button>
                </ListItem>
                <Divider />
                <ListItem onClick={() => this.handleChange(0)} button selected={this.state.index === 0}>
                  <ListItemText primary="librarian" />
                </ListItem>
                <ListItem onClick={() => this.handleChange(1)} button selected={this.state.index === 1}>
                  <ListItemText primary="change rules" />
                </ListItem>
              </List>
              {this.state.index === 0 && <LibList />}
              {this.state.index === 1 && <p>to be continued...</p>}
            </div>
        )
    }
}

class LibList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            List: [],
            open: false,
            name: '',
            password: ''
        }
    }
    handleDelete = id => {
        let updateList = this.state.List.filter(item => 
            item.id !== id
        )
        this.setState({
            List: updateList
        })
    }
    handleOpen= () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }
    handleAdd = () => {
        if(this.state.name === '' || this.state.password === '') {
            alert(`Name or password can't be blank!`)
            return
        }
        let list = this.state.List
        for(let i of list) {
            if(i.name === this.state.name) {
                alert('Name is already taken!')
                return
            }
        }
        const updateList = [
            ...list,
            {
                id: list[list.length - 1].id + 1,
                name: this.state.name,
                password: this.state.password
            }
        ]
        this.setState({
            List: updateList
        })
        this.handleClose();
    }
    componentDidMount() {
        fetch('/api/admin/lib')
            .then(Response => Response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    List: result.list
                })
            })
    }
    render() {
        return (
            <Paper className='items'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><h3>librarian_id</h3></TableCell>
                    <TableCell numeric><h3>name</h3></TableCell>
                    <TableCell numeric><h3>password</h3></TableCell>
                    <TableCell numeric><Button variant='outlined' color='primary' onClick={this.handleOpen}>add</Button></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.List.map((item, index) => 
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell numeric>{item.name}</TableCell>
                      <TableCell numeric>{item.password}</TableCell>
                      <TableCell numeric><Button variant='contained' color='secondary' onClick={() => this.handleDelete(item.id)}>delete</Button></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
              >
              <DialogTitle>Librarian</DialogTitle>
                <DialogContent>
                  <TextField
                    margin='dense'
                    label='name'
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                  />
                  <TextField 
                    margin='dense'
                    label='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleAdd} color='primary'>OK</Button>
                  <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                </DialogActions>
              </Dialog>
            </Paper>
        )
    }
}