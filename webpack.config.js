const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.js', // entry point of the app
    output: {
        path: path.resolve(__dirname, 'build'), // directory for output
        filename: 'bundle.js', // file to output
        publicPath: 'build/'
    },
    module: {
        rules: [ // rules of the loaders used by webpack
            {
                use: 'babel-loader',
                test: /\.js$/ // only apply to this regex (only js files)
            },
            {
                // use: ['style-loader', 'css-loader'], // loader are applied from right to left (order matters)
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader'
                }),
                test: /\.css$/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 40000 } // if the image is bigger serve it separately else serve in the bundle.js as raw data
                    },
                    'image-webpack-loader',
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};

module.exports = config;