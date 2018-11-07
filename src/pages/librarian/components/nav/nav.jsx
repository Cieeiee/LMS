import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';
import {
    BookOutlined,
    AccountCircleOutlined,
    HistoryOutlined,
    NotificationsOutlined,
    EqualizerOutlined,
    SubtitlesOutlined,
} from '@material-ui/icons'
import {Link} from "react-router-dom";
import * as intl from "react-intl-universal";
import Divider from "@material-ui/core/Divider/Divider";
import {fetchBorrow, fetchDeleteBook, fetchPayFine} from "../../../../mock";
import MessageDialog from "../messageDialog";
import BorrowDialog from "./component/borrowDialog";
import DeleteDialog from "./component/deleteDialog";
import LostDialog from "./component/lostDialog";
import ReturnDialog from "./component/returnDialog";

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openBorrow: false,
            openReturn: false,
            openLost: false,
            openDelete: false,
            processing: false,
            openSnack: false,
            returnMessage: false,
            eventStatus: false,
            formError: false,
            step: 0,
            fine: undefined,
        }
    }

    handleOpen = (which) => () => {
        this.setState({
            [which]: true,
            processing: false,
            step: 0
        })
    };
    handleClose = (which) => () => {
        this.setState({
            [which]: false,
            formError: undefined,
            step: 0
        })
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };
    clearFormError = () => {
        this.setState({formError: undefined})
    }
    handlePayFine = info => async () => {
        if (info.barcode === undefined || info.barcode.length === 0) {
            this.setState({formError: "barcodeEmpty"})
            return
        }
        await this.setState({processing: true})
        const fine = await fetchPayFine(info)
        if (fine === -2) {
            this.setState({
                returnMessage: intl.get('message.barcodeError'),
                openLost: false,
                openReturn: false,
                step: 0
            })
        }
        else if (fine === -1) {
            this.setState({
                returnMessage: intl.get('message.systemError'),
                openLost: false,
                openReturn: false,
                step: 0
            })
        }
        else {
            this.setState({
                step: 1,
                processing: false,
                fine
            })
        }
    }
    handleBorrow = info => async () => {
        if (info.barcode === undefined || info.barcode.length === 0) {
            this.setState({formError: "barcodeEmpty"})
            return
        }
        if (info.type === 0 && (info.id === undefined || info.id.length === 0)) {
            this.setState({formError: "readerEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState = await fetchBorrow(info)
        let returnMessage = ''
        switch(eventState) {
            case -1:
                returnMessage = intl.get('message.readerNotExists')
                break;
            case -2:
                returnMessage = intl.get('message.excessBorrow')
                break;
            case -3:
                returnMessage = intl.get('message.notReserver')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openBorrow: false,
            openReturn: false,
            openLost: false,
            step: 0,
            returnMessage
        })
    }
    handleDelete = (id, barcode) => async () => {
        if (barcode === undefined || barcode.length === 0) {
            this.setState({formError: "barcodeEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState =  await fetchDeleteBook(id, barcode);
        let returnMessage = ''
        switch(eventState) {
            case -1:
                returnMessage = intl.get('message.bookStillBorrowed')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openDelete: false,
            returnMessage
        })
    }

    render() {
        return (
            <List style={{width: '250px', height: '100%', borderRight: '1px solid #cccccc'}}>
                <ListItem
                    button
                    selected={this.props.whichFunction === "books"}
                    component={Link} to={`/librarian/${this.props.loginUser}/books`}
                >
                    <BookOutlined/>
                    <ListItemText primary={intl.get('librarian.nav.books')} />
                </ListItem>
                <ListItem
                    button
                    selected={this.props.whichFunction === "categories"}
                    component={Link} to={`/librarian/${this.props.loginUser}/categories`}
                >
                    <SubtitlesOutlined/>
                    <ListItemText primary={intl.get('librarian.nav.categories')} />
                </ListItem>
                <ListItem
                    button
                    selected={this.props.whichFunction === "readers"}
                    component={Link} to={`/librarian/${this.props.loginUser}/readers`}
                >
                    <AccountCircleOutlined/>
                    <ListItemText primary={intl.get('librarian.nav.readers')} />
                </ListItem>
                <ListItem
                    button
                    selected={this.props.whichFunction === "history"}
                    component={Link} to={`/librarian/${this.props.loginUser}/history`}
                >
                    <HistoryOutlined/>
                    <ListItemText primary={intl.get('librarian.nav.deleteHistory')} />
                </ListItem>
                <ListItem
                    button
                    selected={this.props.whichFunction === "notifications"}
                    component={Link} to={`/librarian/${this.props.loginUser}/notifications`}
                >
                    <NotificationsOutlined/>
                    <ListItemText primary={intl.get('librarian.nav.notifications')} />
                </ListItem>
                <ListItem
                    button
                    selected={this.props.whichFunction === "summary"}
                    component={Link} to={`/librarian/${this.props.loginUser}/summary`}
                >
                    <EqualizerOutlined/>
                    <ListItemText primary={intl.get('librarian.nav.summary')} />
                </ListItem>
                <Divider/>
                <ListItem
                    button
                    onClick={this.handleOpen('openBorrow')}
                >
                    <ListItemText primary={intl.get('librarian.nav.borrowBook')} />
                </ListItem>
                <ListItem
                    button
                    onClick={this.handleOpen("openReturn")}
                >
                    <ListItemText primary={intl.get('librarian.nav.returnBook')} />
                </ListItem>
                <ListItem
                    button
                    onClick={this.handleOpen("openLost")}
                >
                    <ListItemText primary={intl.get('librarian.nav.lostBook')} />
                </ListItem>
                <ListItem
                    button
                    onClick={this.handleOpen("openDelete")}
                >
                    <ListItemText primary={intl.get('librarian.nav.deleteBook')} />
                </ListItem>
                <BorrowDialog
                    open={this.state.openBorrow}
                    handleClose={this.handleClose("openBorrow")}
                    handleBorrow={this.handleBorrow}
                    processing={this.state.processing}
                    formError={this.state.formError}
                    clearFormError={this.clearFormError}
                />
                <DeleteDialog
                    open={this.state.openDelete}
                    handleClose={this.handleClose("openDelete")}
                    handleDelete={this.handleDelete}
                    libID={this.props.loginUser}
                    processing={this.state.processing}
                    formError={this.state.formError}
                    clearFormError={this.clearFormError}
                />
                <LostDialog
                    open={this.state.openLost}
                    handleClose={this.handleClose("openLost")}
                    handleBorrow={this.handleBorrow}
                    processing={this.state.processing}
                    formError={this.state.formError}
                    clearFormError={this.clearFormError}
                    fine={this.state.fine}
                    step={this.state.step}
                    handlePayFine={this.handlePayFine}
                />
                <ReturnDialog
                    open={this.state.openReturn}
                    handleClose={this.handleClose("openReturn")}
                    handleBorrow={this.handleBorrow}
                    processing={this.state.processing}
                    formError={this.state.formError}
                    clearFormError={this.clearFormError}
                    fine={this.state.fine}
                    step={this.state.step}
                    handlePayFine={this.handlePayFine}
                />
                <MessageDialog
                    handleClose={this.handleClose("openSnack")}
                    open={Boolean(this.state.returnMessage)}
                    message={this.state.returnMessage}
                />
            </List>
        )
    }
}