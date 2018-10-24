import React from 'react'
import { fetchDownload } from '../../../../mock/index'


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
    fetchDownload('http://120.78.240.24:8080/book_picture?imgName=%E7%BA%A2%E4%B8%8E%E9%BB%91.jpg')
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