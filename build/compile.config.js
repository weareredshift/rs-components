const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const inProject = path.resolve.bind(path, '../');

const config = {
  entry: '../src/index.js',
  devtool: false,
  output: {
    path: path.resolve('../dist/'),
    filename: '[name].js'
  },
  resolve: {
    modules: [
      inProject('../'),
      'node_modules'
    ],
    extensions: ['*', '.js']
  },
  module: {
    rules: []
  }
};

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        [
          'babel-plugin-transform-runtime',
          {
            helpers: true,
            polyfill: false, // We polyfill needed features in src/normalize.js
            regenerator: true
          }
        ],
        [
          'babel-plugin-transform-object-rest-spread',
          {
            useBuiltIns: true // We polyfill Object.assign in src/normalize.js
          }
        ]
      ],
      presets: [
        'babel-preset-react',
        ['babel-preset-env', {
          targets: {
            ie9: true,
            uglify: true,
            modules: false
          }
        }]
      ]
    }
  }]
});

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: false
});

config.module.rules.push({
  test: /\.css$/,
  use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
});

config.module.rules.push({
  test: /\.(sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: false,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions']
            },
            discardComments: {
              removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: false
          }
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          autoprefixer: {
            add: true,
            remove: true,
            browsers: ['last 2 versions']
          },
          discardComments: {
            removeAll: true
          },
          discardUnused: false,
          mergeIdents: false,
          reduceIdents: false,
          safe: true,
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false
        }
      }
    ]
  })
});
config.plugins = [extractStyles];

// Images
// ------------------------------------
config.module.rules.push({
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader',
  options: {
    limit: 8192
  }
});

// Bundle Splitting
// ------------------------------------
const bundles = ['normalize', 'manifest'];

bundles.unshift('vendor');
config.entry.vendor = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'redux-thunk',
  'react-router'
];

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: bundles }));

// Production Optimizations
// ------------------------------------
config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: !!config.devtool,
    comments: false,
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    }
  })
);

module.exports = config;
