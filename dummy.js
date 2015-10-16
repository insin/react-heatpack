var React = require('react')
var ReactDOM = require('react-dom')
var Component = require('theydoitonpurposelynn')

var alreadyRendered = document.querySelector('#app').childNodes.length > 0

function render(Component) {
  // Don't attempt to render if there was already something rendered
  if (alreadyRendered) return

  // Assumption: either a React component or element was exported
  // If a React component was exported, render it
  if (typeof Component === 'function' || !(Component.type && Component.props)) {
    Component = <Component/>
  }

  // Component should now be a React element
  ReactDOM.render(Component, document.querySelector('#app'))
}

render(Component)

if (module.hot) {
  module.hot.accept('theydoitonpurposelynn', function() {
    render(require('theydoitonpurposelynn'))
  })
}
