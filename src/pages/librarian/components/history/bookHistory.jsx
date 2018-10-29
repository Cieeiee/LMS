import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import blue from "@material-ui/core/es/colors/blue";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";

const isSearched = searchTerm => item =>
    item.title.toUpperCase().includes(searchTerm.toUpperCase())

export default class BookHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        }
    }

    handleSearch = e => this.setState({searchTerm: e.target.value});


    render() {
        return(
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div style={{width: '100%'}} className="flex-row">
                    {Nav({loginUser: this.props.match.params.loginUser, whichFunction: "history"})}
                    <div className="grow">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>ID</CustomTableCell>
                                    <CustomTableCell numeric>librarian id</CustomTableCell>
                                    <CustomTableCell numeric>barcode</CustomTableCell>
                                    <CustomTableCell numeric>ISBN</CustomTableCell>
                                    <CustomTableCell numeric>title</CustomTableCell>
                                    <CustomTableCell numeric>date</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.list && this.props.list.filter(isSearched(this.state.searchTerm))
                                    .map((item, index) =>
                                    <TableRow key={index} className="table-row">
                                        <TableCell>{item.num}</TableCell>
                                        <TableCell numeric>{item.id}</TableCell>
                                        <TableCell numeric>{item.barcode}</TableCell>
                                        <TableCell numeric>{item.isbn}</TableCell>
                                        <TableCell numeric>{item.title}</TableCell>
                                        <TableCell numeric>{item.date}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        // fontSize: 18,
    },
    body: {
        // fontSize: 16,
    },
}))(TableCell);