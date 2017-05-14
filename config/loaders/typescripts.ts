import * as path from 'path'

const typeScriptLoader = {
    test: /\.ts(x?)$/,
    use: [
        {
            loader: 'react-hot-loader/webpack'
        },
        {
            loader: 'awesome-typescript-loader'
        }
    ],
    exclude: path.resolve(__dirname, '../../node_modules'),
    include: path.resolve(__dirname, '../../src')
}

const sourceMapLoaderJS = {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: path.resolve(__dirname, '../../node_modules')
}

const sourceMapLoaderTS = {
    enforce: 'pre',
    test: /\.ts(x?)$/,
    use: 'source-map-loader',
    exclude: path.resolve(__dirname, '../../node_modules')
}

export { sourceMapLoaderJS, sourceMapLoaderTS, typeScriptLoader }

export default [sourceMapLoaderJS, sourceMapLoaderTS, typeScriptLoader]
