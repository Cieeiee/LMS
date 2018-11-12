import React from "react";
import "../reader.scss"
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {Assignment} from '@material-ui/icons'
import {TopBar} from "../components/TopBar";
import {green} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography/Typography";
import * as intl from "react-intl-universal";
import {fetchShowNotification} from "../../../mock";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import {TableCell} from "@material-ui/core";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../mock/tablePaginationFooter";
import Table from "@material-ui/core/Table/Table";

export default class ReaderNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            page: 0,
            rowsPerPage: 8,
        };
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    async componentDidMount() {
        const notifications = await fetchShowNotification()
        this.setState({notifications})
    }

    render() {
        const { notifications, rowsPerPage, page } = this.state;
        let notificationsToShow = []
        if (notifications) notificationsToShow = notifications
        notificationsToShow.sort((x1, x2) => new Date(x1.timestamp) < new Date(x2.timestamp) ? 1 : -1)
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, notificationsToShow.length - page * rowsPerPage);

        const MessageLists = notificationsToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(notification =>
            <OneNotification
                key={notification.timestamp}
                notification={notification}
            />
        );
        return (
            <React.Fragment>
                <TopBar loginUser={this.props.match.params.loginUser}/>
                <div className="flex-col mid-div">
                    <div className="flex-row"
                         style={{marginBottom: 10}}
                    >
                        <Typography style={{fontSize: 50, marginLeft: 5}} className="col-mid">
                            {intl.get("reader.notification.title")}
                        </Typography>
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
                                    ActionsComponent={TablePaginationFooter}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </React.Fragment>
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
                primary={props.notification.message}
                secondary={props.notification.timestamp}
            />
        </ListItem>
    );
}