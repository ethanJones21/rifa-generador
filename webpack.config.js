const path = require("path");
// PARA USAR HTML
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // ARCHIVO DE ENTRADA
  entry: "./fronted/app.js",
  // ARCHIVO DE SALIDA COMO BUNDLE.JS
  output: {
    path: path.join(__dirname, "backend/public"),
    filename: "js/bundle.js",
  },

  //   PARA QUE LEA CSS PERO DEPENDE SI ESTA EN PRODUCCION QUE LO SEPARE CON MINICSSEXTRACTPLUGIN Y EN DESARROLLO QUE LO EJECUTA EN JS
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./fronted/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/bundle.css",
    }),
  ],
  //   AYUDA PARA EL DESARROLLO
  devtool: "source-map",

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};
