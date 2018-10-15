import React from "react";
import {TopBar} from "./components/TopBar";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import { AccountBoxOutlined, EmailOutlined, PhoneOutlined, DateRangeOutlined, MoveToInboxOutlined, AssignmentOutlined, HistoryOutlined } from '@material-ui/icons'
import './reader.scss'
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import Divider from "@material-ui/core/Divider/Divider";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {pink, teal} from "@material-ui/core/colors";
import blue from "@material-ui/core/es/colors/blue";

const ToLive = require('./components/alive.jpeg');
const BarCode = require('./components/barcode.jpg');
const Logo = require('./components/logo.jpg');

export default class ReaderHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            info: {
                name: 'asd123',
                email: '529012380@qq.com',
                birth: '1996-10-02',
                tel: '18292027797',
            },
            record:
                [
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        picture: ToLive,
                        barcode: "2389787233",
                        barcode_img: BarCode,
                        borrowTime: '2017-09-23-13:12',
                        returnTime: '2017-10-16-15:38',
                        reserveTime: null,
                        fine: 2.23
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        picture: ToLive,
                        barcode: "2389787233",
                        barcode_img: BarCode,
                        borrowTime: '2017-09-23-13:12',
                        returnTime: '2017-10-16-15:38',
                        reserveTime: null,
                        fine: 1.02
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        picture: ToLive,
                        barcode: "2389787233",
                        barcode_img: BarCode,
                        borrowTime: '2017-09-23-13:12',
                        returnTime: null,
                        reserveTime: null,
                        fine: 3
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        picture: ToLive,
                        barcode: "2389787233",
                        barcode_img: BarCode,
                        borrowTime: '2017-09-23-13:12',
                        returnTime: null,
                        reserveTime: null,
                        fine: 0
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        picture: ToLive,
                        barcode: "2389787233",
                        barcode_img: BarCode,
                        borrowTime: null,
                        returnTime: null,
                        reserveTime: '2017-09-24-15:05',
                        fine: 0
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        picture: ToLive,
                        barcode: "2389787233",
                        barcode_img: BarCode,
                        borrowTime: '2017-09-24-16:03',
                        returnTime: null,
                        reserveTime: '2017-09-24-15:05',
                        fine: 0
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        picture: ToLive,
                        barcode: "2389787233",
                        barcode_img: BarCode,
                        borrowTime: '2017-09-24-16:03',
                        returnTime: null,
                        reserveTime: '2017-09-24-15:05',
                        fine: 0
                    },
                ],
            classified: {
                borrowing: [],
                reserving: [],
                borrowed: [],
            },
            total: {
                borrowing: undefined,
                borrowed: undefined
            }
        }
    }

    classifyRecord = () => {
        const borrowing = [];
        let borrowing_id = 0;
        const reserving = [];
        let reserving_id = 0;
        const borrowed = [];
        let borrowed_id = 0;
        for (let i in this.state.record) {
            const record = this.state.record[i];
            if (record.reserveTime !== null && record.borrowTime !== null) {
                record.id = reserving_id;
                reserving_id += 1;
                reserving.push(record);
            }
            else if (record.borrowTime !== null && record.returnTime !== null) {
                record.id = borrowed_id;
                borrowed_id += 1;
                borrowed.push(record);
            }
            else if (record.borrowTime !== null && record.returnTime === null) {
                record.id = borrowing_id;
                borrowing_id += 1;
                borrowing.push(record);
            }
        };

        const classified = {
            borrowing: borrowing,
            reserving: reserving,
            borrowed: borrowed,
        };
        this.setState({classified: classified});

        let total_borrowing = 0;
        for (let i in borrowing) {
            total_borrowing += borrowing[i].fine;
        };

        let total_borrowed = 0;
        for (let i in borrowed) {
            total_borrowed += borrowed[i].fine;
        };
        this.setState({
            total: {
                borrowing: total_borrowing,
                borrowed: total_borrowed
            }
        });


    };

    getHistory = () => {
        fetch('/reader/showHistory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reader_id: this.props.readerID,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    info: result.info,
                    record: result.record
                });
            })
            .catch(e => alert(e));
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentDidMount() {
        // this.getHistory();
        this.classifyRecord();
    }

    render() {

        return (
            <React.Fragment>
                <TopBar />
                <div className="flex-col mid-div">
                    <Grid container spacing={24}>
                        <Grid item xs={12} className="flex-row">
                            <ReaderInfo info={this.state.info}/>
                        </Grid>
                        <Grid item xs={12} className="flex-row">
                            {/*<ReaderInfo info={this.state.info}/>*/}
                            <div className={`grow flex-col`}>
                                <div style={{marginTop: 'auto', }}>
                                    <Tabs
                                        value={this.state.value}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={this.handleChange}
                                        fullWidth
                                    >
                                        <Tab label="Borrowing" icon={<MoveToInboxOutlined />}/>
                                        <Tab label="Reserving" icon={<AssignmentOutlined />}/>
                                        <Tab label="Borrowed" icon={<HistoryOutlined />}/>
                                    </Tabs>
                                </div>
                            </div>
                        </Grid>
                        {this.state.value === 0 &&
                        <BorrowingTableWrapped records={this.state.classified.borrowing} total={this.state.total.borrowing}/>}
                        {this.state.value === 1 &&
                        <ReservingTableWrapped records={this.state.classified.reserving}/>}
                        {this.state.value === 2 &&
                        <BorrowedTableWrapped records={this.state.classified.borrowed} total={this.state.total.borrowed}/>}
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

class ReaderInfo extends React.Component {
    render() {
        return (
            <Paper style={{padding: 20}} className="grow">
                <Divider />
                <div className="flex-row" style={{margin: 5}}>
                    <AccountBoxOutlined
                        fontSize="large"
                        style={{marginTop: 'auto', marginBottom: 'auto', margin: 5}}
                    />
                    <Typography
                        variant="title"
                        style={{marginTop: 'auto', marginBottom: 'auto'}}
                    >
                        name
                    </Typography>
                    <div className="grow"/>
                    <Typography variant="title" color="textSecondary" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        {this.props.info.name}
                        </Typography>
                </div>
                <Divider />
                <div className="flex-row" style={{margin: 5}}>
                    <EmailOutlined
                        fontSize="large"
                        style={{marginTop: 'auto', marginBottom: 'auto', margin: 5}}
                    />
                    <Typography
                        variant="title"
                        style={{marginTop: 'auto', marginBottom: 'auto'}}
                    >
                        email
                    </Typography>
                    <div className="grow"/>
                    <Typography variant="title" color="textSecondary" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        {this.props.info.email}
                        </Typography>
                </div>
                <Divider />
                <div className="flex-row" style={{margin: 5}}>
                    <DateRangeOutlined
                        fontSize="large"
                        style={{marginTop: 'auto', marginBottom: 'auto', margin: 5}}
                    />
                    <Typography
                        variant="title"
                        style={{marginTop: 'auto', marginBottom: 'auto'}}
                    >
                        birth
                    </Typography>
                    <div className="grow"/>
                    <Typography variant="title" color="textSecondary" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        {this.props.info.birth}
                        </Typography>
                </div>
                <Divider />
                <div className="flex-row" style={{margin: 5}}>
                    <PhoneOutlined
                        fontSize="large"
                        style={{marginTop: 'auto', marginBottom: 'auto', margin: 5}}
                    />
                    <Typography
                        variant="title"
                        style={{marginTop: 'auto', marginBottom: 'auto'}}
                    >
                        phone
                    </Typography>
                    <div className="grow"/>
                    <Typography variant="title" color="textSecondary" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        {this.props.info.tel}
                        </Typography>
                </div>
                <Divider />
            </Paper>
        );
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
    footer: {
        backgroundColor: blue[200],
        color: theme.palette.common.black,
        fontSize: 16,
    }
}))(TableCell);

const styles = theme => ({
    head: {

    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: blue[100],
        },
        '&:nth-of-type(even)': {
            backgroundColor: blue[50],
        },
    },
});

const BorrowingTable = props => 
    <Grid item xs={12}>
        <Paper>
            <Table>
                <TableHead className={props.classes.head}>
                    <TableRow>
                        <CustomTableCell>Title</CustomTableCell>
                        <CustomTableCell numeric>Author</CustomTableCell>
                        <CustomTableCell numeric>Barcode</CustomTableCell>
                        <CustomTableCell numeric>Borrow Time</CustomTableCell>
                        <CustomTableCell numeric>Fine ($)</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.records.map(book => {
                        return (
                            <TableRow className={props.classes.row} key={book.id}>
                                <CustomTableCell component="th" scope="row">
                                    {book.title}
                                </CustomTableCell>
                                <CustomTableCell numeric>{book.author}</CustomTableCell>
                                <CustomTableCell numeric>{book.barcode}</CustomTableCell>
                                <CustomTableCell numeric>{book.borrowTime}</CustomTableCell>
                                <CustomTableCell numeric>{book.fine}</CustomTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <CustomTableCell>Total fine ($)</CustomTableCell>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric/>
                        <CustomTableCell numeric>{props.total}</CustomTableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Paper>
    </Grid>

class ReservingTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Title</CustomTableCell>
                                <CustomTableCell numeric>Author</CustomTableCell>
                                <CustomTableCell numeric>Barcode</CustomTableCell>
                                <CustomTableCell numeric>Reserve Time</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.records.map(book => {
                                return (
                                    <TableRow className={classes.row} key={book.id}>
                                        <CustomTableCell component="th" scope="row">
                                            {book.title}
                                        </CustomTableCell>
                                        <CustomTableCell numeric>{book.author}</CustomTableCell>
                                        <CustomTableCell numeric>{book.barcode}</CustomTableCell>
                                        <CustomTableCell numeric>{book.reserveTime}</CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        );
    }
};

class BorrowedTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Title</CustomTableCell>
                                <CustomTableCell numeric>Author</CustomTableCell>
                                <CustomTableCell numeric>Barcode</CustomTableCell>
                                <CustomTableCell numeric>Borrow Time</CustomTableCell>
                                <CustomTableCell numeric>Return Time</CustomTableCell>
                                <CustomTableCell numeric>Fine ($)</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.records.map(book => {
                                return (
                                    <TableRow className={classes.row} key={book.id}>
                                        <CustomTableCell component="th" scope="row">
                                            {book.title}
                                        </CustomTableCell>
                                        <CustomTableCell numeric>{book.author}</CustomTableCell>
                                        <CustomTableCell numeric>{book.barcode}</CustomTableCell>
                                        <CustomTableCell numeric>{book.borrowTime}</CustomTableCell>
                                        <CustomTableCell numeric>{book.returnTime}</CustomTableCell>
                                        <CustomTableCell numeric>{book.fine}</CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <CustomTableCell>Total fine ($)</CustomTableCell>
                                <CustomTableCell numeric/>
                                <CustomTableCell numeric/>
                                <CustomTableCell numeric/>
                                <CustomTableCell numeric/>
                                <CustomTableCell numeric>{this.props.total}</CustomTableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </Grid>
        );
    }
};

const BorrowingTableWrapped = withStyles(styles)(BorrowingTable);
const BorrowedTableWrapped = withStyles(styles)(BorrowedTable);
const ReservingTableWrapped = withStyles(styles)(ReservingTable);