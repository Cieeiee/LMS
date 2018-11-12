import React from "react";
import {TopBar} from "../components/TopBar";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import { MoveToInboxOutlined, AssignmentOutlined, HistoryOutlined } from '@material-ui/icons'
import '../reader.scss'
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {withStyles} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import MessageDialog from '../components/messageDialog'
import BorrowingTableWrapped from './components/BorrowingTable'
import ReservingTableWrapped from './components/ReservingTable'
import BorrowedTableWrapped from './components/BorrowedTable'
import ReaderInfo from "./components/ReaderInfo";
import UpdateReaderInfoDialog from "./components/UpdateReaderInfoDialog";
import * as intl from "react-intl-universal";
import {fetchCancelReserve, fetchReaderUpdateInfo, fetchSearchReader} from "../../../mock";
import CancelReserveDialog from "./components/CancelReserve";

const Logo = require('../../../images/logo.jpg');

const styles = theme => ({
    tabsRoot: {
        borderBottom: '2px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: blue[500],
    },
    tabRoot: {
        fontWeight: theme.typography.fontWeightRegular,
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
            info: [],
            borrowingHistory: [],
            reservingHistory: [],
            borrowedHistory: [],
            borrowedTotal: undefined,
            borrowingTotal: undefined,
            tabValue: 0,
            openUpdate: false,
            openCancelReserve: false,
            item: undefined,
            formError: undefined,

            name: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,

            changePassword: false,
            updateStatus: undefined,
            returnMessage: undefined,
            processing: false,
        }
    }

    getHistory = async () => {
        const result = await fetchSearchReader(this.props.match.params.loginUser)
        await this.classifyHistory(result.list)
        if (result) {
            this.setState({
                info: result.info,
                borrowedTotal: result.borrowedTotal,
                borrowingTotal: result.borrowingTotal
            });
        }
    };
    classifyHistory = (history) => {
        let borrowing = [], reserving = [], borrowed = [];
        for (let h of history) {
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

    handleChange = (which) => (event, value) => {
        if (which === "tabValue")
            this.setState({[which]: value });
        else if (which === "changePassword")
            this.setState({[which]: event.target.checked});
        else
            this.setState({[which]: event.target.value});
    };

    handleOpen = (which, item) => () => {
        if (item) this.setState({item})
        this.setState({[which]: true, processing: false});

        this.setState({
            name: this.state.info !== undefined? this.state.info.name: null,
            email: this.state.info !== undefined? this.state.info.email: null,
        });
    };

    handleClose = (which) => () => {
        if (which === "returnMessage") {
            this.setState({[which]: undefined})
        }
        else {
            this.setState({
                [which]: false,
                formError: undefined,
            });
        }
    };

    handleClearFormError = () => {
        this.setState({formError: undefined});
    };

    handleUpdate = async () => {
        if (this.state.name === undefined || this.state.name.length === 0) {
            this.setState({formError: "nameEmpty"});
            return;
        }
        if (this.state.email === undefined || this.state.email.length === 0) {
            this.setState({formError: "emailEmpty"});
            return;
        }
        const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!emailPattern.test(this.state.email)) {
            this.setState({formError: "emailIncorrect"});
            return;
        }
        if (this.state.changePassword && (this.state.password === undefined || this.state.name.length === 0)) {
            this.setState({formError: "passwordEmpty"});
            return;
        }
        if (this.state.changePassword && this.state.password !== this.state.confirmPassword) {
            this.setState({formError: "passwordNotSame"});
            return;
        }

        this.setState({processing: true})
        const eventState = await fetchReaderUpdateInfo(this.props.match.params.loginUser,
                                                    this.state.name, this.state.email, this.state.password)
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        await this.setState({returnMessage, openUpdate: false})
        if (returnMessage) {
            const updatedInfo = {
                id: this.state.info.id,
                name: this.state.name,
                email: this.state.email,
                deposit: this.state.info.deposit,
            };
            this.setState({
                info: updatedInfo
            })
        }
    };
    handleCancelReserve = (id, barcode, reserveTime) => async () => {
        this.setState({processing: true})
        const eventState = await fetchCancelReserve(id, barcode, reserveTime)
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        this.setState({
            returnMessage,
            openCancelReserve: false
        })
        this.getHistory()
    }

    componentWillMount() {
        this.getHistory();
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <TopBar loginUser={this.props.match.params.loginUser}/>
                <div className="flex-col mid-div">
                    <Grid container spacing={24}>
                        <Grid item xs={12} className="flex-row">
                            <div className='top-img' style={{backgroundImage: `url(${Logo})`}} />
                            <div className="grow"/>
                            <ReaderInfo
                                info={this.state.info}
                                handleOpen={this.handleOpen("openUpdate")}
                            />
                            <UpdateReaderInfoDialog
                                handleClose={this.handleClose("openUpdate")}
                                handleUpdate={this.handleUpdate}
                                handleChange={this.handleChange}
                                handleClearFormError={this.handleClearFormError}
                                open={this.state.openUpdate}
                                changePassword={this.state.changePassword}
                                formError={this.state.formError}
                                info={this.state.info}
                                name={this.state.name}
                                email={this.state.email}
                                password={this.state.password}
                                confirmPassword={this.state.confirmPassword}
                                processing={this.state.processing}
                            />
                            <MessageDialog
                                handleClose={this.handleClose("returnMessage")}
                                open={this.state.returnMessage !== undefined}
                                message={this.state.returnMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid item xs={12} className="flex-row">
                                    <div className="grow flex-col">
                                        <div style={{marginTop: 'auto'}}>
                                            <Tabs
                                                value={this.state.tabValue}
                                                textColor="primary"
                                                indicatorColor="primary"
                                                onChange={this.handleChange("tabValue")}
                                                fullWidth
                                                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                            >
                                                <Tab
                                                    label={intl.get("reader.history.borrowing")}
                                                    icon={<MoveToInboxOutlined />}
                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                />
                                                <Tab
                                                    label={intl.get("reader.history.reserving")}
                                                    icon={<AssignmentOutlined />}
                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                />
                                                <Tab
                                                    label={intl.get("reader.history.borrowed")}
                                                    icon={<HistoryOutlined />}
                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                />
                                            </Tabs>
                                        </div>
                                    </div>
                                </Grid>
                                {this.state.tabValue === 0 &&
                                <BorrowingTableWrapped records={this.state.borrowingHistory} total={this.state.borrowingTotal}/>}
                                {this.state.tabValue === 1 &&
                                <ReservingTableWrapped
                                    records={this.state.reservingHistory}
                                    handleOpen={this.handleOpen}
                                />}
                                {this.state.tabValue === 2 &&
                                <BorrowedTableWrapped records={this.state.borrowedHistory} total={this.state.borrowedTotal}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <CancelReserveDialog
                    open={this.state.openCancelReserve}
                    handleClose={this.handleClose("openCancelReserve")}
                    handleCancelReserve={this.handleCancelReserve}
                    reader={this.props.match.params.loginUser}
                    book={this.state.item}
                    processing={this.state.processing}
                />
            </React.Fragment>
        );
    }
}

const ReaderHistory = withStyles(styles)(ReaderHistoryClass);
export default ReaderHistory