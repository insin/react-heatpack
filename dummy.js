var React = require('react')
var Component = require('theydoitonpurposelynn')

function render(Component) {
  if (!(Component.type && Component.props)) {
    Component = <Component/>
  }
  React.render(Component, document.querySelector('#app'))
}

render(Component)

if (module.hot) {
  module.hot.accept('theydoitonpurposelynn', function() {
    render(require('theydoitonpurposelynn'))
  })
}
