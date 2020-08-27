const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: isDev,
    entry: {
        main: [
            '@babel/polyfill',
            path.resolve(__dirname, 'src/index.js')
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: 'style.css',
            path: path.resolve(__dirname, 'dist'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    }
};