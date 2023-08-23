const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/app-[contenthash:5].js',
    assetModuleFilename: 'assets/[hash:5][ext]',
    chunkFilename: 'js/chunk-[contenthash:5].js',
    publicPath: '/',
  },
  target: 'web',
  devtool: 'source-map',
  devServer: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(mp3|mp4)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(gif|png|webp|svg|jpg|jpeg|bmp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:5].css',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      // 应用 复制文件 插件
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: './',
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
  ],
};
