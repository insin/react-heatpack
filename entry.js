var Component = require('react-heatpack-script-alias')
var React = require('react-heatpack-react-alias')
var ReactDOM = require('react-heatpack-react-dom-alias')

var alreadyRendered = document.querySelector('#app').childNodes.length > 0

function render(Component) {
  // Don't attempt to render if there was already something rendered in #app,
  // or if nothing was exported (assumption: they rendered somewhere else and
  // didn't export anything)
  if (alreadyRendered ||
      !(typeof Component === 'function' || Object.keys(Component).length > 0)) {
    return
  }

  // Assumption: either a React component or element was exported
  // If a React component was exported, create an element
  if (typeof Component === 'function' || !(Component.type && Component.props)) {
    Component = <Component/>
  }

  // Component should now be a React element
  ReactDOM.render(Component, document.querySelector('#app'))
}

render(Component)

if (module.hot) {
  module.hot.accept('react-heatpack-script-alias', function() {
    render(require('react-heatpack-script-alias'))
  })
}
