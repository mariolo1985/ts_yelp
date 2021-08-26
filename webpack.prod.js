const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entries = [
  path.join(__dirname, 'src/index.js'),
  path.join(__dirname, 'src/scss/index.scss')
];

module.exports = {
  name: 'Bundling prod',
  mode: 'production',
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/index.min.js'
  },
  devServer: {
    static: './dist',
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /\/node_modules\/(?!apollo-.*?|react-apollo)/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.min.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/*.html', to: "[name][ext]" },
      ]
    })
  ]
};