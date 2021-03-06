import React from "react";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import {
    fetchAddReader,
    fetchDeleteReader,
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
import {BuildOutlined, SmsOutlined} from '@material-ui/icons'
import * as intl from "react-intl-universal";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import DeleteDialog from "./components/deleteDialog";
import {Link} from "react-router-dom";

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
            openDelete: false,
            reader: undefined,
            eventState: false,
            formError: undefined,
            returnMessage: undefined,
            processing: false,
            page: 0,
            rowsPerPage: 12,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleSearch = e => this.setState({searchTerm: e.target.value});
    handleOpenDelete = (which, reader) => () => {
        this.setState({
            [which]: true,
            reader,
            processing: false
        })
    };
    handleCloseDelete = (which) => () => {
        this.setState({
            [which]: false,
            reader: undefined,
        })
    };
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
        const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!emailPattern.test(info.email)) {
            this.setState({formError: "emailIncorrect"});
            return;
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
        if (!/^\d{11}$/.test(info.id) || /^0+/.test(info.id)) {
            this.setState({formError: "accountIncorrect"});
            return;
        }
        if (info.name === undefined || info.name.length === 0) {
            this.setState({formError: "nameEmpty"})
            return
        }
        if (info.email === undefined || info.email.length === 0) {
            this.setState({formError: "emailEmpty"})
            return
        }
        const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!emailPattern.test(info.email)) {
            this.setState({formError: "emailIncorrect"});
            return;
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
            openDelete: false,
            openDetails: false,
            returnMessage,
            readerList
        })
    };

    async componentDidMount() {
        const readerList = await fetchReaderList()
        this.setState({readerList})
    }

    render() {
        const { readerList, rowsPerPage, page } = this.state;
        let readerListToShow = []
        if (readerList) readerListToShow = readerList.filter(isSearched(this.state.searchTerm))
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, readerListToShow.length - page * rowsPerPage);
        return (
            <div className="flex-col">
                <TopBar
                    loginUser={this.props.match.params.loginUser}
                    handleSearch={this.handleSearch}
                    lang={this.props.location.search}
                />
                <div style={{width: '100%'}} className="flex-row">
                    <Nav
                        loginUser={this.props.match.params.loginUser}
                        whichFunction={"readers"}
                        lang={this.props.location.search}
                    />
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
                                            variant='contained'
                                            style={{width: 80}}
                                            onClick={this.handleOpen("openAdd", undefined)}
                                        >
                                            {intl.get('basic.add')}
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {readerListToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) =>
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
                                            >
                                                <BuildOutlined/>
                                            </IconButton>
                                            <IconButton
                                                onClick={this.handleOpen("openDetails", item)}
                                            >
                                                <SmsOutlined/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 57 * emptyRows }}>
                                        <TableCell colSpan={7} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={7}
                                        count={readerListToShow.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rowsPerPageOptions={[12]}
                                        ActionsComponent={TablePaginationFooter}
                                    />
                                </TableRow>
                            </TableFooter>
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
                            open={this.state.openDetails}
                            handleOpen={this.handleOpenDelete}
                            handleClose={this.handleClose("openDetails")}
                            reader={this.state.item}
                            processing={this.state.processing}
                        />
                        <DeleteDialog
                            open={this.state.openDelete}
                            handleClose={this.handleCloseDelete("openDelete")}
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
        fontSize: 14,
        textTransform: 'capitalize',
    },
    body: {
        // fontSize: 16,
    },
}))(TableCell);