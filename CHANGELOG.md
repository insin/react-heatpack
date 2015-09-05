## v1.5.0 - 2015-09-05 21:38

**Changed:** CSS is no longer minified.

## v1.4.1 - 2015-07-31 10:40

**Fixed:** Fix error when `async` and `await` are used by adding babel-runtime [[chtefi][chtefi]]

## v1.4.0 - 2015-07-15 21:24

**Fixed:** No longer throws an error if you pass the absolute path to a module.

**Added:** Support for modules which export a React element [[andreypopp][andreypopp]]

**Changed:** Remove confusing warning message when the module being run doesn't contain `'React.render'` [[andreypopp][andreypopp]]

**Changed:** Use the `cheap-module-eval-source-map` devtool in webpack config instead of `eval` [[andreypopp][andreypopp]]

## v1.3.0 - 2015-07-11 17:08

**Changed:** `require('react')` now resolves to the `node_modules` dir in scope for the working directory, if there is one. It previously always resolved to the version from heatpack's own dependencies.

**Changed:** enabled coloured output in webpack logging.

**Added:** `-p`/`--port` option to specify the port to run the webpack dev server on. Defaults to 3000.

## v1.2.0 - 2015-07-04 01:00

**Added:** the code in the given script is now checked for the presence of `React.render` - if not present, it's _assumed_ the script exports a React component and heatpack will create a new entry module which imports the component and calls `React.render()` with it ([#2](https://github.com/insin/react-heatpack/issues/2))

**Added:** `-f`/`--force` flag to skip the new `React.render` check, forcing the specified script to be used as the entry point by webpack.

## v1.1.0 - 2015-07-03 11:50

**Added:** CoffeeScript & CJSX support [[KyleAMathews][KyleAMathews]]

## v1.0.1 - 2015-07-02 12:37

**Fixed:** resolution of webpack dependencies.

## v1.0.0 - 2015-07-02 06:06

Initial release.

[andreypopp]: https://github.com/andreypopp
[chtefi]: https://github.com/chtefi
[KyleAMathews]: https://github.com/KyleAMathews
