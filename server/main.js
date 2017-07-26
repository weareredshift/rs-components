/* eslint no-unreachable:0 indent:0 */

const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston'); // For transports.Console
const Rotate = require('winston-logrotate').Rotate;
const path = require('path');
const debug = require('debug')('app:server');
const webpack = require('webpack');
const compress = require('compression');

const webpackConfig = require('../build/webpack.config');
const project = require(path.resolve(__dirname, '../project.config'));

const app = express();

// Apply gzip compression
app.use(compress());

const rotateTransport = new Rotate({
  file: path.resolve(project.basePath, 'express.log'),
  colorize: true,
  timestamp: true,
  json: false,
  max: '10m',
  keep: 5,
  compress: true
});

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  debug('Enabling webpack dev and HMR middleware');
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : path.resolve(project.basePath, project.srcDir),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : 'normal'
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }));

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(project.basePath, 'public')));
} else {
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: false,
        colorize: true
      }),
      rotateTransport
    ]
  }));

  winston.log(
    'warn',
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.');

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)));
}

module.exports = app;
