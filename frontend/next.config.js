/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */

const webpack = require("webpack");
const css = require("@zeit/next-css");
const sass = require("@zeit/next-sass");
const images = require("next-images");
const offline = require("next-offline");
const withPlugins = require("next-compose-plugins");

const { parsed: localEnv } = require("dotenv").config();

const config = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = withPlugins([
  config,
  css,
  sass,
  images,
  offline,
]);
