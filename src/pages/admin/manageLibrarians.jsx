import React from "react";
import {TopBar} from "./components/TopBar";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import {TextField, withStyles} from "@material-ui/core";
import blue from "@material-ui/core/es/colors/blue";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import { CreateOutlined, DeleteOutlined, PeopleOutlined } from "@material-ui/icons"
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Typography from "@material-ui/core/Typography/Typography";
import './admin.scss'

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class ManageLibrariansClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            librarians: [
                {
                    name: 'xzcq123',
                    email: '5124925467@qq.com'
                },
                {
                    name: 'xq',
                    email: '1231847819@qq.com'
                },
                {
                    name: 'zsljfd',
                    email: '1509481267@qq.com'
                },
                {
                    name: 'xz23',
                    email: '1294535467@qq.com'
                },
            ],
            openDelete: undefined,
            openEdit: undefined,
            openAdd: false,
            returnMessage: undefined,

            editEmail: undefined,
            editPassword: undefined,
            editConfirmPassword: undefined,
            addID: undefined,
            addEmail: undefined,
            addPassword: undefined,
            addConfirmPassword: undefined,

            formError: undefined,
        }
    }

    handleOpen = (which, account) => () => {
        this.setState({[which]: account});
    };

    handleClose = () => {
        this.setState({
            openDelete: undefined,
            openEdit: undefined,
            openAdd: false,
            returnMessage: undefined,
            editEmail: undefined,
            editPassword: undefined,
            editConfirmPassword: undefined,
            addID: undefined,
            addEmail: undefined,
            addPassword: undefined,
            addConfirmPassword: undefined,
            passwordNotEqual: false,
            formError: undefined,
        });
    };


    handleDelete = (librarian) => () => {
        this.handleClose();

        // fetch('/admin/deleteLibrarian', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: librarian.name,
        //     })
        // })
        //     .then(Response => Response.json())
        //     .then(result => {
        //         this.setState({
        //             status: result.state,
        //         });
        //     })
        //     .catch(e => alert(e));
        this.setState({status: 1});
        if (this.status === 0) {
            this.setState({
                returnMessage: "Delete failed."
            });
        }
        else {
            const updated_librarians = this.state.librarians.filter(lib =>
                lib.name !== librarian.name
            );
            this.setState({
                librarians: updated_librarians,
                returnMessage: "Delete success."
            });
        }
    };

    handleChange = which => event => {
        this.setState({
            [which]: event.target.value,
        })
    };

    handleEdit = (librarian) => () => {
        if (this.state.editPassword !== this.state.editConfirmPassword) {
            this.setState({formError: "passwordNotSame"});
            return;
        }
        this.handleClose();

        // fetch('/admin/updateLibrarian', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: this.state.editEmail,
        //         password: this.state.editPassword
        //     })
        // })
        //     .then(Response => Response.json())
        //     .then(result => {
        //         this.setState({
        //             status: result.state,
        //         });
        //     })
        //     .catch(e => alert(e));

        this.setState({status: 1});
        if (this.status === 0) {
            this.setState({
                returnMessage: "Update failed."
            });
        }
        else {
            const updated_librarians = this.state.librarians;
            for (let i in updated_librarians) {
                if (updated_librarians[i].name === librarian.name) {
                    if (this.state.editEmail !== undefined && this.state.editEmail.length !== 0)
                        updated_librarians[i].email = this.state.editEmail;
                    break;
                }
            }
            this.setState({
                librarians: updated_librarians,
                returnMessage: "Update success."
            });
        }
    };

    handleAdd = () => {
        if (this.state.addID === undefined) {
            this.setState({formError: "nameEmpty"});
            return;
        }
        if (this.state.addEmail === undefined) {
            this.setState({formError: "emailEmpty"});
            return;
        }
        if (this.state.addPassword === undefined) {
            this.setState({formError: "passwordEmpty"});
            return;
        }
        if (this.state.addPassword !== this.state.addConfirmPassword) {
            this.setState({formError: "passwordNotSame"});
            return;
        }

        this.handleClose();

        // fetch('/admin/addLibrarian', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         id: this.state.addID,
        //         email: this.state.addEmail,
        //         password: this.state.addPassword
        //     })
        // })
        //     .then(Response => Response.json())
        //     .then(result => {
        //         this.setState({
        //             status: result.state,
        //         });
        //     })
        //     .catch(e => alert(e));

        this.setState({status: 1});
        if (this.status === -1) {
            this.setState({
                returnMessage: "Add Librarian failed."
            });
        }
        else if (this.status === 0) {
            this.setState({
                returnMessage: "The name of the librarian already exists."
            });
        }
        else {
            const new_librarian = {
                name: this.state.addID,
                email: this.state.addEmail
            };
            const updated_librarians = [...this.state.librarians, new_librarian];
            this.setState({
                librarians: updated_librarians,
                returnMessage: "Add Librarian success."
            });
        }

    };

    getAllLibrarians = () => {
        fetch('/admin/showLibrarian')
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    librarians: result.librarians
                });
            })
            .catch(e => alert(e));
    };

    componentDidMount() {
        // this.getAllLibrarians()
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <TopBar />
                <div className="mid-div flex-col">
                    <div className="flex-row"
                        style={{marginBottom: 10}}
                    >
                        <PeopleOutlined style={{
                            fontSize: 50,
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginRight: 5,
                        }}/>
                        <Typography style={{fontSize: 50}} className="col-mid">
                            Librarians Management
                        </Typography>
                        <div className="grow"/>
                        <Button variant="outlined" color="secondary"
                                style={{
                                    marginTop: 27,
                                    height: 40
                                }}
                                onClick={this.handleOpen("openAdd", true)}
                        >
                            Add Librarian
                        </Button>
                        <AddDialog handleClose={this.handleClose}
                                   handleAdd={this.handleAdd}
                                   handleChange={this.handleChange}
                                   addID={this.state.addID}
                                   addEmail={this.state.addEmail}
                                   addPassword={this.state.addPassword}
                                   addConfrimPassword={this.state.addConfirmPassword}
                                   formError={this.state.formError}
                                   open={this.state.openAdd}
                        />
                    </div>
                    <Paper>
                        <Table>
                            <TableHead className={classes.head}>
                                <TableRow>
                                    <CustomTableCell>Account</CustomTableCell>
                                    <CustomTableCell>Email</CustomTableCell>
                                    <CustomTableCell></CustomTableCell>
                                    <CustomTableCell></CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.librarians.map(librarian => {
                                    return (
                                        <TableRow className={classes.row} key={librarian.name}>
                                            <CustomTableCell component="th" scope="row">
                                                {librarian.name}
                                            </CustomTableCell>
                                            <CustomTableCell>{librarian.email}</CustomTableCell>
                                            <CustomTableCell padding="checkbox">
                                                <Button onClick={this.handleOpen("openEdit", librarian)}>
                                                    <CreateOutlined style={{marginRight: 3}}/>
                                                    Edit
                                                </Button>
                                            </CustomTableCell>
                                            <CustomTableCell padding="checkbox">
                                                <Button onClick={this.handleOpen("openDelete", librarian)}>
                                                    <DeleteOutlined style={{marginRight: 3}}/>
                                                    Delete
                                                </Button>
                                            </CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <EditDialog
                            handleClose={this.handleClose}
                            handleEdit={this.handleEdit(this.state.openEdit)}
                            handleChange={this.handleChange}
                            account={this.state.openEdit}
                            editEmail={this.state.editEmail}
                            editPassword={this.state.editPassword}
                            editConfrimPassword={this.state.editConfirmPassword}
                            formError={this.state.formError}
                            open={this.state.openEdit !== undefined}
                        />
                        <DeleteDialog
                            handleClose={this.handleClose}
                            handleDelete={this.handleDelete(this.state.openDelete)}
                            open={this.state.openDelete !== undefined}
                        />
                        <MessageDialog
                            handleClose={this.handleClose}
                            open={this.state.returnMessage !== undefined}
                            message={this.state.returnMessage}
                        />
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

function AddDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add a librarian</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the information that needed.
                </DialogContentText>
                <TextField
                    error={props.formError === "nameEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "nameEmpty" ? "The name can not be empty" : "Name"}
                    fullWidth
                    value={props.addID}
                    onChange={props.handleChange("addID")}
                />
                <TextField
                    error={props.formError === "emailEmpty"}
                    margin="normal"
                    id="name"
                    label={props.formError === "emailEmpty" ? "The email can not be empty" : "Email Address"}
                    type="email"
                    fullWidth
                    value={props.addEmail}
                    onChange={props.handleChange("addEmail")}
                />
                <TextField
                    error={props.formError === "passwordNotSame"}
                    margin="normal"
                    id="name"
                    label={props.formError === "passwordNotSame" ? "The passwords are not same!" : "New Password"}
                    type="password"
                    fullWidth
                    value={props.addPassword}
                    onChange={props.handleChange("addPassword")}
                />
                <TextField
                    error={props.formError === "passwordNotSame" || props.formError === "passwordEmpty"}
                    margin="normal"
                    id="name"
                    label={
                        props.formError === "passwordNotSame" ?
                            "The passwords are not same!" : props.formError === "passwordEmpty" ?
                            "The passwords can not be empty" : "Confirm Password"
                    }
                    type="password"
                    fullWidth
                    value={props.addConfirmPassword}
                    onChange={props.handleChange("addConfirmPassword")}
                    // variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleAdd} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function EditDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Edit the librarian</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the new email address or the new password here.
                    You can leave some fields empty, which will keep the item unchanged.
                </DialogContentText>
                <TextField
                    margin="normal"
                    id="name"
                    label="Name"
                    fullWidth
                    defaultValue={props.account !== undefined && props.account.name}
                    disabled
                    // variant="outlined"
                />
                <TextField
                    margin="normal"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    defaultValue={props.account !== undefined && props.account.email}
                    value={props.editEmail}
                    onChange={props.handleChange("editEmail")}
                    // variant="outlined"
                />
                <TextField
                    error={props.formError === "passwordNotSame"}
                    margin="normal"
                    id="name"
                    label={props.formError === "passwordNotSame" ? "the passwords are not equal!" : "New Password"}
                    type="password"
                    fullWidth
                    value={props.editPassword}
                    onChange={props.handleChange("editPassword")}
                    // variant="outlined"
                />
                <TextField
                    error={props.formError === "passwordNotSame"}
                    margin="normal"
                    id="name"
                    label={props.formError === "passwordNotSame" ? "the passwords are not equal!" : "Confirm the New Password"}
                    type="password"
                    fullWidth
                    value={props.editConfirmPassword}
                    onChange={props.handleChange("editConfirmPassword")}
                    // variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleEdit} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function DeleteDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Delete the librarian?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once you delete the librarian, you can not undo the operation.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleDelete} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}


function MessageDialog(props) {
    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal:'right'}}
            open={props.open}
            onClose={props.handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            autoHideDuration={1500}
            message={
                <span id="message-id">
                    {props.message}
                </span>
            }
        />
    );
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        fontSize: 18,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

const ManageLibrarians = withStyles(styles)(ManageLibrariansClass);
export default ManageLibrarians;