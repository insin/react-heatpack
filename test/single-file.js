var React = require('react')
var ReactDOM = require('react-dom')

require('./single-file.less');

var App = React.createClass({
  render() {
    return <div><Menu/><Content/></div>
  }
})
var Menu = React.createClass({
  render() {
    return <nav><ul><li>Item</li></ul></nav>
  }
})
var Content = React.createClass({
  render() {
    return <section><h1>Content</h1></section>
  }
})

ReactDOM.render(<App/>, document.querySelector('#app'))
