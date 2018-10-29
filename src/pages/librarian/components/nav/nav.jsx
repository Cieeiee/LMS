import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';
import { BookOutlined, AccountCircleOutlined, HistoryOutlined, NotificationsOutlined } from '@material-ui/icons'
import {Link} from "react-router-dom";

export default props =>
    <List style={{width: '250px', height: '100%', borderRight: '1px solid #cccccc'}}>
        <ListItem
            button
            selected={props.whichFunction === "books"}
            component={Link} to={`/librarian/${props.loginUser}/books`}
        >
            <BookOutlined/>
            <ListItemText primary='Books' />
        </ListItem>
        <ListItem
            button
            selected={props.whichFunction === "readers"}
            component={Link} to={`/librarian/${props.loginUser}/readers`}
        >
            <AccountCircleOutlined/>
            <ListItemText primary='Readers' />
        </ListItem>
        <ListItem
            button
            selected={props.whichFunction === "history"}
            component={Link} to={`/librarian/${props.loginUser}/history`}
        >
            <HistoryOutlined/>
            <ListItemText primary='Delete History' />
        </ListItem>
        <ListItem
            button
            selected={props.whichFunction === "notifications"}
            component={Link} to={`/librarian/${props.loginUser}/notifications`}
        >
            <NotificationsOutlined/>
            <ListItemText primary='Notifications' />
        </ListItem>
    </List>