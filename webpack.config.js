const path = require("path");
const WebpackNodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  externalsPresets: { node: true },
  devtool: "inline-source-map",
  entry: {
    index: "./app/index.ts",
    migration: "./database/migration.ts",
  },
  output: {
    filename: "[name].js",
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
