const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry:{
    index: ['./src/chat_main.js',"./src/popup.js","./src/requireApi.js","./src/script.js"],
    login: ['./src/login_main.js',"./src/loginApi.js"]
    },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // 使用MiniCssExtractPlugin.loader替代style-loader
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // 定义加载器规则
      // {
      //   test: /\.js$/, // 匹配以 .js 结尾的文件
      //   exclude: /node_modules/, // 排除 node_modules 目录
      //   use: "babel-loader", // 使用 babel-loader 加载器
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ['index',],
    }),
    new HtmlWebpackPlugin({
      template: "./src/login.html",
      filename: "login.html",
      chunks: ['login'],
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // 第一个CSS文件的输出名称
    }),
  ],
};
