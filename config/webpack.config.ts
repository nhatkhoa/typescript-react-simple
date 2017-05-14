'use strict'

import * as webpack from 'webpack'
import * as path from 'path'
import { CheckerPlugin } from 'awesome-typescript-loader'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import styleLoaders, { extractSCSSPlugin, extractCSSVendorPlugin } from './loaders/styles'
import typeScriptLoaders from './loaders/typescripts'
import imageLoaders from './loaders/image'
import * as Cleaner from 'clean-webpack-plugin'

const DEV_PORT = 8080
const OUTPUT_PATH = path.resolve(__dirname, '../dist')
const __DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'

const envDefine = new webpack.ProvidePlugin({
  __DEV__,
  __PROD__: !__DEV__
})

const entryWithHRM = [
  'react-hot-loader/patch',
  './src/index.ts'
]

const entryOnProduction = [
  './src/index.ts'
]

const cleanPlugin = new Cleaner(['dist', 'build'], {
  root: path.resolve(__dirname, '../'),
  verbose: true,
  dry: false
})

const config = {
  context: path.resolve(__dirname, '../'),
  entry: __DEV__ ? entryWithHRM : entryOnProduction,
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: '[name].[hash].js',
    devtoolModuleFilenameTemplate: '/[resourcePath]'
  },
  devtool: 'eval',
  module: {
    rules: [...styleLoaders, ...typeScriptLoaders, ...imageLoaders]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CheckerPlugin(),
    extractSCSSPlugin,
    extractCSSVendorPlugin,
    envDefine,
    cleanPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: OUTPUT_PATH,
    publicPath: '/',
    port: DEV_PORT,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true
    }
  }
}

export default config
