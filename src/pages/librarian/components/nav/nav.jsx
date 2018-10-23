import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';
import { BookOutlined, AccountCircleOutlined, HistoryOutlined, NotificationsOutlined } from '@material-ui/icons'

export default props => 
  <List style={{width: '250px', height: '100%', borderRight: '1px solid #cccccc'}}>
    <ListItem button selected={props.type === 0 || props.type === 4} onClick={() => props.handleClick(0)}>
        <BookOutlined/>
      <ListItemText primary='Books' />
    </ListItem>
    <ListItem button selected={props.type === 1} onClick={() => props.handleClick(1)}>
        <AccountCircleOutlined/>
      <ListItemText primary='Readers' />
    </ListItem>
    <ListItem button selected={props.type === 2} onClick={() => props.handleClick(2)}>
        <HistoryOutlined/>
      <ListItemText primary='Delete History' />
    </ListItem>
    <ListItem button selected={props.type === 3} onClick={() => props.handleClick(3)}>
        <NotificationsOutlined/>
      <ListItemText primary='Notifications' />
    </ListItem>
  </List>