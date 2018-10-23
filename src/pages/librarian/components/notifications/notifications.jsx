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
import {Snackbar} from "@material-ui/core";

const notifications = [
    {
        timestamp: "2018-10-22",
        message: "The time you have to return the book has been changed to five month"
    },
    {
        timestamp: "2018-10-21",
        message: "The time you have to return the book has been changed to five month"
    },
    {
        timestamp: "2018-10-20",
        message: "The time you have to return the book has been changed to five month"
    },
    {
        timestamp: "2018-10-19",
        message: "The bibliosoft library management system is open now!"
    }
];

export default class LibrarianNotifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],

            message: undefined,
            timestamp: undefined,
            openEdit: undefined,
            openDelete: undefined,
            openAdd: false,
            snackOpen: false,
            eventState: false,

            formError: undefined,
        };
    }

    handleAdd = async () => {
        if (this.state.message === undefined || this.state.message.length === 0) {
            this.setState({formError: "messageEmpty"});
            return;
        }

        const eventState = await fetchAddNotification(this.state.message);
        const announcements = await fetchNotification();

        this.setState({
            notifications: announcements,
            snackOpen: true,
            openAdd: false,
            message: undefined,
            eventState
        })
    };

    handleEdit = (notifications) => async () => {
        if (this.state.message === undefined || this.state.message.length === 0) {
            this.setState({formError: "messageEmpty"});
            return;
        }
        const eventState = await fetchUpdateNotification(notifications.timestamp, this.state.message);
        const announcements = await fetchNotification();
        this.setState({
            notifications: announcements,
            snackOpen: true,
            openEdit: undefined,
            message: undefined,
            eventState
        })
    };

    handleDelete = (notifications) => async () => {
        const eventState = await fetchDeleteNotification(notifications.timestamp);
        const announcements = await fetchNotification();
        this.setState({
            notifications: announcements,
            snackOpen: true,
            openDelete: undefined,
            message: undefined,
            eventState
        })
    };

    handleOpen = (which, value) => () => {
        this.setState({[which]: value})
    };

    handleSnackClose = () => this.setState({snackOpen: false})

    handleClose = () => {
        this.setState({
            openEdit: undefined,
            openDelete: undefined,
            openAdd: false,
            message: undefined,
            timestamp: undefined,
            formError: undefined,
        });
    };

    handleChange = which => e => {
        this.setState({[which]: e.target.value});
    };

    clearFormError = () => {
        this.setState({formError: undefined});
    };

    async componentDidMount() {
        const announcements = await fetchNotification();
        this.setState({
            notifications: announcements
        });
    }

    render() {
        const MessageLists = this.state.notifications.map(notifications =>
            <OneNotification
                key={notifications.timestamp}
                notifications={notifications}
                openEdit={this.handleOpen("openEdit", notifications)}
                openDelete={this.handleOpen("openDelete", notifications)}
            />
        );
        return (
            <div className="flex-col" style={{width: "100%"}}>
                <Button
                    color="secondary"
                    variant="outlined"
                    style={{
                        margin: "20px auto 20px auto"
                    }}
                    onClick={this.handleOpen("openAdd", true)}
                >
                    Add Notification
                </Button>
                <AddDialog handleClose={this.handleClose}
                           handleAdd={this.handleAdd}
                           handleChange={this.handleChange}
                           clearFormError={this.clearFormError}
                           message={this.state.message}
                           formError={this.state.formError}
                           open={this.state.openAdd}
                />
                <List>
                    {MessageLists}
                </List>
                <EditDialog
                    handleClose={this.handleClose}
                    handleEdit={this.handleEdit(this.state.openEdit)}
                    handleChange={this.handleChange}
                    clearFormError={this.clearFormError}
                    message={this.state.message}
                    formError={this.state.formError}
                    open={this.state.openEdit !== undefined}
                />
                <DeleteDialog
                    handleClose={this.handleClose}
                    handleDelete={this.handleDelete(this.state.openDelete)}
                    open={this.state.openDelete !== undefined}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={this.state.snackOpen}
                    autoHideDuration={1500}
                    onClose={this.handleSnackClose}
                    message={this.state.eventState? 'succeed': 'failed'}
                />
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
            <Button onClick={props.openEdit}>
                update
            </Button>
            <Button onClick={props.openDelete}>
                delete
            </Button>
        </ListItem>
    );
}