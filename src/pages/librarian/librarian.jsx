import React from 'react'
import './librarian.scss'
import { Paper, Table, TableHead, TableRow, TableCell, Button, TableBody, Dialog } from '@material-ui/core';

export default class Librarian extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            open: false,
            book: {
                isbn: null,
                name: null,
                author: null,
                info: null
            }
        }
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    componentDidMount() {
        fetch('/searchBook')
        .then(Response => Response.json())
        .then(result => {
            this.setState({
                list: result.name
            })
        })
    }
    render() {
        return (
            <Paper style={{width: '70%'}}>
              <Table>
                <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell numeric>ISBN</TableCell>
                      <TableCell numeric>author</TableCell>
                      <TableCell numeric>introduction</TableCell>
                      {/* <TableCell numeric><Button variant='outlined' color='primary' onClick={this.handleOpen}>add</Button></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.list.map(item => 
                      <TableRow>
                        <TableCell>item.name</TableCell>
                        <TableCell numeric>item.isbn</TableCell>
                        <TableCell numeric>item.author</TableCell>
                        <TableCell numeric>item.introduction</TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
              <Dialog>
                  

              </Dialog>
            </Paper>
        )
    }
}