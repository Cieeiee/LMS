import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {Notifications, ExitToApp, DescriptionOutlined, AccountCircleOutlined, VpnKeyOutlined} from '@material-ui/icons'
import LibraryRules from "./libraryRules";
import {serverReader} from "../../../mock/config";
import * as intl from "react-intl-universal";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Menu from "@material-ui/core/Menu/Menu";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {fetchShowRules} from "../../../mock";

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
            openMenu: false,
            anchorEl: null,
        }
    };

    getAllRules = async () => {
        const result = await fetchShowRules()
        this.setState({
            deposit: result.deposit,
            fine: result.fine,
            maxReturnTime: result.maxReturnTime,
            maxReserveTime: result.maxReserveTime,
            maxBorrowNum: result.maxBorrowNum,
        });
    };

    componentDidMount() {
        this.getAllRules();
    };


    handleClose = which => () => {
        this.setState({
            [which]: false,
            anchorEl: null,
        });
    };
    handleOpen = which => event => {
        this.setState({
            [which]: true,
            anchorEl: event.currentTarget
        });
    };
    handleLanguage = which => () => {
        window.location.search = `?lang=${which}`;
        this.handleClose("openMenu")();
    }
    handleLogout = () => window.location.href = '/'

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.topBar}>
                <IconButton
                    aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    variant="outlined"
                    className={classes.button}
                    onClick={this.handleOpen("openMenu")}
                >
                    {intl.get('basic.language')}
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.openMenu}
                    onClose={this.handleClose("openMenu")}
                >
                    <MenuItem onClick={this.handleLanguage("en-US")}>
                        English
                    </MenuItem>
                    <MenuItem onClick={this.handleLanguage("zh-CN")}>
                        中文
                    </MenuItem>
                </Menu>
                <Button
                    // variant="outlined"
                    // color="secondary"
                    className={classes.button}
                    onClick={() => this.setState({"openRules": true, "openMenu": false})}
                >
                    {intl.get("reader.topButton.rules")}
                    <DescriptionOutlined className={classes.iconSmall} />
                </Button>
                <div className={classes.growBlock}/>
                {this.props.loginUser !== "guest" && <Button
                    // variant="outlined"
                    color="secondary"
                    className={classes.button}
                    component={Link} to={`/reader/${this.props.loginUser}/history`}
                >
                    {intl.get("reader.topButton.profile")}
                    <AccountCircleOutlined className={classes.iconSmall} />
                </Button>}
                <Button
                    // variant="outlined"
                    color="primary"
                    className={classes.button}
                    component={Link} to={`/reader/${this.props.loginUser}/notification`}
                >
                    {intl.get("reader.topButton.notification")}
                    <Notifications className={classes.iconSmall}/>
                </Button>
                {this.props.loginUser !== "guest" ? <Button
                    // variant="outlined"
                    color="default"
                    className={classes.button}
                    onClick={this.handleLogout}
                >
                    {intl.get("reader.topButton.logout")}
                    <ExitToApp className={classes.iconSmall} />
                </Button> :
                    <Button
                        // variant="outlined"
                        color="default"
                        className={classes.button}
                        onClick={() => window.location.href = '/login'}
                    >
                        {intl.get("reader.topButton.login")}
                        <VpnKeyOutlined className={classes.iconSmall} />
                    </Button>
                }
                <LibraryRules
                    open={this.state.openRules}
                    handleClose={this.handleClose("openRules")}
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
