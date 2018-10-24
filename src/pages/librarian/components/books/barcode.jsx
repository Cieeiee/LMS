import React from 'react'

const img0 = require('../../../../barcode/barcode0.png')
const img1 = require('../../../../barcode/barcode1.png')
const img2 = require('../../../../barcode/barcode2.png')
const img3 = require('../../../../barcode/barcode3.png')
const img4 = require('../../../../barcode/barcode4.png')
const img5 = require('../../../../barcode/barcode5.png')

// export default porps => 
//   <div>
//     <div style={{backgroundImage: `url(${img1})`, backgroundRepeat: 'no-repeat', height: 210}} /> 
//     <div style={{backgroundImage: `url(${img2})`, backgroundRepeat: 'no-repeat', height: 210}} /> 
//     <div style={{backgroundImage: `url(${img3})`, backgroundRepeat: 'no-repeat', height: 210}} /> 
//     <div style={{backgroundImage: `url(${img4})`, backgroundRepeat: 'no-repeat', height: 210}} /> 
//     <div style={{backgroundImage: `url(${img0})`, backgroundRepeat: 'no-repeat', height: 210}} /> 
//     <div style={{backgroundImage: `url(${img5})`, backgroundRepeat: 'no-repeat', height: 210}} /> 
//   </div>

export default class Barcode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgg: null
    }
  }
  handleImg = e => this.setState({imgg: e.target.files[0]})
  handleClick = () => {
    let Data = new FormData()
    Data.append('file', this.state.imgg)
    Data.append('json', JSON.stringify({
      a: 1,
      b: 2,
      c: 3
    }))
    console.log(Data)
    fetch('http://192.168.1.122:7911/putPicture', {
      method: 'POST',
      body: Data
    }).then(res => console.log(res))
    .catch(e => console.log(e))
  }
  render() {
    return(
      <div>
        <input type='file' onChange={this.handleImg}/>
        <button onClick={this.handleClick} >dhfdsjkgfskdjghds</button>
      </div>
    )
  }
}