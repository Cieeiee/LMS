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
import { AccountBoxOutlined, EmailOutlined, PhoneOutlined, DateRangeOutlined } from '@material-ui/icons'
import './reader.scss'
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
const ToLive = require('./components/alive.jpeg');
const BarCode = require('./components/barcode.jpg');

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
            }
        }
    }

    classifyRecord = () => {
        const borrowing = [];
        const reserving = [];
        const borrowed = [];
        for (let i in this.state.record) {
            const record = this.state.record[i];
            if (record.reserveTime !== null && record.borrowTime !== null) {
                reserving.push(record);
            }
            else if (record.borrowTime !== null && record.returnTime !== null) {
                borrowed.push(record);
            }
            else if (record.borrowTime !== null && record.returnTime === null) {
                borrowing.push(record);
            }
        };

        let total0 = {
            title: 'Total fine ($)',
            author: null,
            picture: null,
            barcode: null,
            barcode_img: null,
            borrowTime: null,
            returnTime: null,
            reserveTime: null,
            fine: 0,
        };
        for (let i in borrowing) {
            total0.fine += borrowing[i].fine;
        };
        borrowing.push(total0);

        let total1 = {
            title: 'Total fine ($)',
            author: null,
            picture: null,
            barcode: null,
            barcode_img: null,
            borrowTime: null,
            returnTime: null,
            reserveTime: null,
            fine: 0,
        };
        for (let i in borrowed) {
            total1.fine += borrowed[i].fine;
        };
        borrowed.push(total1);

        const classified = {
            borrowing: borrowing,
            reserving: reserving,
            borrowed: borrowed,
        };

        this.setState({classified: classified});
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
                <div className={"flex-col" + " " + "mid-div"}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} className="flex-row">
                            <ReaderInfo info={this.state.info}/>
                            <div style={{marginTop: 'auto', }} className="grow">
                                <Tabs
                                    value={this.state.value}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={this.handleChange}
                                    fullWidth
                                >
                                    <Tab label="Borrowing" />
                                    <Tab label="Reserving"/>
                                    <Tab label="Borrowed" />
                                </Tabs>
                            </div>
                        </Grid>
                        {this.state.value === 0 && <BorrowingTable records={this.state.classified.borrowing}/>}
                        {this.state.value === 1 && <ReservingTable records={this.state.classified.reserving}/>}
                        {this.state.value === 2 && <BorrowedTable records={this.state.classified.borrowed}/>}
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

class ReaderInfo extends React.Component {
    render() {
        return (
            <Paper style={{width: 400, padding: 20}}>
                <div className="flex-row" style={{margin: 2}}>
                    <AccountBoxOutlined
                        fontSize="large"
                        style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 2}}
                    />
                    <Typography
                        variant="title"
                        style={{marginTop: 'auto', marginBottom: 'auto'}}
                    >
                        name:
                    </Typography>
                    <div className="grow"/>
                    <Typography variant="title" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        {this.props.info.name}
                        </Typography>
                </div>
                <div className="flex-row" style={{margin: 2}}>
                    <EmailOutlined
                        fontSize="large"
                        style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 2}}
                    />
                    <Typography
                        variant="title"
                        style={{marginTop: 'auto', marginBottom: 'auto'}}
                    >
                        email:
                    </Typography>
                    <div className="grow"/>
                    <Typography variant="title" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        {this.props.info.email}
                        </Typography>
                </div>
                <div className="flex-row" style={{margin: 2}}>
                    <DateRangeOutlined
                        fontSize="large"
                        style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 2}}
                    />
                    <Typography
                        variant="title"
                        style={{marginTop: 'auto', marginBottom: 'auto'}}
                    >
                        birth:
                    </Typography>
                    <div className="grow"/>
                    <Typography variant="title" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        {this.props.info.birth}
                        </Typography>
                </div>
                <div className="flex-row" style={{margin: 2}}>
                    <PhoneOutlined
                        fontSize="large"
                        style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 2}}
                    />
                    <Typography
                        variant="title"
                        style={{marginTop: 'auto', marginBottom: 'auto'}}
                    >
                        phone:
                    </Typography>
                    <div className="grow"/>
                    <Typography variant="title" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        {this.props.info.tel}
                        </Typography>
                </div>
            </Paper>
        );
    }
}

class BorrowingTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Grid item xs={12}>
                <Typography
                    className="table-title"
                    variant="h4"
                    component="h1"
                >
                    Borrowing books
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell numeric>Author</TableCell>
                                <TableCell numeric>Barcode</TableCell>
                                <TableCell numeric>Borrow Time</TableCell>
                                <TableCell numeric>Fine ($)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.records.map(book => {
                                return (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {book.title}
                                        </TableCell>
                                        <TableCell numeric>{book.author}</TableCell>
                                        <TableCell numeric>{book.barcode}</TableCell>
                                        <TableCell numeric>{book.borrowTime}</TableCell>
                                        <TableCell numeric>{book.fine}</TableCell>
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

class ReservingTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Grid item xs={12}>
                <Typography
                    className="table-title"
                    variant="h4"
                    component="h1"
                >
                    Reserving books
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell numeric>Author</TableCell>
                                <TableCell numeric>Barcode</TableCell>
                                <TableCell numeric>Reserve Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.records.map(book => {
                                return (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {book.title}
                                        </TableCell>
                                        <TableCell numeric>{book.author}</TableCell>
                                        <TableCell numeric>{book.barcode}</TableCell>
                                        <TableCell numeric>{book.reserveTime}</TableCell>
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

        return (
            <Grid item xs={12}>
                <Typography
                    className="table-title"
                    variant="h4"
                    component="h1"
                >
                    Borrowed books
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell numeric>Author</TableCell>
                                <TableCell numeric>Barcode</TableCell>
                                <TableCell numeric>Borrow Time</TableCell>
                                <TableCell numeric>Return Time</TableCell>
                                <TableCell numeric>Fine ($)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.records.map(book => {
                                return (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {book.title}
                                        </TableCell>
                                        <TableCell numeric>{book.author}</TableCell>
                                        <TableCell numeric>{book.barcode}</TableCell>
                                        <TableCell numeric>{book.borrowTime}</TableCell>
                                        <TableCell numeric>{book.returnTime}</TableCell>
                                        <TableCell numeric>{book.fine}</TableCell>
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
