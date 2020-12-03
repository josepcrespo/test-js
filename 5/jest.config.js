
module.exports = {
    name: 'sunmedia',
    verbose: true,
    transform: {
        "^.+\\.js?$": ["babel-jest", {configFile: './babel.test.config.js'}]
    }
}