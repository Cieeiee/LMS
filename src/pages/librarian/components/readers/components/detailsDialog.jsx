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


export default class DetailsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { rowsPerPage, page } = this.state;
        const { borrowedHistory } = this.props;
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
                        {this.props.borrowingHistory == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noBorrowing')}</Typography> :
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
                                    {this.props.borrowingHistory.map(item =>
                                        <TableRow key={item.barcode}>
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
                        {this.props.reservingHistory == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noReserving')}</Typography> :
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{intl.get('form.barcode')}</TableCell>
                                        <TableCell>{intl.get('form.title')}</TableCell>
                                        <TableCell>{intl.get('form.reserveTime')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.reservingHistory.map(item =>
                                        <TableRow key={item.barcode}>
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
                        {this.props.borrowedHistory == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noBorrowed')}</Typography> :
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
                                        <TableRow key={item.barcode}>
                                            <TableCell>{item.barcode}</TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.borrowTime}</TableCell>
                                            <TableCell>{item.returnTime}</TableCell>
                                            <TableCell>{item.fine}</TableCell>
                                            <TableCell>{item.state === 3 && intl.get('basic.lost')}</TableCell>
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
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
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
                        onClick={this.props.reader && this.props.handleDeleteReader(this.props.reader.id)}
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