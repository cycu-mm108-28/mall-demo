const path = require("path");
const fs = require("fs");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: ["./src/main.ts", "./styles/main.scss"],
  plugins: [
    new MiniCssExtractPlugin({ filename: "styles/[name].[hash].css" }),
    ...fs
      .readdirSync(__dirname, "utf8")
      .filter(ones => ones.endsWith(".html"))
      .map(
        path => new HtmlWebpackPlugin({ template: "./" + path, filename: path })
      )
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // We do this twice because once for the current source layout and once for future output
              publicPath: "../"
            }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [autoprefixer()]
            }
          },
          "sass-loader"
        ]
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/i,
        loader: "file-loader",
        options: {
          name: "[contenthash].[ext]",
          outputPath: "assets",
          esModule: false
        }
      },
      {
        test: /\.(html)$/,
        loader: "html-loader",
        options: {
          attrs: ["use:href", "img:src"],
          interpolate: true
        }
      }
    ]
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "./dist"),
    filename: "scripts/[name].[hash].js"
  }
};
