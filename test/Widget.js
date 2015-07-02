require('./Widget.css')

var React = require('react')

var Widget = React.createClass({
  render() {
    return <div className="Widget">
      <h2>Small Image</h2>
      <img src={require('./small.png')}/>
      <h2>Large Image</h2>
      <img src={require('./large.png')}/>
    </div>
  }
})

module.exports = Widget
