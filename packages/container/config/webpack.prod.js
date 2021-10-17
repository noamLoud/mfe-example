const { merge } = require("webpack-merge"); //merge with .common file
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
      filename: "[name].[contenthash].js"
    },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies, //['react, react-dom'], //shared dependencies
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig); //merge with .common file. devConfig will OVERRIDE common configuration of commonConfig
