import React from 'react'
import { TextField, Button, TableRow, TableCell, Table, TableBody, TableHead } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './reader.scss'

const Logo = require('./logo.jpg');

export default class Reader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            list: null
        }
    }
    handleChange = e => {
        this.setState({
            search: e.target.value
        })
    }
    handleSearch = () => {
        fetch(`/searchBook?name=${this.state.search}`)
        .then(Response => Response.json())
        .then(result => {
            this.setState({
                list: result.name
            })
        })
        .catch(e => alert(e));
    }
    render() {
        return (
            <div style={{height: '100%'}}>
            <Button style={{position: 'absolute', top: 10, right: 10}} variant='outlined' component={Link} color='secondary' to='/'>logout</Button>
            {this.state.list === null || []?
            <div className='reader-page'>
                <div className='bg' style={{backgroundImage: `url(${Logo})`}} />
                <TextField
                  label='search'
                  variant='outlined'
                  style={{width: 600, margin: '30px 0'}}
                  value={this.state.search}
                  onChange={this.handleChange}
                />
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={this.handleSearch}
                >
                    search
                </Button>
            </div> :
            <div className='search-page'>
                <div className='search-nav'>
                  <TextField
                  style={{width: 600, marginRight: 30}}
                    label='search'
                    variant='outlined'
                    value={this.state.search}
                    onChange={this.handleChange}
                  />
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={this.handleSearch}
                  >
                    search
                  </Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                          <TableCell>ISBN</TableCell>
                          <TableCell>name</TableCell>
                          <TableCell>athor</TableCell>
                          <TableCell>introduction</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.list.map(item =>
                    <TableRow>
                        <TableCell>{item.isbn}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{item.introduction}</TableCell>
                    </TableRow> 
                    )}
                    </TableBody>
                </Table>
            </div>}
            </div>
        )
    }
}