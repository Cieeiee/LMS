import React from "react";
import {TopBar} from "./components/TopBar";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import {withStyles} from "@material-ui/core";
import blue from "@material-ui/core/es/colors/blue";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import { CreateOutlined, DeleteOutlined, PeopleOutlined } from "@material-ui/icons"
import Typography from "@material-ui/core/Typography/Typography";
import MessageDialog from './components/messageDialog'
import DeleteDialog from './components/deleteDialog'
import AddDialog from './components/addDialog'
import EditDialog from './components/editDialog'
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

            ID: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,

            changePassword: false,
            formError: undefined,

        }
    }

    handleOpen = (which, account) => () => {
        this.setState({[which]: account});
        if (account !== true) {
            this.setState({
                ID: account.name,
                email: account.email,
            });
        }
    };

    handleClose = () => {
        this.setState({
            openDelete: undefined,
            openEdit: undefined,
            openAdd: false,
            returnMessage: undefined,
            ID: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            formError: undefined,
        });
    };


    handleDelete = (librarian) => () => {
        this.handleClose();

        let status = 0;
        fetch('/admin/deleteLibrarian', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: librarian.name,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                status = result.state;
            })
            .catch(e => alert(e));

        // this.setState({status: 1});

        if (status === 0) {
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
        if (which === "changePassword") {
            this.setState({
                [which]: event.target.checked,
            })
        }
        else {
            this.setState({
                [which]: event.target.value,
            })
        }
    };

    handleEdit = (librarian) => () => {
        if (this.state.email === undefined) {
            this.setState({formError: "emailEmpty"});
            return;
        }
        if (this.state.changePassword && this.state.password === undefined) {
            this.setState({formError: "passwordEmpty"});
            return;
        }
        if (this.state.changePassword && this.state.password !== this.state.confirmPassword) {
            this.setState({formError: "passwordNotSame"});
            return;
        }
        this.handleClose();

        let status = 0;
        fetch('/admin/updateLibrarian', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(Response => Response.json())
            .then(result => {
                status = result.state;
            })
            .catch(e => alert(e));

        // this.setState({status: 1});

        if (status === 0) {
            this.setState({
                returnMessage: "Update failed."
            });
        }
        else {
            const updated_librarians = this.state.librarians;
            for (let i in updated_librarians) {
                if (updated_librarians[i].name === librarian.name) {
                    updated_librarians[i].email = this.state.email;
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
        if (this.state.ID === undefined) {
            this.setState({formError: "nameEmpty"});
            return;
        }
        if (this.state.email === undefined) {
            this.setState({formError: "emailEmpty"});
            return;
        }
        if (this.state.password === undefined) {
            this.setState({formError: "passwordEmpty"});
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({formError: "passwordNotSame"});
            return;
        }

        this.handleClose();

        let status = 0;
        fetch('/admin/addLibrarian', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.ID,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(Response => Response.json())
            .then(result => {
                status = result.state;
            })
            .catch(e => alert(e));

        // this.setState({status: 1});

        if (status === -1) {
            this.setState({
                returnMessage: "Add Librarian failed."
            });
        }
        else if (status === 0) {
            this.setState({
                returnMessage: "The name of the librarian already exists."
            });
        }
        else {
            const new_librarian = {
                name: this.state.ID,
                email: this.state.email
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
        this.getAllLibrarians()
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
                                   ID={this.state.ID}
                                   email={this.state.email}
                                   password={this.state.password}
                                   confrimPassword={this.state.confirmPassword}
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
                                    <CustomTableCell/>
                                    <CustomTableCell/>
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
                            changePassword={this.state.changePassword}
                            account={this.state.openEdit}
                            email={this.state.email}
                            password={this.state.password}
                            confrimPassword={this.state.confirmPassword}
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