import React from "react";
import {TopBar} from "../components/TopBar";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import { AccountBoxOutlined, EmailOutlined, PhoneOutlined, LocalAtmOutlined, MoveToInboxOutlined, AssignmentOutlined, HistoryOutlined } from '@material-ui/icons'
import '../reader.scss'
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {TextField, withStyles} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Switch from "@material-ui/core/Switch/Switch";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import MessageDialog from '../components/messageDialog'
import BorrowingTableWrapped from './table/BorrowingTable'
import ReservingTableWrapped from './table/ReservingTable'
import BorrowedTableWrapped from './table/BorrowedTable'

const Logo = require('../components/images/logo.jpg');
const Reader = require('../components/images/reader.jpg');

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
            info: {
                id: '18292027797',
                name: 'asd123',
                email: '529012380@qq.com',
                deposit: 300,
            },
            record:
                [
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        barcode: "2389787233",
                        borrowTime: '2017-09-23-13:12',
                        returnTime: '2017-10-16-15:38',
                        reserveTime: null,
                        fine: 2.23
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        barcode: "2389787233",
                        borrowTime: '2017-09-23-13:12',
                        returnTime: '2017-10-16-15:38',
                        reserveTime: null,
                        fine: 1.02
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        barcode: "2389787233",
                        borrowTime: '2017-09-23-13:12',
                        returnTime: null,
                        reserveTime: null,
                        fine: 3
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        barcode: "2389787233",
                        borrowTime: '2017-09-23-13:12',
                        returnTime: null,
                        reserveTime: null,
                        fine: 0
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        barcode: "2389787233",
                        borrowTime: null,
                        returnTime: null,
                        reserveTime: '2017-09-24-15:05',
                        fine: 0
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        barcode: "2389787233",
                        borrowTime: '2017-09-24-16:03',
                        returnTime: null,
                        reserveTime: '2017-09-24-15:05',
                        fine: 0
                    },
                    {
                        title: 'To live',
                        author: 'Yu Hua',
                        barcode: "2389787233",
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
            },
            tabValue: 0,
            openUpdate: false,
            formError: undefined,

            name: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            changePassword: false,

            returnMessage: undefined,

            loginUser: undefined,
        }
    }

    init = () => {
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
        fetch(`/searchReader?id=${this.state.loginUser}`)
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    info: result.info,
                    record: result.record
                });
            })
            .catch(e => alert(e));
    };

    handleChange = (which) => (event, value) => {
        if (which === "tabValue")
            this.setState({[which]: value });
        else if (which === "changePassword")
            this.setState({[which]: event.target.checked});
        else
            this.setState({[which]: event.target.value});
    };

    handleOpen = (which) => () => {
        this.setState({[which]: true});

        this.setState({
            name: this.state.info.name,
            email: this.state.info.email,
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

    handleUpdate = () => {
        if (this.state.name === undefined) {
            this.setState({formError: "nameEmpty"});
            return;
        }
        if (this.state.email === undefined) {
            this.setState({formError: "emailEmpty"});
            return;
        }
        if (this.state.changePassword && this.state.password === undefined) {
            this.setState({formError: "passwordEmpty"});
            return;
        }
        if (this.state.changePassword && this.state.password !== this.state.confirmPassword) {
            this.setState({formError: "passwordNotSame"});
            return;
        }

        this.handleClose("openUpdate")();

        let status = 0;
        fetch('/updateReader', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.loginUser,
                name: this.state.name,
                password: this.state.password,
                email: this.state.email,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                status = result.state;
            })
            .catch(e => alert(e));

        if (status === 0) {
            this.setState({
                returnMessage: "Update failed."
            });
        }
        else {
            const updatedInfo = {
                id: this.state.info.id,
                name: this.state.name,
                email: this.state.email,
                deposit: this.state.info.deposit,
            };
            this.setState({
                info: updatedInfo,
                returnMessage: "Update success."
            });
        }
    };

    componentDidMount() {
        this.getHistory();
        this.init();

        this.setState({loginUser: this.props.match.params.loginUser});
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <TopBar loginUser={this.state.loginUser}/>
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
                                open={this.state.openUpdate}
                                changePassword={this.state.changePassword}
                                formError={this.state.formError}
                                info={this.state.info}
                                name={this.state.name}
                                email={this.state.email}
                                password={this.state.password}
                                confirmPassword={this.state.confirmPassword}
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
                                    {/*<ReaderInfo info={this.state.info}/>*/}
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
                                {this.state.tabValue === 0 &&
                                <BorrowingTableWrapped records={this.state.classified.borrowing} total={this.state.total.borrowing}/>}
                                {this.state.tabValue === 1 &&
                                <ReservingTableWrapped records={this.state.classified.reserving}/>}
                                {this.state.tabValue === 2 &&
                                <BorrowedTableWrapped records={this.state.classified.borrowed} total={this.state.total.borrowed}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

function ReaderInfo(props) {
    return (
        <Card className="flex-row">
            <CardMedia
                style={{
                    width: 200,
                }}
                image={Reader}
                title="Reader information"
            />
            <CardActionArea onClick={props.handleOpen}>
                <CardContent
                    style={{
                        width: 200,
                    }}
                >
                    <div className="flex-row">
                        <AccountBoxOutlined className="left-icon"/>
                        <Typography
                            variant="h5" color="textPrimary"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            {props.info.name}
                        </Typography>
                    </div>

                    <div className="flex-row">
                        <EmailOutlined className="left-icon"/>
                        <Typography
                            variant="h5" color="textPrimary"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            {props.info.email}
                        </Typography>
                    </div>

                    <div className="flex-row">
                        <PhoneOutlined className="left-icon"/>
                        <Typography
                            variant="h5" color="textPrimary"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            {props.info.id}
                        </Typography>
                    </div>

                    <div className="flex-row">
                        <LocalAtmOutlined className="left-icon"/>
                        <Typography
                            variant="h5" color="textPrimary"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            {props.info.deposit}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

function UpdateReaderInfoDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">Update your information.</DialogTitle>
            <DialogContent>
                <DialogContentText>

                </DialogContentText>
                <TextField
                    error={props.formError === "nameEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "nameEmpty" ? "the name can not be empty!" : "Name"}
                    fullWidth
                    defaultValue={props.info.name !== undefined && props.info.name}
                    value={props.name}
                    onChange={props.handleChange("name")}
                    // variant="outlined"
                />
                <TextField
                    error={props.formError === "emailEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "emailEmpty" ? "the email can not be empty!" : "Email"}
                    type="email"
                    fullWidth
                    defaultValue={props.info.email !== undefined && props.info.email}
                    value={props.email}
                    onChange={props.handleChange("email")}
                    // variant="outlined"
                />
                { props.changePassword &&
                <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            "The passwords are not same!" : props.formError === "passwordEmpty" ?
                            "The passwords can not be empty" : "Password"
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="password"
                    fullWidth
                    value={props.password}
                    onChange={props.handleChange("password")}
                />
                }
                { props.changePassword &&
                <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            "The passwords are not same!" : props.formError === "passwordEmpty" ?
                            "The passwords can not be empty" : "Confirm Password"
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="password"
                    fullWidth
                    value={props.confirmPassword}
                    onChange={props.handleChange("confirmPassword")}
                />
                }

            </DialogContent>
            <DialogActions>
                <FormGroup style={{marginLeft: 20}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.changePassword}
                                onClick={props.handleChange("changePassword")}
                                value="changePassword"
                                color="primary"
                            />
                        }
                        label={"change password"}
                    />
                </FormGroup>
                <div className="grow"/>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const ReaderHistory = withStyles(styles)(ReaderHistoryClass);
export default ReaderHistory