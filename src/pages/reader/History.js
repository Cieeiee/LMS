import React from "react";
import {TopBar} from "./components/TopBar";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import { AccountBoxOutlined, EmailOutlined, PhoneOutlined, DateRangeOutlined, MoveToInboxOutlined, AssignmentOutlined, HistoryOutlined } from '@material-ui/icons'
import './reader.scss'
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import Divider from "@material-ui/core/Divider/Divider";
import BorrowingTableWrapped from './components/BorrowingTable'
import ReservingTableWrapped from './components/ReservingTable'
import BorrowedTableWrapped from './components/BorrowedTable'
import {withStyles} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";

const ToLive = require('./components/images/alive.jpeg');
const BarCode = require('./components/images/barcode.jpg');
const Logo = require('./components/images/logo.jpg');

const styles = theme => ({
    tabsRoot: {
        borderBottom: '2px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: blue[500],
    },
    tabRoot: {
        // textTransform: 'initial',
        fontWeight: theme.typography.fontWeightRegular,
        // marginRight: theme.spacing.unit * 4,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: blue[300],
            opacity: 1,
        },
        '&$tabSelected': {
            color: blue[500],
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: blue[500],
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

class ReaderHistoryClass extends React.Component {
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
        fetch(`/reader/showHistory/?reader_id=${this.props.readerID}`)
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
        const {classes} = this.props;

        return (
            <React.Fragment>
                <TopBar />
                <div className="flex-col mid-div">
                    <Grid container spacing={24}>
                        <Grid item xs={12} className="flex-row">
                            <div className='top-img' style={{backgroundImage: `url(${Logo})`}} />
                            <div className="grow"/>
                            <ReaderInfo info={this.state.info}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid item xs={12} className="flex-row">
                                    {/*<ReaderInfo info={this.state.info}/>*/}
                                    <div className="grow flex-col">
                                        <div style={{marginTop: 'auto'}}>
                                            <Tabs
                                                value={this.state.value}
                                                textColor="primary"
                                                indicatorColor="primary"
                                                onChange={this.handleChange}
                                                fullWidth
                                                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                            >
                                                <Tab
                                                    label="Borrowing"
                                                    icon={<MoveToInboxOutlined />}
                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                />
                                                <Tab
                                                    label="Reserving"
                                                    icon={<AssignmentOutlined />}
                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                />
                                                <Tab
                                                    label="Borrowed"
                                                    icon={<HistoryOutlined />}
                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                />
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
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

class ReaderInfo extends React.Component {
    render() {
        return (
            <div>
                <div className="flex-row">
                    <Typography
                        variant="h5" color="textPrimary"
                        style={{margin: 'auto 0 auto auto'}}
                    >
                        {this.props.info.name}
                    </Typography>
                    <AccountBoxOutlined
                        style={{margin: 5}}
                    />
                </div>

                <div className="flex-row">
                    <Typography
                        variant="h5" color="textPrimary"
                        style={{margin: 'auto 0 auto auto'}}
                    >
                        {this.props.info.email}
                    </Typography>
                    <EmailOutlined
                        style={{margin: 5}}
                    />
                </div>

                <div className="flex-row">
                    <Typography
                        variant="h5" color="textPrimary"
                        style={{margin: 'auto 0 auto auto'}}
                    >
                        {this.props.info.birth}
                    </Typography>
                    <DateRangeOutlined
                        style={{margin: 5}}
                    />
                </div>

                <div className="flex-row">
                    <Typography
                        variant="h5" color="textPrimary"
                        style={{margin: 'auto 0 auto auto'}}
                    >
                        {this.props.info.tel}
                    </Typography>
                    <PhoneOutlined
                        style={{margin: 5}}
                    />
                </div>
            </div>
        );
    }
}

const ReaderHistory = withStyles(styles)(ReaderHistoryClass);
export default ReaderHistory