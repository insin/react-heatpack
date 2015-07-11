**Changed:** `require('react')` now resolves to the `node_modules` dir in scope for the working directory, if there is one. It previously always resolved to the version from heatpack's own dependencies.

**Added:** `-p`/`--port` option to specify the port to run the webpack dev server on. Defaults to 3000.

## v1.2.0 - 2015-07-04 01:00

**Added:** the code in the given script is now checked for the presence of `React.render` - if not present, it's _assumed_ the script exports a React component and heatpack will create a new entry module which imports the component and calls `React.render()` with it ([#2](https://github.com/insin/react-heatpack/issues/2))

**Added:** `-f`/`--force` flag to skip the new `React.render` check, forcing the specified script to be used as the entry point by webpack.

## v1.1.0 - 2015-07-03 11:50

**Added:** CoffeeScript & CJSX support [[KyleAMathews](https://github.com/KyleAMathews)]

## v1.0.1 - 2015-07-02 12:37

**Fixed:** resolution of webpack dependencies.

## v1.0.0 - 2015-07-02 06:06

Initial release.
