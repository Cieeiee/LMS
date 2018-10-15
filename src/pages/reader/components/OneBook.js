import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import { LocationOnOutlined } from '@material-ui/icons'
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

const Alive = require('./alive.jpeg');

const styles = theme => ({
    card: {
        width: 900,
        height: 450,
        display: 'flex',
        // padding: theme.spacing.unit * 2,
        margin: 'auto',
    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
        flexDirection: 'column',
        flex: '1 0 auto',
        width: 300,
        // height: 250
    },
    info: {
        width: 600,
        display: 'flex',
        flexDirection: 'column',
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
    },
    grow: {
        flexGrow: 1,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
    }
});

class BookClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            success: 0
        };
    };

    handleClick = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSuccessClose = () => {
        this.setState({success: 0});
    }

    handleReserve = () => {
        this.setState({open: false});
        this.setState({success: 1});
    };

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={this.props.book.picture}
                    title={this.props.book.title}
                />
                <div className={classes.info}>
                    <CardContent>
                        <div className={classes.row}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.book.title}
                            </Typography>
                            <div className="grow"/>
                            <Typography variant="subtitle" style={{margin: 'auto'}}>
                                {this.props.book.location}
                                </Typography>
                            <LocationOnOutlined style={{margin: 'auto'}}/>
                        </div>
                        <Typography component="p" color="textSecondary">
                            {this.props.book.author}
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <div className={classes.row}>
                            <Typography component="p" color="textSecondary">
                                ISBN:
                            </Typography>
                            <Typography style={{marginLeft: 10}}>
                                {this.props.book.isbn}
                            </Typography>
                        </div>
                        <div className={classes.row}>
                            <Typography component="p" color="textSecondary">
                                price:
                            </Typography>
                            <Typography style={{marginLeft: 10}}>
                                ${this.props.book.price}
                            </Typography>
                        </div>
                        <Typography component="p" color="textSecondary">
                            introduction:
                        </Typography>
                        <Typography component="p" style={{textIndent: '2em'}}>
                            {this.props.book.introduction}
                            </Typography>
                    </CardContent>

                    <div className={classes.grow}/>

                    <div className={classes.row}>
                        <CardContent>
                            {this.props.book.remain}/{this.props.book.total}
                            </CardContent>
                        <div className={classes.grow}/>
                        <CardActions className={classes.row}>
                            <Button color="primary" onClick={this.handleClick}>
                                reserve
                            </Button>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Reserve the book?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Once you reserve the book, the book will been reserved for you in two hours.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleReserve} color="primary" autoFocus>
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={this.state.success === 1}
                                onClose={this.handleSuccessClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">Reserve successfully!</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id={"alert-dialog-description"}>
                                        You can check your reservation in your reserve history.
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </CardActions>
                    </div>
                </div>
            </Card>
        )
    };
}

BookClass.propTypes = {
    classes: PropTypes.object.isRequired,
};

const OneBook = withStyles(styles)(BookClass);

export { OneBook };
