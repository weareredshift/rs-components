module.exports = {
  componentPaths: ['../src/components'],
  webpackConfigPath: './webpack.config.js',
  proxies: ['./proxies/redux-proxy.js'],
  port: 3001,
  globalImports: [
    '../src/styles/core.scss'
  ],
  ignore: [
    /actions.js/,
    /utils.js/,
    /Input/
  ]
};
