const path = require("path");
const WebpackNodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  externalsPresets: { node: true },
  devtool: "inline-source-map",
  entry: "./app/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, ".dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: [WebpackNodeExternals()],
};
