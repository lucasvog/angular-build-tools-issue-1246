const webpack = require('webpack');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: /src/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['../plugin.js',['@babel/plugin-proposal-decorators', { "legacy": true }]]
          }
        }
      }
    ],
}
};
