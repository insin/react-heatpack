require('./Widget.css')

var React = require('react')

var Coffee = require('./Coffee')
var Stories = require('./Stories')

var Widget = React.createClass({
  render() {
    return <div className="Widget">
      <h2>Small Image</h2>
      <img src={require('./small.png')}/>
      <h2>Large Image</h2>
      <img width="500" src={require('./large.png')}/>
      <Coffee/>
      <Stories/>
    </div>
  }
})

module.exports = Widget
