import React from "react";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {green} from "@material-ui/core/colors";
import {Assignment} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {fetchNotification, fetchAddNotification, fetchUpdateNotification, fetchDeleteNotification} from "../../../../mock";
import Button from "@material-ui/core/Button/Button";
import AddDialog from "./components/addDialog";
import EditDialog from "./components/editDialog";
import DeleteDialog from "./components/deleteDialog";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import MessageDialog from "../messageDialog";
import * as intl from "react-intl-universal";
import Typography from "@material-ui/core/Typography/Typography";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import Table from "@material-ui/core/Table/Table";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {TableCell} from "@material-ui/core";

const isSearched = searchTerm => item =>
    item.message.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.timestamp.includes(searchTerm)

export default class LibrarianNotifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            openEdit: undefined,
            openDelete: undefined,
            openAdd: false,
            item: undefined,
            formError: undefined,
            searchTerm: '',
            processing: false,
            page: 0,
            rowsPerPage: 9,
        };
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleSearch = e => this.setState({searchTerm: e.target.value});

    handleAdd = message => async () => {
        if (message === undefined || message.length === 0) {
            this.setState({formError: "messageEmpty"});
            return;
        }

        await this.setState({processing: true})
        const eventState = await fetchAddNotification(message);
        const announcements = await this.getNotification();
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        this.setState({
            notifications: announcements,
            openAdd: false,
            returnMessage
        })
    };

    handleEdit = (notification, message) => async () => {
        if (message === undefined || message.length === 0) {
            this.setState({formError: "messageEmpty"});
            return;
        }

        await this.setState({processing: true})
        const eventState = await fetchUpdateNotification(notification.timestamp, message);
        const announcements = await this.getNotification();
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        this.setState({
            notifications: announcements,
            openEdit: undefined,
            returnMessage
        })
    };

    handleDelete = (notification) => async () => {
        await this.setState({processing: true})
        const eventState = await fetchDeleteNotification(notification.timestamp);
        const announcements = await this.getNotification();
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        this.setState({
            notifications: announcements,
            openDelete: undefined,
            returnMessage
        })
    };

    handleOpen = (which, item) => () => {
        this.setState({[which]: true, item, processing: false})
    };

    handleClose = which => () => {
        this.setState({
            [which]: false,
            formError: undefined,
            item: undefined,
        });
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };

    clearFormError = () => {
        this.setState({formError: undefined});
    };

    changeFormat = (announcements) => {
        let changedAnnouncements = [];
        for (let i in announcements) {
            const date = new Date(announcements[i].timestamp);
            let _timestamp = {
                timestamp: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                message: announcements[i].message,
            };
            changedAnnouncements.push(_timestamp);
        }
        return changedAnnouncements;
    };

    getNotification = async () => {
        let announcements = await fetchNotification();
        let changed = this.changeFormat(announcements);
        // changed.sort((x1, x2) => x1.timestamp < x2.timestamp ? 1 : -1)
        return changed;
    };

    async componentDidMount() {
        const changed = await this.getNotification();
        this.setState({
            notifications: changed
        });
    }

    render() {
        const { notifications, rowsPerPage, page } = this.state;
        let notificationsToShow = []
        if (notifications) notificationsToShow = notifications.filter(isSearched(this.state.searchTerm))
        notificationsToShow.sort((x1, x2) => new Date(x1.timestamp) < new Date(x2.timestamp) ? 1 : -1)
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, notificationsToShow.length - page * rowsPerPage);

        const MessageLists = notificationsToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(notification =>
            <OneNotification
                key={notification.timestamp}
                notifications={notification}
                openEdit={this.handleOpen("openEdit", notification)}
                openDelete={this.handleOpen("openDelete", notification)}
            />
        );
        return (
            <div className="flex-col">
                <TopBar
                    loginUser={this.props.match.params.loginUser}
                    handleSearch={this.handleSearch}
                    lang={this.props.location.search}
                />
                <div style={{width: '100%'}} className="flex-row">
                    <Nav
                        loginUser={this.props.match.params.loginUser}
                        whichFunction={"notifications"}
                        lang={this.props.location.search}
                    />
                    <div className="grow">
                        <div className="flex-row">
                            <Typography style={{fontSize: 50, margin: "20px 0 10px 20px"}}>
                                {intl.get('reader.notification.title')}
                            </Typography>
                            <div className="grow"/>
                            <Button
                                color="secondary"
                                style={{margin: "auto 30px 20px 0"}}
                                onClick={this.handleOpen("openAdd", undefined)}
                                variant="contained"
                                size="large"
                            >
                                {intl.get('basic.add')}
                            </Button>
                        </div>
                        <List>
                            {MessageLists}
                        </List>
                        <Table>
                            <TableBody>
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 68.5 * emptyRows }}>
                                        <TableCell />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={notificationsToShow.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        rowsPerPageOptions={[9]}
                                        ActionsComponent={TablePaginationFooter}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <AddDialog handleClose={this.handleClose("openAdd")}
                                   handleAdd={this.handleAdd}
                                   clearFormError={this.clearFormError}
                                   notification={this.state.item}
                                   formError={this.state.formError}
                                   open={this.state.openAdd}
                                   processing={this.state.processing}
                        />
                        <EditDialog
                            handleClose={this.handleClose("openEdit")}
                            handleEdit={this.handleEdit}
                            clearFormError={this.clearFormError}
                            formError={this.state.formError}
                            notification={this.state.item}
                            open={this.state.openEdit}
                            processing={this.state.processing}
                        />
                        <DeleteDialog
                            handleClose={this.handleClose("openDelete")}
                            handleDelete={this.handleDelete}
                            notification={this.state.item}
                            open={this.state.openDelete}
                            processing={this.state.processing}
                        />
                        <MessageDialog
                            handleClose={this.handleClose("openSnack")}
                            open={Boolean(this.state.returnMessage)}
                            message={this.state.returnMessage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function OneNotification(props) {
    return (
        <ListItem>
            <Avatar
                style={{
                    color: '#fff',
                    backgroundColor: green[500],
                }}
            >
                <Assignment/>
            </Avatar>
            <ListItemText
                primary={props.notifications.message}
                secondary={props.notifications.timestamp}
            />
            <Button onClick={props.openEdit} color="primary">
                {intl.get('basic.update')}
            </Button>
            <Button onClick={props.openDelete} color="secondary">
                {intl.get('basic.delete')}
            </Button>
        </ListItem>
    );
}