const { merge } = require ('webpack-merge');//merge with .common file
const ModuleFederationPlugin = require ('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
    mode: "production",
  output: {
      filename: "[name].[contenthash].js"
    },
    plugins: [
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

module.exports = merge(commonConfig, prodConfig);//merge with .common file. devConfig will OVERRIDE common configuration of commonConfig