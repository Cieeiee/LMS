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
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import * as intl from "react-intl-universal";
import {fetchAddLibrarian, fetchDeleteLibrarian, fetchShowLibrarians, fetchUpdateLibrarian} from "../../../mock";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../mock/tablePaginationFooter";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";

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
            processing: false,
            searchTerm: '',
            ID: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            page: 0,
            rowsPerPage: 10,
        }
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleOpen = (which, account) => () => {
        this.setState({[which]: account, processing: false});
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
            ID: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
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

    handleDelete = (librarian) => async () => {
        await this.setState({processing: true})
        const eventState = await fetchDeleteLibrarian(librarian.id)
        const librarians = await fetchShowLibrarians()
        let returnMessage = ''
        if (eventState)
            returnMessage = intl.get('basic.success')
        else
            returnMessage = intl.get('basic.failed')

        this.setState({
            openDelete: undefined,
            librarians,
            returnMessage
        });
    };

    handleEdit = (librarian) => async () => {
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
        await this.setState({processing: true})
        const eventState = await fetchUpdateLibrarian(librarian.id, this.state.email, this.state.password)
        const librarians = await fetchShowLibrarians()
        let returnMessage = ''
        if (eventState)
            returnMessage = intl.get('basic.success')
        else
            returnMessage = intl.get('basic.failed')
        this.setState({
            openEdit: undefined,
            returnMessage,
            librarians
        })
    };

    handleAdd = async () => {
        if (this.state.ID === undefined || this.state.ID.length === 0) {
            this.setState({formError: "accountEmpty"});
            return;
        }
        if (!/^\d{11}$/.test(this.state.ID) || /^0+/.test(this.state.ID)) {
            this.setState({formError: "accountIncorrect"});
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
        await this.setState({processing: true})
        const eventState = await fetchAddLibrarian(this.state.ID, this.state.email, "00010001")
        const librarians = await fetchShowLibrarians()
        let returnMessage = ''
        if (eventState === -1)
            returnMessage = intl.get('admin.librarians.accountExists')
        else if (eventState === 1)
            returnMessage = intl.get('basic.success')
        else
            returnMessage = intl.get('basic.failed')

        this.setState({
            openAdd: false,
            ID: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            returnMessage,
            librarians
        })
    };

    clearFormError = () => {
        this.setState({formError: undefined});
    };


    async componentDidMount() {
        const librarians = await fetchShowLibrarians()
        this.setState({librarians})
    };

    render() {
        const { classes } = this.props;
        const { librarians, rowsPerPage, page } = this.state;
        let librariansToShow = []
        if (librarians) librariansToShow = librarians.filter(isSearched(this.state.searchTerm))
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, librariansToShow.length - page * rowsPerPage);

        return (
            <React.Fragment>
                <TopBar lang={this.props.location.search}/>
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
                                {librariansToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 48 * emptyRows }}>
                                        <TableCell colSpan={4} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={4}
                                        count={librariansToShow.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        rowsPerPageOptions={[5, 10, 15]}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationFooter}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
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
                                   processing={this.state.processing}
                        />
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
                            processing={this.state.processing}
                        />
                        <DeleteDialog
                            handleClose={this.handleClose}
                            handleDelete={this.handleDelete(this.state.openDelete)}
                            account={this.state.openDelete}
                            open={this.state.openDelete !== undefined}
                            processing={this.state.processing}
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