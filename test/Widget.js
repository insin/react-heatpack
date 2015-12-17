require('./Widget.css')

var React = require('react')

import ES6 from './es6-class'
var Functional = require('./function')
var Stories = require('./Stories')

var Widget = React.createClass({
  render() {
    return <div className="Widget">
      <h2>Small Image</h2>
      <img src={require('./small.png')}/>
      <h2>Large Image</h2>
      <img width="500" src={require('./large.png')}/>
      <ES6/>
      <Functional/>
      <Stories/>
    </div>
  }
})

module.exports = Widget
