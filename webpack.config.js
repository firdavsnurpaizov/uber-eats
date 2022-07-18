const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js']
    ,
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html", filename: "index.html",
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new HTMLWebpackPlugin({
            template: "./pushkin.html", filename: "pushkin.html"
        }),
        new HTMLWebpackPlugin({
            template: "./hachapuri.html", filename: "hachapuri.html"
        }),
        new HTMLWebpackPlugin({
            template: "./samurai.html", filename: "samurai.html"
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./src/assets"),
                    to: path.resolve(__dirname, "dist/assets"),
                },
            ],
        }),
    ],
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource",
            }
        ]
    }
}
