# react-heatpack

**Pre-configured webpack hot-loading command for developing React apps - just point it at an entry module and go.**

## Usage

Install the `heatpack` command globally:

```
npm install -g react-heatpack
```

Navigate to the React app you want to run and point `heatpack` at its entry module:

```
$ cd ~/repos/ideas-md
$ heatpack src/app.js
react-heatpack listening at localhost:3000
```

If all goes well, you should see a listing of loaded modules, ending with:

```
webpack: bundle is now VALID
```

Open http://localhost:3000/ and your app should be served and will be hot-loaded when you make any changes.

## Workflow

The workflow this module is intended to enable is:

1. Have an idea for a React component/library/app/etc.
2. `npm install` whatever you need.
3. Write some code, including an entry module which runs `React.render(<App/>, document.getElementById('app'))`.
4. Point `heatpack` at the entry module to serve it up and get back to working on your idea, with new dependencies and modules hot-reloaded as you work.

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

In order to take advantage of this, components need to be exported from a module. To ensure you can hot load *every* component, put initialisation code in a separate module which imports your top-level components, e.g.:

```javascript
var React = require('react')
var Aoo = require('./App')

React.render(<App/>, document.getElementById('app'))
```

## CSS

Require CSS files from your JavaScript as if it was any other module, e.g.:

```javascript
require('./Widget.css')
```

Styles will be automatially applied to the page and hot-reloaded when you make a change.

Vendor prefixes will be automatically applied to your CSS, as necessary.

Images and font files referenced from your CSS will also be handled for you.

## Images

Require image files from your JavaScript as if it was any other module, e.g.:

```html
<img src={require('./logo.png')}/>
```

Small images will be inlined as `data:` URIs and larger images will be served up by webpack.

## Recommended modules

* [react-router](https://github.com/rackt/react-router) - hot reloadable nested routing
* [redux](https://github.com/gaearon/redux) - hot reloadable Flux

## MIT Licensed
