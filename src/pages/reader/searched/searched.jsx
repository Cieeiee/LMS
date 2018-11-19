import React from "react";
import {TopBar} from "../components/TopBar";
import MessageDialog from '../components/messageDialog'
import * as intl from "react-intl-universal";
import {
    fetchSearchBookByCategory,
    fetchSearchBookByKeywords,
    fetchShowCategories
} from "../../../mock";
import {
    Grid,
    Table,
    TableRow,
} from "@material-ui/core";
import {OneBook} from "./components/OneBook";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../mock/tablePaginationFooter";
import '../reader.scss'
import DetailsDialog from "./components/detailsDialog";
import NoResult from "./components/NoContent";
import Loading from "../../../mock/loading";

export default class Searched extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookList: [],
            categories: undefined,
            openDetails: false,
            // returnMessage: undefined,
            item: undefined,
            page: 0,
            rowsPerPage: 10,
            processing: false,
            loaded: false,
        };
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    getChinese = (bookList, categories) => {
        const _bookList = []
        for (let book of bookList) {
            book["categoryCh"] = categories.find(which => which.categoryEn === book.category).categoryCh
            _bookList.push(book)
        }
        return _bookList
    }
    getBookList = async () => {
        let bookList = []
        if (this.props.match.params.searchType === 'category')
            bookList = await fetchSearchBookByCategory(this.props.match.params.keywords)
        else
            bookList = await fetchSearchBookByKeywords(this.props.match.params.keywords)

        const categories = await fetchShowCategories();
        bookList = this.getChinese(bookList.books, categories)
        this.setState({bookList, categories})
    }

    async componentDidMount() {
        await this.getBookList()
        this.setState({loaded: true})
    }

    handleOpen = (which, value) => () => {
        if (which === "openDetails" && this.props.match.params.loginUser === "guest") {
            this.setState({
                returnMessage: intl.get("message.loginFirst")
            })
            return;
        }
        this.setState({
            [which]: true,
            item: value,
            processing: false,
        });
    };

    handleClose = which => () => {
        if (which === "returnMessage")
            this.setState({[which]: undefined});
        else
            this.setState({[which]: false});
        if (which === "openDetails") {
            this.getBookList()
        }
    };

    render() {
        const { bookList, rowsPerPage, page } = this.state;
        let bookListToShow = bookList

        return (
            <div className="flex-col">
                <TopBar searchBar loginUser={this.props.match.params.loginUser} lang={this.props.location.search}/>

                <div className="flex-col grow" style={{margin: "20px 0 20px 0"}}>
                    <div className="flex-col grow">
                        {!this.state.loaded ?
                            <div style={{marginTop: 350}}>
                                <Loading/>
                            </div>
                            :
                            bookListToShow == false ? <NoResult/> :
                            <Table>
                                <Grid container spacing={16} style={{width: "100%"}}>
                                    {bookListToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(book =>
                                        <Grid item xs={6}>
                                            <OneBook
                                                key={book.isbn}
                                                book={book}
                                                handleOpen={this.handleOpen("openDetails", book)}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            count={bookListToShow.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationFooter}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        }
                    </div>
                    <DetailsDialog
                        open={this.state.openDetails}
                        handleClose={this.handleClose("openDetails")}
                        handleReserve={this.handleReserve}
                        reader={this.props.match.params.loginUser}
                        book={this.state.item}
                    />
                    {/* <MessageDialog
                        handleClose={this.handleClose("returnMessage")}
                        open={this.state.returnMessage !== undefined}
                        message={this.state.returnMessage}
                    /> */}
                </div>
            </div>
        );
    }
}