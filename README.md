# react-heatpack

A `heatpack` command for quick React development, with hot reloading.

Just point it at a JavaScript module which runs `React.render(...)` and go:

```
heatpack src/index.js
```

## Workflow

The workflow this module is intended to enable is:

1. Have an idea for a React component/library/app/etc.
2. `npm install` whatever you need.
3. Write some initial code, including an entry module which runs `React.render(...)`.
4. Point `heatpack` at the entry module to serve it up and get back to working on your idea, with code and styles hot reloading as you work.

I noticed that while my production webpack config is tailored to each project, the webpack config for hot reloading during development is fairly uniform.

This module provides a generic hot reloading config and takes care of hooking up its webpack depedencies, so you can focus on the interesting bit during initial development.

If you need a fully-fledged dev/test/prod webpack setup or a reference for how to build one, [cesarandreu/web-app](cesarandreu/web-app) is highly recommended.

## Usage

Install the `heatpack` command globally:

```
npm install -g react-heatpack
```

Navigate to the React app you want to run and point `heatpack` at its entry module:

```
$ cd ~/repos/ideas-md
$ heatpack src/index.js
react-heatpack listening at localhost:3000
```

If all goes well, you should see a listing of loaded modules, ending with:

```
webpack: bundle is now VALID
```

Open http://localhost:3000/ and your app should be served and will be hot-loaded when you make any changes.

## Root node

Since [you should never render to `document.body`](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375#486f), the index page served up provides a `<div id="app"></div>` for you to render into:

```javascript
React.render(<App/>, document.getElementById('app'))
```

## JavaScript

JavaScript modules can have `.js` or `.jsx` extensions and will be transformed with [Babel](http://babeljs.io), so you can use:

* [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html)
* [ECMAScript 6 features](http://babeljs.io/docs/learn-es2015/#ecmascript-6-features)
* [ECMAScript 7 proposals](http://babeljs.io/docs/usage/experimental/) experimentally supported by Babel.

You can also require `.json` files as normal.

[react-hot-loader](https://github.com/gaearon/react-hot-loader) is used to allow you to tweak your React components on the fly without losing their current state.

In order to take advantage of this, components need to be exported from a module. To ensure you can hot reload *every* component, put initialisation code in a separate module which imports your top-level components, e.g.:

```javascript
var React = require('react')
var Aoo = require('./App')

React.render(<App/>, document.getElementById('app'))
```

## CSS

Require CSS files from your JavaScript as if they were any other module, e.g.:

```javascript
require('./Widget.css')
```

Styles will be automatially applied to the page and hot reloaded when you make a change.

Vendor prefixes will be automatically applied to your CSS, as necessary.

Images and font files referenced from your CSS will also be handled for you.

## Images

Require image files from your JavaScript as if they were any other module, e.g.:

```html
<img src={require('./logo.png')}/>
```

Small images will be inlined as `data:` URIs and larger images will be served up by webpack.

## Recommended modules

* [react-router](https://github.com/rackt/react-router) - hot reloadable nested routing
* [redux](https://github.com/gaearon/redux) - hot reloadable Flux

## MIT Licensed
