const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const conf = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'www/'),
        filename: 'js/app.js',
        publicPath: 'www/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/style.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            axios: 'axios'
        })
    ]
};

module.exports = (env, options) => {
    conf.devtool = options.mode === "production" ? 
                    false :
                    "cheap-eval-source-map";

    return conf;
};