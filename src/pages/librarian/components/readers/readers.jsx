import React from "react";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import {
    fetchAddReader,
    fetchDeleteReader,
    fetchReaderHistory,
    fetchReaderList,
    fetchUpdateReader
} from "../../../../mock";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Button from "@material-ui/core/Button/Button";
import {blue} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core";
import AddDialog from "./components/addDialog";
import UpdateDialog from "./components/updateDialog";
import DetailsDialog from "./components/detailsDialog";
import MessageDialog from "../messageDialog";
import { BuildOutlined } from '@material-ui/icons'
import * as intl from "react-intl-universal";

const isSearched = searchTerm => item =>
    item.id.indexOf(searchTerm) === 0 ||
    item.name.toUpperCase().includes(searchTerm.toUpperCase())

export default class Readers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            readerList: [],
            borrowingHistory: [],
            reservingHistory: [],
            borrowedHistory: [],
            openAdd: false,
            openUpdate: false,
            openDetails: false,
            openSnack: false,
            eventState: false,
            formError: undefined,
            returnMessage: undefined,
            processing: false,
        }
    }

    handleSearch = e => this.setState({searchTerm: e.target.value});
    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item,
            processing: false
        })
    };
    handleClose = (which) => () => {
        this.setState({
            [which]: false,
            item: undefined,
            formError: undefined
        })
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };
    clearFormError = () => {
        this.setState({formError: undefined})
    }
    handleUpdateReader = info => async () => {
        if (info.name === undefined || info.name.length === 0) {
            this.setState({formError: "nameEmpty"})
            return
        }
        if (info.email === undefined || info.email.length === 0) {
            this.setState({formError: "emailEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState = await fetchUpdateReader(info);
        const readerList = await fetchReaderList();
        let returnMessage = ''
        switch (eventState) {
            case -1:
                returnMessage = intl.get('message.noPermission')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openUpdate: false,
            returnMessage,
            readerList
        })
    };
    handleAddReader = info => async () => {
        if (info.id === undefined || info.id.length === 0) {
            this.setState({formError: "accountEmpty"})
            return
        }
        if (info.name === undefined || info.name.length === 0) {
            this.setState({formError: "nameEmpty"})
            return
        }
        if (info.email === undefined || info.email.length === 0) {
            this.setState({formError: "emailEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState =  await fetchAddReader(info)
        const readerList = await fetchReaderList()
        let returnMessage = ''
        switch (eventState) {
            case -1:
                returnMessage = intl.get('message.accountExists')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openAdd: false,
            returnMessage,
            readerList
        })
    }
    handleDeleteReader = id => async () => {
        await this.setState({processing: true})
        const eventState = await fetchDeleteReader(id);
        const readerList = await fetchReaderList()
        let returnMessage = ''
        switch (eventState) {
            case -1:
                returnMessage = intl.get('message.stillBorrowingBooks')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openDetails: false,
            returnMessage,
            readerList
        })
    };
    changeDateFormat = (d) => {
        let date = new Date(d);
        let changed = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return changed;
    }
    classifyHistory = (history) => {
        let borrowing = [], reserving = [], borrowed = [];
        for (let i in history) {
            let h = history[i];
            if (h.borrowTime !== null) {
                h.borrowTime = this.changeDateFormat(h.borrowTime);
            }
            if (h.returnTime !== null) {
                h.returnTime = this.changeDateFormat(h.returnTime);
            }
            if (h.reserveTime !== null) {
                h.reserveTime = this.changeDateFormat(h.reserveTime);
            }
            if (h.state === 1) {
                borrowing.push(h);
            }
            else if (h.state === 0) {
                reserving.push(h);
            }
            else if (h.state === 2 || h.state === 3) {
                borrowed.push(h);
            }
        }
        this.setState({
            borrowingHistory: borrowing,
            reservingHistory: reserving,
            borrowedHistory: borrowed,
        });
    };
    handleDetails = item => async () => {
        const history = await fetchReaderHistory(item.id);
        await this.classifyHistory(history);
        this.setState({
            openDetails: true,
            item: item,
        })
    }
    async componentDidMount() {
        const readerList = await fetchReaderList()
        this.setState({readerList})
    }

    render() {
        return (
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser} handleSearch={this.handleSearch}/>
                <div style={{width: '100%'}} className="flex-row">
                    <Nav loginUser={this.props.match.params.loginUser} whichFunction={"readers"}/>
                    <div className="grow">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>{intl.get('form.account')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.name')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.email')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.booksBorrowed')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.booksReserved')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.deposit')}</CustomTableCell>
                                    <CustomTableCell numeric>
                                        <Button
                                            variant='outlined'
                                            color="inherit"
                                            onClick={this.handleOpen("openAdd", undefined)}
                                        >
                                            {intl.get('basic.add')}
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {typeof(this.state.readerList.map) !== "undefined"
                                && this.state.readerList.filter(isSearched(this.state.searchTerm)).map((item, index) =>
                                    <TableRow key={index} className="table-row">
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell numeric>{item.name}</TableCell>
                                        <TableCell numeric>{item.email}</TableCell>
                                        <TableCell numeric>{item.booksBorrowed}</TableCell>
                                        <TableCell numeric>{item.booksReserved}</TableCell>
                                        <TableCell numeric>{item.deposit}</TableCell>
                                        <TableCell numeric>
                                            <IconButton
                                                onClick={this.handleOpen("openUpdate", item)}
                                                style={{marginRight: 10}}
                                            >
                                                <BuildOutlined/>
                                            </IconButton>
                                            <Button variant='outlined' onClick={this.handleDetails(item)}>
                                                {intl.get('basic.details')}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <AddDialog
                            open={this.state.openAdd}
                            handleClose={this.handleClose("openAdd")}
                            handleAddReader={this.handleAddReader}
                            formError={this.state.formError}
                            clearFormError={this.clearFormError}
                            processing={this.state.processing}
                        />
                        <UpdateDialog
                            open={this.state.openUpdate}
                            handleClose={this.handleClose("openUpdate")}
                            handleUpdateReader={this.handleUpdateReader}
                            formError={this.state.formError}
                            clearFormError={this.clearFormError}
                            reader={this.state.item}
                            processing={this.state.processing}
                        />
                        <DetailsDialog
                            borrowingHistory={this.state.borrowingHistory}
                            reservingHistory={this.state.reservingHistory}
                            borrowedHistory={this.state.borrowedHistory}
                            open={this.state.openDetails}
                            handleClose={this.handleClose("openDetails")}
                            handleDeleteReader={this.handleDeleteReader}
                            reader={this.state.item}
                            processing={this.state.processing}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("openSnack")}
                            open={Boolean(this.state.returnMessage)}
                            message={this.state.returnMessage}
                        />
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