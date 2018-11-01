import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LocationOnOutlined } from '@material-ui/icons'
import * as intl from "react-intl-universal";

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
});

function BookClass(props) {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                className={classes.media}
                image={props.book.picture}
                title={props.book.title}
            />
            <div className={classes.info}>
                <div className="flex-row">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.book.title}
                        </Typography>
                        <Typography component="p" color="textSecondary">
                            {props.book.author}
                        </Typography>
                    </CardContent>
                    <div className="grow"/>
                    <CardContent>
                        <div className="flex-row" style={{marginBottom: 10}}>
                            <Typography variant="subtitle" style={{margin: 'auto'}}>
                                {props.book.location}
                            </Typography>
                            <LocationOnOutlined style={{margin: 'auto'}}/>
                        </div>
                    </CardContent>
                </div>

                <CardContent>
                    <div className="flex-row">
                        <div className="flex-col">
                            <Typography component="p" color="textSecondary">
                                ISBN:
                            </Typography>
                            <Typography component="p" color="textSecondary">
                                {intl.get("form.price")}:
                            </Typography>
                            <Typography component="p" color="textSecondary">
                                {intl.get("form.category")}:
                            </Typography>
                        </div>
                        <div className="flex-col" style={{marginLeft: 20}}>
                            <Typography>
                                {props.book.isbn}
                            </Typography>
                            <Typography>
                                ${props.book.price}
                            </Typography>
                            <Typography>
                                {props.book.category}
                            </Typography>
                        </div>
                    </div>
                    <Typography component="p" color="textSecondary">
                        {intl.get("form.introduction")}:
                    </Typography>
                    <Typography component="p" style={{textIndent: '2em'}}>
                        {props.book.introduction}
                    </Typography>
                </CardContent>

                <div className={classes.grow}/>

                <div className="flex-row">
                    <CardContent className="flex-row">
                        <Button color="primary" disabled>
                            {intl.get("form.remain")}: {props.book.remain}
                        </Button>
                        <Button color="primary" disabled>
                            {intl.get("form.total")}: {props.book.total}
                        </Button>
                    </CardContent>
                    <div className={classes.grow}/>
                    <CardActions className="flex-row">
                        <Button color="primary" onClick={props.handleOpen("openReserve", props.book)}>
                            {intl.get("reader.searched.reserve")}
                        </Button>
                    </CardActions>
                </div>
            </div>
        </Card>
    );
}

BookClass.propTypes = {
    classes: PropTypes.object.isRequired,
};

const OneBook = withStyles(styles)(BookClass);

export { OneBook };
