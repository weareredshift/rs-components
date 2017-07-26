const argv = require('yargs').argv;
const project = require('../project.config');
const debug = require('debug')('app:config:karma');
const path = require('path');

debug('Creating configuration.');

const webpackConfig = require('../build/webpack.config');

const TEST_BUNDLER = './tests/test-bundler.js';

// Add istanbul instrumenter to webpack rules
webpackConfig.module.rules.push(
  {
		// Delays coverage til after tests are run, fixing transpiled source
		// coverage error
    enforce: 'post',
    test: /\.js$|\.jsx$/,
    exclude: /tests|node_modules|bower_components|build/,
    loader: 'istanbul-instrumenter-loader',
    query: {
      esModules: true
    }
  }
);

const karmaConfig = {
  basePath: '../',
  browsers: ['ChromeHeadless'],
  singleRun: !argv.watch,
  files: [{
    pattern: TEST_BUNDLER,
    watched: false,
    served: true,
    included: true
  }],
  // Files: [TEST_BUNDLER],
  coverageIstanbulReporter: {

    // Reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
    reports: argv.watch ? ['text-summary'] : ['html', 'text-summary'],

    // Base output directory. If you include %browser% in the path it will be replaced with the karma browser name
    dir: 'coverage',

    // If using webpack and pre-loaders, work around webpack breaking the source path
    fixWebpackSourcePaths: true,

    // Stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
    skipFilesWithNoCoverage: true

    // Most reporters accept additional config options. You can pass these through the `report-config` option
    // 'report-config': {
    //   // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
    // }
  },
  frameworks: ['mocha'],
  reporters: ['mocha', 'coverage-istanbul'],
  preprocessors: {
    [TEST_BUNDLER]: ['webpack']
  },
  logLevel: 'WARN',
  browserConsoleLogOptions: {
    terminal: true,
    format: '%b %T: %m',
    level: ''
  },
  // Plugins: ['karma-mocha', 'karma-chrome-launcher', 'karma-webpack-with-fast-source-maps', 'karma-coverage-istanbul-reporter'],
  webpack: {
    entry: TEST_BUNDLER,
    devtool: 'cheap-module-source-map',
    module: webpackConfig.module,
    plugins: webpackConfig.plugins,
    resolve: Object.assign({}, webpackConfig.resolve, {
      alias: Object.assign({}, webpackConfig.resolve.alias, {
        sinon: 'sinon/pkg/sinon.js',
        support: path.resolve(project.basePath, 'tests/support/')
      })
    }),
    externals: {
      'react/addons': 'react',
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react'
    }
  },
  webpackMiddleware: {
    stats: 'errors-only',
    noInfo: true
  }
};

module.exports = (cfg) => cfg.set(karmaConfig);
