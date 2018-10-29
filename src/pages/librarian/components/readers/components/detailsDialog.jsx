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


export default function DetailsDialog(props) {
    return (
        <Dialog
            maxWidth='lg'
            open={props.open}
            onClose={props.handleClose}
            scroll="paper"
        >
            {/*<DialogTitle>Borrow History</DialogTitle>*/}
            <DialogContent>
                <div style={{marginBottom: 10}}>
                    <Typography variant="title">Borrowing Books</Typography>
                    {props.borrowingHistory == false ? <Typography>No books borrowing.</Typography> :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>barcode</TableCell>
                                    <TableCell>borrow time</TableCell>
                                    {/*<TableCell>fine</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.borrowingHistory.map(item =>
                                    <TableRow key={item.barcode}>
                                        <TableCell>{item.barcode}</TableCell>
                                        <TableCell>{item.borrowTime}</TableCell>
                                        {/*<TableCell>{item.fine}</TableCell>*/}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>}
                </div>

                <div style={{marginBottom: 10}}>
                    <Typography variant="title">Reserving Books</Typography>
                    {props.reservingHistory == false ? <Typography>No books reserving.</Typography> :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>barcode</TableCell>
                                    <TableCell>reserve time</TableCell>
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

                <div style={{marginBottom: 10}}>
                    <Typography variant="title">Borrowed Books</Typography>
                    {props.borrowedHistory == false ? <Typography>No books borrowed.</Typography> :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>barcode</TableCell>
                                    <TableCell>borrow time</TableCell>
                                    <TableCell>return time</TableCell>
                                    <TableCell>fine</TableCell>
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
                <Button onClick={props.handleClose}>cancel</Button>
                <Button onClick={props.handleDeleteReader(props.reader && props.reader.id)}>
                    delete the reader
                </Button>
            </DialogActions>
        </Dialog>
    );
}