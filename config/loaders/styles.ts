import * as path from 'path'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import customProperties from 'postcss-custom-properties'
import * as autoPrefix from 'autoprefixer'

const extractCSSVendorPlugin = new ExtractTextPlugin('[name].bundle.css')
const extractSCSSPlugin = new ExtractTextPlugin('[name].vendor.css')

const __DEV__ = process.env.NODE_ENV === 'development'

const cssLoader = {
  test: /\.css$/,
  loader: extractCSSVendorPlugin.extract({
    fallback: [
      {
        loader: 'style-loader'
      }
    ],
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: __DEV__ ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]'
        }
      }
    ]
  })
}

const scssLoader = {
  test: /\.scss$/,
  include: path.resolve(__dirname, '../../src'),
  loader: extractSCSSPlugin.extract({
    fallback: [
      {
        loader: 'style-loader'
      }
    ],
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: __DEV__ ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoPrefix({
            browsers: ['last 2 versions', 'ie >= 9']
          })]
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  })
}

export {
  scssLoader,
  cssLoader,
  extractCSSVendorPlugin,
  extractSCSSPlugin
}

export default [scssLoader, cssLoader]