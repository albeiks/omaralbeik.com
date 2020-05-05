/* eslint-disable import/no-extraneous-dependencies */

const webpack = require("webpack");
const css = require("@zeit/next-css");
const sass = require("@zeit/next-sass");
const images = require("next-images");
const offline = require("next-offline");
const withPlugins = require("next-compose-plugins");

const { parsed: localEnv } = require("dotenv").config();

const config = {
  // eslint-disable-next-line no-shadow
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
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
