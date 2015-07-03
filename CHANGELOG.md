**Added:** the script is now checked for the presence of `React.render` - if not present, it's _assumed_ the script exports a React component and heatpack will create a new entry module which imports the component and calls `React.render()` with it.

**Added:** `-f` and `--force` flags to skip the new `React.render` check, forcing the specified script to be used as the entry point by webpack.

## v1.1.0 - 2015-07-03 11:50

**Added:** CoffeeScript & CJSX support [[KyleAMathews](https://github.com/KyleAMathews)]

## v1.0.1 - 2015-07-02 12:37

**Fixed:** resolution of webpack dependencies.

## v1.0.0 - 2015-07-02 06:06

Initial release.
