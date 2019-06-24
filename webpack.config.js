const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 3001,
    inline: true,
    hot: true,
    watchOptions: {
      ignored: ['node_modules', ],
      aggregateTimeout: 300,
      poll: 1500,
    },
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      { 
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // "style-loader", // 将 JS 字符串生成为 style 节点, 舍弃 使用 css js 分离
          "css-loader", // 将 CSS 转化成 CommonJS 模块
          "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
}
