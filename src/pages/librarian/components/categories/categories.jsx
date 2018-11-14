import React from "react";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import * as intl from "react-intl-universal";
import Button from "@material-ui/core/Button/Button";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {BuildOutlined, DeleteOutlined} from "@material-ui/icons";
import {fetchAddCategories, fetchDeleteCategories, fetchShowCategories, fetchUpdateCategories} from "../../../../mock";
import AddDialog from "./components/addDialog";
import EditDialog from "./components/editDialog";
import DeleteDialog from "./components/deleteDialog";
import {withStyles} from "@material-ui/core";
import blue from "@material-ui/core/es/colors/blue";
import MessageDialog from "../messageDialog";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";

const isSearched = searchTerm => item =>
    item.categoryEn.toUpperCase().includes(searchTerm.toUpperCase()) ||
    item.categoryCh.includes(searchTerm)

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            categoryList: undefined,
            openAdd: false,
            openUpdate: false,
            openDelete: false,
            openSnack: false,
            eventState: false,
            item: undefined,
            formError: undefined,
            processing: false,
            page: 0,
            rowsPerPage: 12,
        }
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleSearch = e => this.setState({searchTerm: e.target.value});
    handleOpen = (which, item) => () => {
        this.setState({
            [which]: true,
            item,
            processing: false,
        })
    };
    handleClose = (which) => () => {
        this.setState({
            [which]: false,
            item: undefined,
            formError: undefined,
        })
        if (which === "openSnack") {
            this.setState({returnMessage: undefined})
        }
    };
    clearFormError = () => {
        this.setState({formError: undefined})
    }
    handleAdd = (en, zh) => async () => {
        if (en === undefined || en.length === 0) {
            this.setState({formError: "enEmpty"})
            return
        }
        if (zh === undefined || zh.length === 0) {
            this.setState({formError: "zhEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState = await fetchAddCategories(en, zh);
        const categoryList = await fetchShowCategories();
        let returnMessage = ''
        switch (eventState) {
            case -1:
                returnMessage = intl.get('message.categoryExists')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openAdd: false,
            returnMessage,
            categoryList,
        })
    }
    handleUpdate = (en, en_changed, zh_changed) => async () => {
        if (en_changed === undefined || en_changed.length === 0) {
            this.setState({formError: "enEmpty"})
            return
        }
        if (zh_changed === undefined || zh_changed.length === 0) {
            this.setState({formError: "zhEmpty"})
            return
        }
        await this.setState({processing: true})
        const eventState = await fetchUpdateCategories(en, en_changed, zh_changed);
        const categoryList = await fetchShowCategories();
        let returnMessage = ''
        switch (eventState) {
            case -1:
                returnMessage = intl.get('message.categoryExists')
                break;
            case 1:
                returnMessage = intl.get('message.success')
                break;
            default:
                returnMessage = intl.get('message.systemError')
        }
        this.setState({
            openUpdate: false,
            returnMessage,
            categoryList,
        })
    }
    handleDelete = (en) => async () => {
        await this.setState({processing: true})
        const eventState = await fetchDeleteCategories(en);
        const categoryList = await fetchShowCategories();
        let returnMessage = eventState ? intl.get('message.success') : intl.get('message.systemError')
        this.setState({
            openDelete: false,
            returnMessage,
            categoryList,
        })
    }
    async componentDidMount() {
        const categoryList = await fetchShowCategories();
        this.setState({categoryList})
    }

    render() {
        const { categoryList, rowsPerPage, page } = this.state;
        let categoryListToShow = []
        if (categoryList) categoryListToShow = categoryList.filter(isSearched(this.state.searchTerm))
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, categoryListToShow.length - page * rowsPerPage);

        return (
            <div className="flex-col">
                <TopBar
                    loginUser={this.props.match.params.loginUser}
                    handleSearch={this.handleSearch}
                    lang={this.props.location.search}
                />
                <div style={{width: '100%'}} className="flex-row">
                    <Nav
                        loginUser={this.props.match.params.loginUser}
                        whichFunction={"categories"}
                        lang={this.props.location.search}
                    />
                    <div className="grow">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>{intl.get('form.English')}</CustomTableCell>
                                    <CustomTableCell numeric>{intl.get('form.Chinese')}</CustomTableCell>
                                    <CustomTableCell numeric>
                                        <Button
                                            variant='contained'
                                            style={{width: 80}}
                                            onClick={this.handleOpen("openAdd", undefined)}
                                        >
                                            {intl.get('basic.add')}
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categoryListToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) =>
                                    <TableRow key={index} className="table-row">
                                        <TableCell>{item.categoryEn}</TableCell>
                                        <TableCell numeric>{item.categoryCh}</TableCell>
                                        <TableCell numeric>
                                            <IconButton
                                                onClick={this.handleOpen("openUpdate", item)}
                                                // style={{marginRight: 10}}
                                            >
                                                <BuildOutlined/>
                                            </IconButton>
                                            {/*<Button variant='outlined' onClick={this.handleOpen("openDelete", item)}>*/}
                                                {/*{intl.get('basic.delete')}*/}
                                            {/*</Button>*/}
                                            <IconButton
                                                onClick={this.handleOpen("openDelete", item)}
                                            >
                                                <DeleteOutlined/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 57 * emptyRows }}>
                                        <TableCell colSpan={3} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={3}
                                        count={categoryListToShow.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        rowsPerPageOptions={[12]}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationFooter}
                                    />
                                </TableRow>
                            </TableFooter>
                            <AddDialog handleClose={this.handleClose("openAdd")}
                                       handleAdd={this.handleAdd}
                                       clearFormError={this.clearFormError}
                                       category={this.state.item}
                                       formError={this.state.formError}
                                       open={this.state.openAdd}
                                       processing={this.state.processing}
                            />
                            <EditDialog
                                handleClose={this.handleClose("openUpdate")}
                                handleUpdate={this.handleUpdate}
                                clearFormError={this.clearFormError}
                                formError={this.state.formError}
                                category={this.state.item}
                                open={this.state.openUpdate}
                                processing={this.state.processing}
                            />
                            <DeleteDialog
                                handleClose={this.handleClose("openDelete")}
                                handleDelete={this.handleDelete}
                                category={this.state.item}
                                open={this.state.openDelete}
                                processing={this.state.processing}
                            />
                            <MessageDialog
                                handleClose={this.handleClose("openSnack")}
                                open={Boolean(this.state.returnMessage)}
                                message={this.state.returnMessage}
                            />
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        fontSize: 14,
        textTransform: 'capitalize',
    },
}))(TableCell);