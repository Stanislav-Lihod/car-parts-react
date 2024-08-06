const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: (resourcePath) => Boolean(resourcePath.includes('.module.')),
                localIdentName: '[hash:base64:8]'
              },
            }
          },
          "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, './src/styles/global.scss'),
              ],
            },
          }
        ],
      },
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/name.[contenthash:8].css',
      chunkFilename: 'css/name.[contenthash:8].css'
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'public','index.html')
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
}