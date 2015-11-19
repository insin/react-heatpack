var React = require('react')
var ReactDOM = require('react-dom')

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

var mount = document.querySelector('#mount')
if (!mount) {
  mount = document.createElement('div')
  document.body.appendChild(mount)
}
ReactDOM.render(<App/>, mount)
