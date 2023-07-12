const webpack = require('webpack');

module.exports = {
    resolve: {fallback: {"querystring": require.resolve("querystring-es3")}},
};

export {};