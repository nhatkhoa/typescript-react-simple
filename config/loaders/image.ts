import * as path from 'path'

const imageLoader = {
    test: /\.(png|jpg)$/,
    include: path.resolve(__dirname, '../../src'),
    use: [
        {
            loader: 'url-loader',
            options: { limit: 10000 } // Convert images < 10k to base64 strings
        }
    ]
}

export { imageLoader }

export default [imageLoader] 