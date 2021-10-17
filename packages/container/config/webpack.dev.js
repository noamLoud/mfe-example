const { merge } = require ('webpack-merge');//merge with .common file
const ModuleFederationPlugin = require ('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback:{
            index: 'index.html',
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes:{
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: packageJson.dependencies,//['react, react-dom'], //shared dependencies
            
        })
    ]
}

module.exports = merge(commonConfig, devConfig);//merge with .common file. devConfig will OVERRIDE common configuration of commonConfig