# react-heatpack

A `heatpack` command for quick [React](https://facebook.github.io/react/) development with [webpack](https://webpack.github.io/) hot reloading.

Just pass it at a module which either runs `React.render(...)` or exports a React component:

```
heatpack src/index.js
```

## Usage

Install the `heatpack` command globally:

```
npm install -g react-heatpack
```

Navigate to the React code you want to run and point `heatpack` at a module:

```
$ cd ~/repos/ideas-md
$ heatpack src/index.js
react-heatpack listening at localhost:3000
```

If all goes well, you should see a listing of loaded modules, ending with:

```
webpack: bundle is now VALID
```

Open http://localhost:3000/ and your app should be served and will be hot reloaded when you make any changes.

## Rationale

I noticed that while my production webpack config tended to be tailored to each project's needs, the config for hot reloading during development was fairly uniform and could be used across multiple projects.

This module provides a generic hot reloading config and takes care of hooking up its webpack depedencies, so you can focus on the interesting bit during initial development.

## Configured loaders

Webpack loaders are configured for the following:

### JavaScript

JavaScript modules can have `.js` or `.jsx` extensions and will be transformed with [Babel](http://babeljs.io), so you can use:

* [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html)
* [ECMAScript 6 features](http://babeljs.io/docs/learn-es2015/#ecmascript-6-features)
* [ECMAScript 7 proposals](http://babeljs.io/docs/usage/experimental/) experimentally supported by Babel.

You can also require `.json` files as normal.

#### Root element

Since [you should never render to `document.body`](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375#486f), the page served up by heatpack includes a `<div id="app"></div>` element for your app to render into.

#### Hot reloading React components

[React Hot Loader](https://github.com/gaearon/react-hot-loader) is used to allow you to tweak your React components on the fly without losing their current state.

**Note:** [React components need to be exported from a module](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#the-following-modules-couldnt-be-hot-updated-they-would-need-a-full-reload) to be eligible for hot reloading, so `React.render(...)` should be executed in a different module which imports the components to be rendered, e.g.:

```javascript
var React = require('react')
var App = require('./App')
React.render(<App/>, document.querySelector('#app'))
```

If you pass `heatpack` a module which _doesn't_ contain a reference to `React.render`, _it will assume the module exports a React component_ and try to take care of rendering it for you. To disable this check and force the specified module to be executed directly, pass an `-f` or `--force` flag.

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

----

## Workflow

The workflow this module is intended to enable is:

1. Have an idea for a React component/library/app/etc.
2. `npm install` whatever you need.
3. Write some initial code: a React component or a module which runs `React.render(...)`.
4. Run `heatpack` to serve it up and get back to working on your idea, with code and styles hot reloading as you work.

## Recommended modules

* [react-router](https://github.com/rackt/react-router) - hot reloadable nested routing
* [redux](https://github.com/gaearon/redux) - hot reloadable Flux (which will secretly make you understand at least one piece of [Elm](http://elm-lang.org/)!)

If you need a fully-fledged dev/test/prod webpack setup, or a well-commented reference for how to build one, try [cesarandreu/web-app](https://github.com/cesarandreu/web-app).

## MIT Licensed

Bottom of the README easter egg: you don't even need to `npm install react` to get started with `heatpack` (but don't tell anyone because I don't know if that's actually a good thing yet!). It can serve up this sample module without a `node_modules` in sight:

```js
var React = require('react')
module.exports = React.createClass({render() {return <div>Hi!</div>}})
```
