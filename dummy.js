var React = require('react')
try {
  var ReactDOM = require('react-dom')
}
catch (e) {
  // pass
}
var Component = require('theydoitonpurposelynn')

function render(Component) {
  if (!(Component.type && Component.props)) {
    Component = <Component/>
  }
  (ReactDOM || React).render(Component, document.querySelector('#app'))
}

render(Component)

if (module.hot) {
  module.hot.accept('theydoitonpurposelynn', function() {
    render(require('theydoitonpurposelynn'))
  })
}
