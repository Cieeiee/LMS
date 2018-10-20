import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './components/nav/nav.jsx'
import Confirm from './components/confirm/confirm.jsx'
import Books from './components/books/books.jsx';
import Details from './components/books/details.jsx';
import './librarian.scss';

const booklist = [
  {
    isbn: 734578,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734579,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734580,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734581,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734582,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734583,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734584,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734585,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734586,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  },
  {
    isbn: 734587,
    title: 'God of war',
    author: 'Me',
    category: 'comedy',
    price: '$30'
  }
]
const details = {
  isbn: '1472245547',
  title: 'American Gods',
  author: 'Neil Gaiman',
  category: 'Fantasy',
  introduction: `If you are to survive, you must believe.

  Shadow Moon has served his time. But hours before his release from prison, his beloved wife is killed in a freak accident. Dazed, he boards a plane home where he meets the enigmatic Mr Wednesday, who professes both to know Shadow and to be king of America.
  
  Together they embark on a profoundly strange road trip across the USA, encountering a kaleidoscopic cast of characters along the way. Yet all around them a storm threatens to break.
  
  The war has already begun, an epic struggle for the very soul of America, and Shadow is standing squarely in its path.`,
  location: '1-11-111',
  total: 6,
  remain: 2,
  price: 25,
  picture: 'https://books.google.nl/books/content?id=I3o7vgAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70w8bTVK05KCIbrLwDgJksNaIxssduYe7-1laZQgiRlVEh9d-nBE3oWhhk7kUdK2p7GwYkznidAl9a3yBppV4kJ1JCz4pbfEvaT0a4BrrGb2CqYhudlUBXvUolRLDOnEoe3AxZT',
  state: [
    {
      barCode: 123,
      availability: 1
    },
    {
      barCode: 124,
      availability: 1
    },
    {
      barCode: 126,
      availability: 1
    },
    {
      barCode: 127,
      availability: 1
    },
    {
      barCode: 128,
      availability: 0
    },
    {
      barCode: 129,
      availability: 0
    }
  ]
}

export default class Librarian extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      type: 0,
      open: false,
      book: {},
      barCode: null,
      title: ''
    }
  }
  handleDetail = () => this.setState({book: details, type: 4})
  handleOpen = (barCode, title) => () => this.setState({open: true, barCode, title})
  handleClose = () => this.setState({open: false})
  handleClick = index => this.setState({type: index})
  handleBorrow = barCode => () => {
    let newState = this.state.book.state
    for(let x of newState) {
      if(x.barCode === barCode) {
        x.availability = 0
      }
    }
    let newbook = {...this.state.book, state: newState}
    this.setState({
      book: newbook,
      open: false
    })
  }
  handleDelete = barCode => () => {
    let newState = this.state.book.state.filter(item => 
      item.barCode !== barCode
    )
    let newbook = {...this.state.book, state: newState}
    this.setState({
      book: newbook,
      open: false
    })
  }
  handleReturn = barCode => () => {
    let newState = this.state.book.state
    for(let x of newState) {
      if(x.barCode === barCode) {
        x.availability = 1
      }
    }
    let newbook = {...this.state.book, state: newState}
    this.setState({
      book: newbook,
      open: false
    })
  }
  handleLost = barCode => () => {
    let newState = this.state.book.state.filter(item => 
      item.barCode !== barCode
    )
    let newbook = {...this.state.book, state: newState}
    this.setState({
      book: newbook,
      open: false
    })
  }
  componentDidMount() {
      // fetch('/booklist')
      // .then(Response => Response.json())
      // .then(result => {
      //     this.setState({
      //         list: result.name
      //     })
      // })
      // .catch(e => console.log('我知道报错了但是我不说\n' + e))
      this.setState({
        list: booklist
      })
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <h1 style={{flexGrow: 1}}>Bibliosoft</h1>
            {this.props.match.params.id}
            <Button variant='contained' component={Link} to='/' style={{marginLeft: 20}}>logout</Button>
          </Toolbar>
        </AppBar>
        <div style={{height: '100%', display: 'flex'}}>
          {Nav({ type: this.state.type, handleClick: this.handleClick })}
          {this.state.type === 0 && Books({ list: this.state.list, handleOpen: this.handleDetail })}
          {this.state.type === 1 && <p>Book</p>}
          {this.state.type === 2 && <p>Boo</p>}
          {this.state.type === 3 && <p>Bo</p>}
          {this.state.type === 4 && Details({id: this.props.match.params.id, book: this.state.book, handleOpen: this.handleOpen })}
        </div>
        {Confirm({
          barCode: this.state.barCode,
          title: this.state.title,
          open: this.state.open,
          handleClose: this.handleClose,
          handleDelete: this.handleDelete,
          handleBorrow: this.handleBorrow,
          handleReturn: this.handleReturn,
          handleLost: this.handleLost
        })}
      </div>
    )
  }
}