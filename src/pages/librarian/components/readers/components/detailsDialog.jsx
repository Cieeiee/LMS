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


export default function DetailsDialog(props) {
    return (
        <Dialog
            // maxWidth='lg'
            open={props.open}
            onClose={props.handleClose}
            scroll="paper"
        >
            {/*<DialogTitle>Borrow History</DialogTitle>*/}
            <DialogContent>
                <div style={{marginBottom: 40}}>
                    <Typography variant="title" gutterBottom>{intl.get('form.formTitle.borrowingBooks')}</Typography>
                    {props.borrowingHistory == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noBorrowing')}</Typography> :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{intl.get('form.barcode')}</TableCell>
                                    <TableCell>{intl.get('form.borrowTime')}</TableCell>
                                    <TableCell>{intl.get('form.fine')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.borrowingHistory.map(item =>
                                    <TableRow key={item.barcode}>
                                        <TableCell>{item.barcode}</TableCell>
                                        <TableCell>{item.borrowTime}</TableCell>
                                        <TableCell>{item.fine}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>}
                </div>

                <div style={{marginBottom: 40}}>
                    <Typography variant="title" gutterBottom>{intl.get('form.formTitle.reservingBooks')}</Typography>
                    {props.reservingHistory == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noReserving')}</Typography> :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{intl.get('form.barcode')}</TableCell>
                                    <TableCell>{intl.get('form.reserveTime')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.reservingHistory.map(item =>
                                    <TableRow key={item.barcode}>
                                        <TableCell>{item.barcode}</TableCell>
                                        <TableCell>{item.reserveTime}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>}
                </div>

                <div style={{marginBottom: 40}}>
                    <Typography variant="title" gutterBottom>{intl.get('form.formTitle.borrowedBooks')}</Typography>
                    {props.borrowedHistory == false ? <Typography color="textSecondary">{intl.get('form.formTitle.noBorrowed')}</Typography> :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{intl.get('form.barcode')}</TableCell>
                                    <TableCell>{intl.get('form.borrowTime')}</TableCell>
                                    <TableCell>{intl.get('form.returnTime')}</TableCell>
                                    <TableCell>{intl.get('form.fine')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.borrowedHistory.map(item =>
                                    <TableRow key={item.barcode}>
                                        <TableCell>{item.barcode}</TableCell>
                                        <TableCell>{item.borrowTime}</TableCell>
                                        <TableCell>{item.returnTime}</TableCell>
                                        <TableCell>{item.fine}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>}
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>{intl.get('form.cancel')}</Button>
                <Button
                    onClick={props.reader && props.handleDeleteReader(props.reader.id)}
                    processing={props.processing}
                >
                    {intl.get('form.formTitle.deleteReader')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}