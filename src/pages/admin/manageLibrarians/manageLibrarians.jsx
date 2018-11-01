import React from "react";
import {TopBar} from "../components/TopBar";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import {withStyles} from "@material-ui/core";
import blue from "@material-ui/core/es/colors/blue";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import { CreateOutlined, DeleteOutlined, SearchOutlined } from "@material-ui/icons"
import Typography from "@material-ui/core/Typography/Typography";
import MessageDialog from '../components/messageDialog'
import DeleteDialog from './components/deleteDialog'
import AddDialog from './components/addDialog'
import EditDialog from './components/editDialog'
import '../admin.scss'
import {serverAdmin} from "../../../mock/config";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import * as intl from "react-intl-universal";

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

const isSearched = searchTerm => item =>
    item.id.toUpperCase().includes(searchTerm.toUpperCase());

class ManageLibrariansClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            librarians: [],
            openDelete: undefined,
            openEdit: undefined,
            openAdd: false,
            returnMessage: undefined,

            formError: undefined,
            status: undefined,

            searchTerm: '',
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
            formError: undefined,
        });
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

    handleDelete = (librarian) => () => {
        fetch(`${serverAdmin}/admin/deleteLibrarian`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: librarian.id,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({deleteStatus: result.state});
            })
            .catch(e => alert(e));
    };

    deleteLibrarian() {
        if (this.state.deleteStatus === 0) {
            this.setState({
                deleteStatus: undefined,
                openDelete: undefined,
                returnMessage: intl.get('basic.failed')
            });
        }
        if (this.state.deleteStatus === 1) {
            const updated_librarians = this.state.librarians.filter(lib =>
                lib.id !== this.state.openDelete.id
            );
            this.setState({
                deleteStatus: undefined,
                openDelete: undefined,
                librarians: updated_librarians,
                returnMessage: intl.get('basic.success')
            });
        }
    }

    handleEdit = (librarian) => () => {
        if (this.state.email === undefined || this.state.email.length === 0) {
            this.setState({formError: "emailEmpty"});
            return;
        }
        const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!emailPattern.test(this.state.email)) {
            this.setState({formError: "emailIncorrect"});
            return;
        }
        if (this.state.changePassword) {
            if (this.state.password === undefined || this.state.password.length === 0) {
                this.setState({formError: "passwordEmpty"});
                return;
            }
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({formError: "passwordNotSame"});
                return;
            }
        }

        fetch(`${serverAdmin}/admin/updateLibrarian`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: librarian.id,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({editStatus: result.state});
            })
            .catch(e => alert(e));
    };

    editLibrarian = () => {
        if (this.state.editStatus === 0) {
            this.setState({
                editStatus: undefined,
                openEdit: undefined,
                returnMessage: intl.get('basic.failed')
            });
        }
        if (this.state.editStatus === 1) {
            const updated_librarians = this.state.librarians;
            for (let i in updated_librarians) {
                if (updated_librarians[i].id === this.state.openEdit.id) {
                    updated_librarians[i].email = this.state.email;
                    break;
                }
            }
            this.setState({
                editStatus: undefined,
                openEdit: undefined,
                librarians: updated_librarians,
                returnMessage: intl.get('basic.success')
            });
        }
    };

    handleAdd = () => {
        if (this.state.ID === undefined || this.state.ID.length === 0) {
            this.setState({formError: "nameEmpty"});
            return;
        }
        if (this.state.email === undefined || this.state.email.length === 0) {
            this.setState({formError: "emailEmpty"});
            return;
        }
        const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!emailPattern.test(this.state.email)) {
            this.setState({formError: "emailIncorrect"});
            return;
        }
        if (this.state.password === undefined || this.state.email.length === 0) {
            this.setState({formError: "passwordEmpty"});
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({formError: "passwordNotSame"});
            return;
        }

        fetch(`${serverAdmin}/admin/addLibrarian`, {
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
                this.setState({addStatus: result.state});
            })
            .catch(e => alert(e));
    };

    addLibrarian = () => {
        if (this.state.addStatus === -1) {
            this.setState({
                addStatus: undefined,
                openAdd: false,
                returnMessage: intl.get('basic.failed')
            });
        }
        if (this.state.addStatus === 0) {
            this.setState({
                addStatus: undefined,
                openAdd: false,
                returnMessage: intl.get('admin.librarians.accountExists')
            });
        }
        if (this.state.addStatus === 1) {
            const new_librarian = {
                id: this.state.ID,
                email: this.state.email
            };
            const updated_librarians = [...this.state.librarians, new_librarian];
            this.setState({
                addStatus: undefined,
                openAdd: false,
                librarians: updated_librarians,
                returnMessage: intl.get('basic.success')
            });
        }
    };

    clearFormError = () => {
        this.setState({formError: undefined});
    };

    getAllLibrarians = () => {
        fetch(`${serverAdmin}/admin/showLibrarian`)
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
        this.deleteLibrarian();
        this.editLibrarian();
        this.addLibrarian();

        return (
            <React.Fragment>
                <TopBar/>
                <div className="mid-div flex-col">
                    <div className="flex-row"
                        style={{marginBottom: 10}}
                    >
                        <Typography style={{fontSize: 50}} className="col-mid">
                            {intl.get('admin.librarians.title')}
                        </Typography>
                    </div>
                    <div className="flex-row" style={{marginBottom: 10}}>
                        <div className="flex-row">
                            {/*<SearchOutlined style={{margin: "auto auto"}}/>*/}
                            <TextField
                                style={{margin: "auto auto"}}
                                placeholder={intl.get('basic.Search')}
                                value={this.state.searchTerm}
                                onChange={this.handleChange("searchTerm")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className="grow"/>
                        <Button
                            variant="outlined"
                            color="inherit"
                            style={{width: 150}}
                            onClick={this.handleOpen("openAdd", true)}
                        >
                            {intl.get('basic.add')}
                        </Button>
                        <AddDialog handleClose={this.handleClose}
                                   handleAdd={this.handleAdd}
                                   handleChange={this.handleChange}
                                   clearFormError={this.clearFormError}
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
                                    <CustomTableCell>{intl.get('form.account')}</CustomTableCell>
                                    <CustomTableCell>{intl.get('form.email')}</CustomTableCell>
                                    <CustomTableCell/>
                                    <CustomTableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.librarians.filter(isSearched(this.state.searchTerm))
                                    .map(librarian => {
                                    return (
                                        <TableRow className={classes.row} key={librarian.id}>
                                            <CustomTableCell component="th" scope="row">
                                                {librarian.id}
                                            </CustomTableCell>
                                            <CustomTableCell>{librarian.email}</CustomTableCell>
                                            <CustomTableCell padding="checkbox">
                                                <Button onClick={this.handleOpen("openEdit", librarian)}>
                                                    <CreateOutlined style={{marginRight: 3}}/>
                                                    {intl.get('basic.update')}
                                                </Button>
                                            </CustomTableCell>
                                            <CustomTableCell padding="checkbox">
                                                <Button onClick={this.handleOpen("openDelete", librarian)}>
                                                    <DeleteOutlined style={{marginRight: 3}}/>
                                                    {intl.get('basic.delete')}
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
                            clearFormError={this.clearFormError}
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
                            account={this.state.openDelete}
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