import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";
import * as intl from "react-intl-universal";
import {Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import {fetchBookDetails, fetchReserveBook} from "../../../../mock";
import ReserveDialog from "./reserveDialog";
import MessageDialog from "../../components/messageDialog";

export default class DetailsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookCopyList: [],
            init: false,
            page: 0,
            rowsPerPage: 5,
            openReserve: false,
            item: undefined,
            processing: false,
        }
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleBookDetails = async () => {
        const bookCopyList = await fetchBookDetails(this.props.book.isbn)
        this.setState({bookCopyList})
    }
    handleReserve = (id, barcode) => async () => {
        this.setState({processing: true})
        const eventState = await fetchReserveBook(id, barcode)
        await this.handleBookDetails()

        let returnMessage = ''
        switch (eventState) {
            case 1:
                returnMessage = intl.get('message.success')
                break;
            case -1:
                returnMessage = intl.get('message.cannotReserve')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            returnMessage,
            openReserve: false,
        })
    };
    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.handleBookDetails()

            this.setState({
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                init: false,
                bookCopyList: []
            })
        }
    }
    handleOpen = (which, value) => () => {
        this.setState({
            [which]: true,
            item: value,
            processing: false,
        })
    }
    handleClose = (which) => () => {
        if (which === "returnMessage")
            this.setState({[which]: undefined})
        else
            this.setState({[which]: false})
    }

    render() {
        this.handleInit()

        const { bookCopyList, rowsPerPage, page } = this.state;
        let bookCopyListToShow = bookCopyList;
        if (bookCopyListToShow) bookCopyListToShow = bookCopyListToShow.filter(bookCopy => bookCopy.availability !== 3)
        let emptyRows = rowsPerPage - Math.min(rowsPerPage, bookCopyListToShow.length - page * rowsPerPage);

        return (
            <Dialog
                maxWidth='md'
                fullWidth
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Typography id="alert-dialog-title" style={{margin: "20px auto 20px auto", fontSize: 30}}>
                    {this.props.book && this.props.book.title}
                </Typography>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{intl.get('form.barcode')}</TableCell>
                                <TableCell>{intl.get('form.location')}</TableCell>
                                <TableCell>{intl.get('form.bookState')}</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookCopyListToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(item =>
                                    <TableRow key={item.barcode}>
                                        <TableCell>
                                            {item.bar_code}
                                        </TableCell>
                                        <TableCell>
                                            {item.location}
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary">
                                                {item.availability === 0 && intl.get("form.inLibrary")}
                                                {item.availability === 1 && intl.get("form.borrowed")}
                                                {item.availability === 2 && intl.get("form.reserved")}
                                            </Typography>
                                        </TableCell>
                                        <TableCell numeric>
                                            {item.availability === 0 && <Button
                                                color='secondary'
                                                onClick={this.handleOpen('openReserve', item.bar_code)}
                                            >
                                                {intl.get('reader.searched.reserve')}
                                            </Button>}
                                        </TableCell>
                                    </TableRow>
                                )}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={4}
                                    count={bookCopyListToShow.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationFooter}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        {intl.get('form.close')}
                    </Button>
                </DialogActions>
                <ReserveDialog
                    open={this.state.openReserve}
                    handleClose={this.handleClose("openReserve")}
                    handleReserve={this.handleReserve}
                    barcode={this.state.item}
                    reader={this.props.reader}
                    processing={this.state.processing}
                />
                <MessageDialog
                    handleClose={this.handleClose("returnMessage")}
                    open={this.state.returnMessage !== undefined}
                    message={this.state.returnMessage}
                />
            </Dialog>
        );
    }
}