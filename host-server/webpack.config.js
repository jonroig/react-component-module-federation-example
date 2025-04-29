const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');


module.exports = {
    mode: 'development',
    entry: './src/client/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'consuming_app',
            shared: {
              react: { singleton: true, requiredVersion: '*', eager: true, strictVersion: false },
              'react-dom': { singleton: true, requiredVersion: '*',  eager: true, strictVersion: false },
              'axios': { singleton: true, requiredVersion: '*',  eager: true, strictVersion: false }
            },
          }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};