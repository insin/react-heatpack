# react-heatpack

A `heatpack` command for quick [React](https://facebook.github.io/react/) development with [webpack](https://webpack.github.io/) hot reloading.

**Note:** if you're _primarily_ looking for a live reloading environment to tweak and iterate on encapsulated React components in, go look at [Cosmos](https://github.com/skidding/cosmos) first!

## Usage

Install the `heatpack` command globally:

```
npm install -g react-heatpack
```

Call `heatpack` with the path to a module which either:

* runs `React.render(...)`,
* exports a single React component,
* or exports a React element (e.g. `module.exports = <div></div>`)

```
$ heatpack src/index.js
react-heatpack listening at localhost:3000
```

If all goes well, you should see a listing of loaded modules, ending with:

```
webpack: bundle is now VALID
```

Open http://localhost:3000/ and your app should be served and will be hot reloaded when you make any changes.

## Configured loaders

Webpack loaders are configured for the following:

### JavaScript

JavaScript modules can have `.js` or `.jsx` extensions and will be transformed with [Babel](http://babeljs.io), so you can use:

* [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html)
* [ECMAScript 6 features](http://babeljs.io/docs/learn-es2015/#ecmascript-6-features)
* [ECMAScript 7 proposals](http://babeljs.io/docs/usage/experimental/) experimentally supported by Babel.

You can also require `.json` files as normal.

### CoffeeScript

If you use CoffeeScript, it's also supported - modules can have `.coffee` or `.cjsx` extensions.

`.cjsx` modules will be transformed with [coffee-react-transform](https://github.com/jsdf/coffee-react-transform), allowing you to use JSX in your CoffeeScript.

### CSS

Require CSS files from your JavaScript as if they were any other module, e.g.:

```javascript
require('./Widget.css')
```

Styles will be automatically applied to the page and hot reloaded when you make a change.

Vendor prefixes will be automatically applied to your CSS, as necessary.

Images and font files referenced from your CSS will also be handled for you.

See the [css-loader documentation](https://github.com/webpack/css-loader/) for more information on what webpack allows you to do when you start using `require()` for CSS.

### Images

Require image files from your JavaScript as if they were any other module, e.g.:

```html
<img src={require('./logo.png')}/>
```

Small images will be inlined as `data:` URIs and larger images will be served up by webpack.

## Gotcha avoidance

### Root element

Since [you should never render to `document.body`](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375#486f), the page served up by heatpack includes a `<div id="app"></div>` element for your app to render into.

### Hot reloading React components

[React Hot Loader](https://github.com/gaearon/react-hot-loader) is used to allow you to tweak your React components on the fly without losing their current state.

However, [React components need to be exported from a module](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#the-following-modules-couldnt-be-hot-updated-they-would-need-a-full-reload) to be eligible for hot reloading, so `React.render(...)` should be executed in a different module which imports the components to be rendered, e.g.:

```javascript
var React = require('react')
var App = require('./App')
React.render(<App/>, document.querySelector('#app'))
```

If you pass `heatpack` a module which _doesn't_ contain a reference to `React.render`, _it will assume the module exports a React component_ and try to take care of rendering it for you. To disable this check and force the specified module to be executed directly, pass an `-f` or `--force` flag.

## Tips & tricks

### React: `npm install` me maybe

You don't even need to `npm install` your own version of React to get started with `heatpack` - webpack has been configured to prefer a local `node_modules/` with React installed when available, but will otherwise fall back to using `heatpack`'s own React dependency.

As such, it can serve up and hot reload this example without a local `node_modules` in sight:

```js
var React = require('react')
module.exports = React.createClass({
  render() {
    return <div>Hi!</div>
  }
})
```

### Single-file hot reloading with multiple components

If you define and render a bunch of React components in the same module, they can still be hot reloaded as long as you export them.

This can be handy for quickly hacking together something which needs multiple components without having to create separate modules for them:

```js
var React = require('react')

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

// Exporting is key to hot reloading
module.exports = {App, Menu, Content}

React.render(<App/>, document.querySelector('#app'))
```

## Recommended hot reloadable modules

* [React Router](https://github.com/rackt/react-router) - nested routing.

* [Redux](https://github.com/gaearon/redux) - functional state management.

  Watch the [Live React: Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs) talk from React Europe 2015 for a taste of what it's like to use Redux with hot reloading.

## Beyond heatpack

Heatpack is intended for quick development and experimentation without the inertia of having to create config files and configure development dependencies up-front. The webpack configuration it uses is only suitable for generic hot reloading, which is why there's no option to use it to output built files.

At some stage you'll need to set up your own webpack config. These resources should be useful when you reach that point:

* [petehunt/webpack-howto](https://github.com/petehunt/webpack-howto) is a great place to start for the most common "How do I configure X?" questions about webpack.

* [cesarandreu/web-app](https://github.com/cesarandreu/web-app) describes itself as a "reasonable starting point for building a web app" - as such, it probably doesn't have everything you'll end up needing, but it's a working out-of-the-box example of building for dev, test and production, with meticulously-commented webpack config which links out to relevant documentation and other resources.

* [SurviveJS - Webpack and React](http://survivejs.com/) - while this entire book is a useful reference for working with React and webpack, the [Deploying Applications](http://survivejs.com/webpack_react/deploying_applications/) chapter is of particular interest for putting together a production build.

## MIT Licensed
