import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {Notifications, History, ExitToApp, DescriptionOutlined} from '@material-ui/icons'
import NotFound from "../../notFound/notFound";
import LibraryRules from "../libraryRules";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
        marginLeft: 5,
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    growBlock: {
        flexGrow: 1,
    },
});

class IconLabelButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openRules: false,

            deposit: 300,
            fine: 0.01,
            maxReturnTime: 90,
            maxReserveTime: 2,
            maxBorrowNum: 5,
        }
    };

    getAllRules = () => {
        fetch('/showRules')
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    deposit: result.deposit,
                    fine: result.fine,
                    maxReturnTime: result.maxReturnTime,
                    maxReserveTime: result.maxReserveTime,
                    maxBorrowNum: result.maxBorrowNum,
                });
            })
            .catch(e => alert(e));
    };

    componentDidMount() {
        // this.getAllRules();
    };


    handleClose = () => {
        this.setState({openRules: false});
    };

    handleClick = () => {
        this.setState({openRules: true});
    };

    handleLogout = () => {
        fetch('/logout').catch(e => alert(e));
        window.location.href = '/';
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.topBar}>
                <Button
                    variant="outlined"
                    // color="secondary"
                    className={classes.button}
                    onClick={this.handleClick}
                >
                    Rules
                    <DescriptionOutlined className={classes.iconSmall} />
                </Button>
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
                <LibraryRules
                    open={this.state.openRules}
                    handleClose={this.handleClose}
                    rules={{
                        deposit: this.state.deposit,
                        fine: this.state.fine,
                        maxReturnTime: this.state.maxReturnTime,
                        maxReserveTime: this.state.maxReserveTime,
                        maxBorrowNum: this.state.maxBorrowNum,
                    }}
                />
            </div>
        );
    }
}

IconLabelButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

const TopButton = withStyles(styles)(IconLabelButtons);

export { TopButton }
