import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import * as intl from "react-intl-universal";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../../mock/tablePaginationFooter";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import {fetchReaderHistory} from "../../../../../mock";


export default class DetailsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowingHistory: [],
            reservingHistory: [],
            borrowedHistory: [],
            page: 0,
            rowsPerPage: 5,
            init: false,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
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
        borrowing.sort((x1, x2) => new Date(x1.borrowTime) < new Date(x2.borrowTime) ? 1 : -1)
        reserving.sort((x1, x2) => new Date(x1.reserveTime) < new Date(x2.reserveTime) ? 1 : -1)
        borrowed.sort((x1, x2) => new Date(x1.borrowTime) < new Date(x2.borrowTime) ? 1 : -1)
        this.setState({
            borrowingHistory: borrowing,
            reservingHistory: reserving,
            borrowedHistory: borrowed,
        });
    };
    handleDetails = async reader => {
        const history = await fetchReaderHistory(reader.id);
        await this.classifyHistory(history);
    }
    handleInit = async () => {
        if (this.props.open && !this.state.init) {
            await this.handleDetails(this.props.reader)
            this.setState({
                init: true,
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                init: false,
            })
        }
    }


    render() {
        this.handleInit()
        const { rowsPerPage, page } = this.state;
        const { borrowingHistory, reservingHistory, borrowedHistory } = this.state;
        let borrowedHistoryToShow = []
        if (borrowedHistory) borrowedHistoryToShow = borrowedHistory;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, borrowedHistoryToShow.length - page * rowsPerPage);

        return (
            <Dialog
                maxWidth='lg'
                fullWidth
                // fullScreen
                open={this.props.open}
                onClose={this.props.handleClose}
                scroll="body"
            >
                <DialogContent>
                    <div className="flex-col" style={{marginBottom: 40}}>
                        <Typography style={{fontSize: 50, margin: "0 auto 20px auto"}}>
                            {intl.get('form.formTitle.readerDetails')}
                        </Typography>
                        <div className="flex-row" style={{marginBottom: 5}}>
                            <Typography color="textSecondary" style={{marginLeft: 'auto'}}>
                                {intl.get('form.account')}: {this.props.reader && this.props.reader.id}
                            </Typography>
                        </div>
                        <div className="flex-row" style={{marginBottom: 5}}>
                            <Typography color="textSecondary" style={{marginLeft: 'auto'}}>
                                {intl.get('form.name')}: {this.props.reader && this.props.reader.name}
                            </Typography>
                        </div>
                        <div className="flex-row" style={{marginBottom: 5}}>
                            <Typography color="textSecondary" style={{marginLeft: 'auto'}}>
                                {intl.get('form.email')}: {this.props.reader && this.props.reader.email}
                            </Typography>
                        </div>
                    </div>
                    <div style={{marginBottom: 40}}>
                        <Typography variant="title" gutterBottom>{intl.get('form.formTitle.borrowingBooks')}</Typography>
                        {borrowingHistory == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noBorrowing')}</Typography> :
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{intl.get('form.barcode')}</TableCell>
                                        <TableCell>{intl.get('form.title')}</TableCell>
                                        <TableCell>{intl.get('form.borrowTime')}</TableCell>
                                        <TableCell>{intl.get('form.fine')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {borrowingHistory.map(item =>
                                        <TableRow key={item.borrowTime}>
                                            <TableCell>{item.barcode}</TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.borrowTime}</TableCell>
                                            <TableCell>{item.fine}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>}
                    </div>

                    <div style={{marginBottom: 40}}>
                        <Typography variant="title" gutterBottom>{intl.get('form.formTitle.reservingBooks')}</Typography>
                        {reservingHistory == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noReserving')}</Typography> :
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{intl.get('form.barcode')}</TableCell>
                                        <TableCell>{intl.get('form.title')}</TableCell>
                                        <TableCell>{intl.get('form.reserveTime')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservingHistory.map(item =>
                                        <TableRow key={item.reserveTime}>
                                            <TableCell>{item.barcode}</TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.reserveTime}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>}
                    </div>

                    <div style={{marginBottom: 40}}>
                        <Typography variant="title" gutterBottom>{intl.get('form.formTitle.borrowedBooks')}</Typography>
                        {borrowedHistoryToShow == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noBorrowed')}</Typography> :
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{intl.get('form.barcode')}</TableCell>
                                        <TableCell>{intl.get('form.title')}</TableCell>
                                        <TableCell>{intl.get('form.borrowTime')}</TableCell>
                                        <TableCell>{intl.get('form.returnTime')}</TableCell>
                                        <TableCell>{intl.get('form.fine')}</TableCell>
                                        <TableCell>{intl.get('form.description')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {borrowedHistoryToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(item =>
                                        <TableRow key={item.borrowTime}>
                                            <TableCell>{item.barcode}</TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.borrowTime}</TableCell>
                                            <TableCell>{item.returnTime}</TableCell>
                                            <TableCell>{item.fine}</TableCell>
                                            <TableCell>{item.state === 3 ? intl.get('basic.lost') : intl.get('basic.normal')}</TableCell>
                                        </TableRow>
                                    )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 48 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            colSpan={6}
                                            count={borrowedHistoryToShow.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onChangePage={this.handleChangePage}
                                            rowsPerPageOptions={[5]}
                                            // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationFooter}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>}
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose}>{intl.get('form.cancel')}</Button>
                    <Button
                        onClick={this.props.reader && this.props.handleOpen("openDelete", this.props.reader)}
                        processing={this.props.processing}
                        color='secondary'
                    >
                        {intl.get('form.formTitle.deleteReader')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}