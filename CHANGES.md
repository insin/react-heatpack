# v3.0.0 - 2015-11-19

**Breaking change:** CoffeeScript is no longer supported, as hot reloading now depends on Babel plugins.

**Changed:** Now using the same hot reloading implementation as [https://github.com/gaearon/react-transform-boilerplate](react-transform-boilerplate) - benefits include syntax errors and rendering errors now being displayed as an overlay they happen ([#9](https://github.com/insin/react-heatpack/issues/9))

**Added:** `-i`/`--info` option to enable display of webpack stats when there are no errors.

# v2.0.0 - 2015-10-17

**Breaking change:** Now uses React 0.14 and ReactDOM.

**Breaking change:** Updated Webpack and loader dependencies. CSS loader 0.19.0 dropped out of the box support for Node.js 0.10 - `Promise` must be manually polyfilled if you're using Node.js 0.10.

**Changed:** `React.render()` check removed, by default heatpack now uses a dummy module as the entry point, which imports the given module and calls `ReactDOM.render()` for you if nothing has been rendered to `<div id="app"></div>` yet. The `-f`/`--force` option can still be used to force use of the given module as the entry point.

# v1.5.0 - 2015-09-05

**Changed:** CSS is no longer minified.

# v1.4.1 - 2015-07-31

**Fixed:** Fix error when `async` and `await` are used by adding babel-runtime [[chtefi][chtefi]]

# v1.4.0 - 2015-07-15

**Fixed:** No longer throws an error if you pass the absolute path to a module.

**Added:** Support for modules which export a React element [[andreypopp][andreypopp]]

**Changed:** Remove confusing warning message when the module being run doesn't contain `'React.render'` [[andreypopp][andreypopp]]

**Changed:** Use the `cheap-module-eval-source-map` devtool in webpack config instead of `eval` [[andreypopp][andreypopp]]

# v1.3.0 - 2015-07-11

**Changed:** `require('react')` now resolves to the `node_modules` dir in scope for the working directory, if there is one. It previously always resolved to the version from heatpack's own dependencies.

**Changed:** enabled coloured output in webpack logging.

**Added:** `-p`/`--port` option to specify the port to run the webpack dev server on. Defaults to 3000.

# v1.2.0 - 2015-07-04

**Added:** the code in the given script is now checked for the presence of `React.render` - if not present, it's _assumed_ the script exports a React component and heatpack will create a new entry module which imports the component and calls `React.render()` with it ([#2](https://github.com/insin/react-heatpack/issues/2))

**Added:** `-f`/`--force` flag to skip the new `React.render` check, forcing the specified script to be used as the entry point by webpack.

# v1.1.0 - 2015-07-03

**Added:** CoffeeScript & CJSX support [[KyleAMathews][KyleAMathews]]

# v1.0.1 - 2015-07-02

**Fixed:** resolution of webpack dependencies.

# v1.0.0 - 2015-07-02

Initial release.

[andreypopp]: https://github.com/andreypopp
[chtefi]: https://github.com/chtefi
[KyleAMathews]: https://github.com/KyleAMathews
