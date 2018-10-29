import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography/Typography";
import '../../librarian.scss'
import {fetchBorrow, fetchDeleteBook, fetchDetails} from "../../../../mock";
import MessageDialog from "../messageDialog";
import BorrowDialog from "./components/borrowDialog";
import DeleteDialog from "./components/deleteDialog";
import LostDialog from "./components/lostDialog";
import ReturnDialog from "./components/returnDialog";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";

export default class BookDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {bookClass: {}, state: []},
            openSnack: false,
            openBorrow: false,
            openReturn: false,
            openLost: false,
            openDelete: false,
            eventStatus: false,
            item: undefined,
        }
    }

    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item
        })
    };
    handleClose = (which) => () => {
        this.setState({
            [which]: false,
            item: undefined,
        })
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };

    handleBorrow = info => async () => {
        const eventState = await fetchBorrow(info)
        const book = await fetchDetails(this.props.match.params.isbn);
        this.setState({
            openBorrow: false,
            openReturn: false,
            openLost: false,
            openSnack: true,
            eventState,
            book
        })
    }
    handleDelete = (id, barcode) => async () => {
        const eventState =  await fetchDeleteBook(id, barcode);
        const book = await fetchDetails(this.props.match.params.isbn);
        this.setState({
            openDelete: false,
            openSnack: true,
            eventState,
            book
        })
    }

    async componentDidMount() {
        const book = await fetchDetails(this.props.match.params.isbn);
        this.setState({book})
    }

    render() {
        return(
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div className="flex-row">
                    {Nav({loginUser: this.props.match.params.loginUser, whichFunction: "books"})}
                    <div className="grow">
                        <div style={{margin: "40px auto 0 auto",width: "60%"}}>
                            <div className="flex-row">
                                <img src={this.state.book.bookClass.picture} alt='' height='400px' />
                                <div style={{marginLeft: 30}} className="flex-col">
                                    <Typography variant="title" gutterBottom style={{fontSize: 40}}>
                                        {this.state.book.bookClass.title}
                                    </Typography>
                                    <Typography variant="p" color="textSecondary">
                                        {this.state.book.bookClass.author}
                                    </Typography>
                                    <div style={{marginTop: 50}} className="flex-col">
                                        <div className="flex-row">
                                            <Typography color="textSecondary" style={{marginRight: 5}}>
                                                Category:
                                            </Typography>
                                            <Typography>
                                                {this.state.book.bookClass.category}
                                            </Typography>
                                        </div>
                                        <div className="flex-row">
                                            <Typography color="textSecondary" style={{marginRight: 5}}>
                                                Location:
                                            </Typography>
                                            <Typography>
                                                {this.state.book.bookClass.location}
                                            </Typography>
                                        </div>
                                        <Typography color="textSecondary">
                                            Introduction
                                        </Typography>
                                        <Typography style={{textIndent: '2em'}}>
                                            {this.state.book.bookClass.introduction}
                                        </Typography>
                                    </div>
                                </div>
                            </div>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>barcode</TableCell>
                                        <TableCell>title</TableCell>
                                        <TableCell numeric>borrow/return</TableCell>
                                        <TableCell numeric>delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.book.state.map(item =>
                                        <TableRow key={item.barcode}>
                                            <TableCell>{item.barcode}</TableCell>
                                            <TableCell>{this.state.book.bookClass.title}</TableCell>
                                            <TableCell numeric>
                                                {item.availability !== 1 ?
                                                    <Button
                                                        variant='outlined'
                                                        color='primary'
                                                        onClick={this.handleOpen('openBorrow', item.barcode)}
                                                    >
                                                        borrow
                                                    </Button>:
                                                    <div>
                                                        <Button
                                                            variant='outlined'
                                                            color='primary'
                                                            onClick={this.handleOpen('openReturn', item.barcode)}
                                                        >
                                                            return
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            color='secondary'
                                                            onClick={this.handleOpen('openLost', item.barcode)}
                                                        >
                                                            lost
                                                        </Button>
                                                    </div>}
                                            </TableCell>
                                            <TableCell numeric>
                                                <Button
                                                    variant='outlined'
                                                    color='secondary'
                                                    onClick={this.handleOpen('openDelete', item.barcode)}
                                                >
                                                    delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <BorrowDialog
                                open={this.state.openBorrow}
                                handleClose={this.handleClose("openBorrow")}
                                handleBorrow={this.handleBorrow}
                                barcode={this.state.item}
                            />
                            <DeleteDialog
                                open={this.state.openDelete}
                                handleClose={this.handleClose("openDelete")}
                                handleDelete={this.handleDelete}
                                libID={this.props.match.params.loginUser}
                                barcode={this.state.item}
                            />
                            <LostDialog
                                open={this.state.openLost}
                                handleClose={this.handleClose("openLost")}
                                handleBorrow={this.handleBorrow}
                                barcode={this.state.item}
                            />
                            <ReturnDialog
                                open={this.state.openReturn}
                                handleClose={this.handleClose("openReturn")}
                                handleBorrow={this.handleBorrow}
                                barcode={this.state.item}
                            />
                            <MessageDialog
                                handleClose={this.handleClose("openSnack")}
                                open={this.state.openSnack}
                                eventState={this.state.eventState}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}