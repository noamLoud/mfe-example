const { merge } = require ('webpack-merge');//merge with .common file
const HtmlWebpackPlugin = require('html-webpack-plugin'); //inject html to main .html file
const ModuleFederationPlugin = require ('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback:{
            index: 'index.html',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({//inject html to main .html file
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name:'marketing', //global var when the script loads up inside the container
            filename: 'remoteEntry.js',
            exposes:{
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJson.dependencies,//['react, react-dom'], //shared dependencies with the container
        })
    ]
}

module.exports = merge(commonConfig, devConfig);//merge with .common file. devConfig will OVERRIDE common configuration of commonConfig