import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import { Notifications, History, ExitToApp } from '@material-ui/icons'
import NotFound from "../../notFound/notFound";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10
    },
    growBlock: {
        flexGrow: 1,
    },
});

class IconLabelButtons extends React.Component {
    constructor(props) {
        super(props);

    }

    handleLogout = () => {
        fetch('/logout').catch(e => alert(e));
        window.location.href = '/';
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.topBar}>
                <div className={classes.growBlock}/>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    component={Link} to='/reader/history'
                >
                    History
                    <History className={classes.iconSmall} />
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    component={Link} to='/reader/notification'
                >
                    Notification
                    <Notifications className={classes.iconSmall}/>
                </Button>
                <Button
                    variant="outlined"
                    color="default"
                    className={classes.button}
                    onClick={this.handleLogout}
                >
                    Logout
                    <ExitToApp className={classes.iconSmall} />
                </Button>
            </div>
        );
    }
}

IconLabelButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

const TopButton = withStyles(styles)(IconLabelButtons);

export { TopButton }
